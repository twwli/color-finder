document.addEventListener('DOMContentLoaded', function () {
    // Retrieves all <li> elements in the grid
    const gridItems = document.querySelectorAll('.grid li');

    // Creates an instance of Color Thief
    const colorThief = new ColorThief();

    // Checks that the image is loaded before applying the colour
    gridItems.forEach(function (item) {
      const img = item.querySelector('img');

      img.onload = function () {
        // Find the dominant colour in table form [R, G, B].
        const dominantColor = colorThief.getColor(img);

        // Convert to `rgb()` string
        const rgbColor = `rgb(${dominantColor.join(',')})`;

        // Find and apply the colour to .curtain
        const curtain = item.querySelector('.curtain');
        if (curtain) {
          curtain.style.background = rgbColor;
        }
      };

      // For images already loaded in the cache (just in case)
      if (img.complete) {
        img.onload();
      }
    });

    const figures = document.querySelectorAll('figure');

    // Function called when the element enters the viewport
    const callback = function (entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Adds the fade-in class to launch the animation
          entry.target.classList.add('fade-in');
          // Stop looking at this element because the animation has already started
          observer.unobserve(entry.target);
        }
      });
    };

    // Create a new viewer
    const observer = new IntersectionObserver(callback, {
      threshold: 0.5 // Starts the animation when 10% of the element is visible
    });

    // Begins observation on each <figure>.
    figures.forEach(figure => {
      observer.observe(figure);
    });
  });