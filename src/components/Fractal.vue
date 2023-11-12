<template>
  <div id="fractal_container" @wheel="handleMouseScroll">
    <canvas ref="canvas" width="900" height="500"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scale: 100,
    };
  },
  mounted() {
    this.generateFractal();
  },
  methods: {
    mapToComplex(x, y) {
      const offsetX = this.width / 2;
      const offsetY = this.height / 2;

      return {
        re: (x - offsetX) / this.scale,
        im: (y - offsetY) / this.scale,
      };
    },
    generateFractal() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");
      this.width = canvas.width;
      this.height = canvas.height;

      for (let x = 0; x < this.width; x++) {
        for (let y = 0; y < this.height; y++) {
          const c = this.mapToComplex(x, y);
          let z = { re: 0, im: 0 };
          let iteration = 0;

          while (iteration < this.maxIterations && z.re * z.re + z.im * z.im < 4) {
            const prevZ = { re: z.re, im: z.im };
            z.re = Math.sin(prevZ.re) * prevZ.re - Math.sin(prevZ.im) * prevZ.im;
            z.im = Math.sin(prevZ.re) * prevZ.im + Math.sin(prevZ.im) * prevZ.re;
            z.re += c.re;
            z.im += c.im;
            iteration++;
          }

          const brightness = (iteration / this.maxIterations) * 255;
          ctx.fillStyle = `rgb(${brightness},${brightness},${brightness})`;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    },
    handleMouseScroll(event) {
      event.preventDefault();
      this.scale += event.deltaY > 0 ? -10 : 10; // Adjust the scale based on scroll direction
      this.clearCanvas();
      this.generateFractal();
    },
    clearCanvas() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, this.width, this.height);
    },
  },
  computed: {
    maxIterations() {
      return 100; // Adjust the maximum iterations as needed
    },
  },
};
</script>
