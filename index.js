document.addEventListener('DOMContentLoaded', function () {
    // Récupère tous les éléments <li> de la grille
    const gridItems = document.querySelectorAll('.grid li');

    // Crée une instance de Color Thief
    const colorThief = new ColorThief();

    // Vérifie que l'image est chargée avant d'appliquer la couleur
    gridItems.forEach(function (item) {
      const img = item.querySelector('img');

      img.onload = function () {
        // Trouve la couleur dominante sous forme de tableau [R, G, B]
        const dominantColor = colorThief.getColor(img);

        // Convertit en chaîne `rgb()`
        const rgbColor = `rgb(${dominantColor.join(',')})`;

        // Trouve et applique la couleur à .curtain
        const curtain = item.querySelector('.curtain');
        if (curtain) {
          curtain.style.background = rgbColor;
        }
      };

      // Pour les images déjà chargées dans le cache (au cas où)
      if (img.complete) {
        img.onload();
      }
    });

    const figures = document.querySelectorAll('figure');

    // Fonction appelée lorsque l'élément entre dans le viewport
    const callback = function (entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Ajoute la classe fade-in pour lancer l'animation
          entry.target.classList.add('fade-in');
          // Arrête d'observer cet élément car l'animation est déjà lancée
          observer.unobserve(entry.target);
        }
      });
    };

    // Crée un nouvel observateur
    const observer = new IntersectionObserver(callback, {
      threshold: 0.5 // Lance l'animation lorsque 10% de l'élément est visible
    });

    // Commence l'observation sur chaque <figure>
    figures.forEach(figure => {
      observer.observe(figure);
    });
  });