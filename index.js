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
});