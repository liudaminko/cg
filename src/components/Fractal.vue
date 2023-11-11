<template>
    <div id="fractal_container">
      <canvas ref="canvas" width="900" height="500"></canvas>
    </div>
  </template>
  
  <script>
  export default {
    mounted() {
      // Get the canvas element
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");
  
      // Define parameters
      const width = canvas.width;
      const height = canvas.height;
      const maxIterations = 100;
      const scale = 150;
      const offsetX = width / 2;
      const offsetY = height / 2;
  
      // Function to map pixel coordinates to complex plane
      function mapToComplex(x, y) {
        return {
          re: (x - offsetX) / scale,
          im: (y - offsetY) / scale,
        };
      }
  
      // Function to generate fractal
      function generateFractal() {
        for (let x = 0; x < width; x++) {
          for (let y = 0; y < height; y++) {
            const c = mapToComplex(x, y);
            let z = { re: 0, im: 0 };
            let iteration = 0;
  
            while (iteration < maxIterations && z.re * z.re + z.im * z.im < 4) {
              // Compute z = sin(z) * z
              const prevZ = { re: z.re, im: z.im };
              z.re = Math.sin(prevZ.re) * prevZ.re - Math.sin(prevZ.im) * prevZ.im;
              z.im = Math.sin(prevZ.re) * prevZ.im + Math.sin(prevZ.im) * prevZ.re;
              z.re += c.re;
              z.im += c.im;
              iteration++;
            }
  
            // Color the pixel based on the number of iterations
            const brightness = (iteration / maxIterations) * 255;
            ctx.fillStyle = `rgb(${brightness},${brightness},${brightness})`;
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }
  
      // Generate the fractal
      generateFractal();
    },
  };
  </script>
