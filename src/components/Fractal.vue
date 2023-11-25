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
      colorPalettes: [
        {
          name: "Grayscale",
          colors: [
            "#000000",
            "#333333",
            "#666666",
            "#999999",
            "#CCCCCC",
            "#FFFFFF",
          ],
        },
        {
          name: "Rainbow",
          colors: [
            "#FF0000",
            "#FFA500",
            "#FFFF00",
            "#008000",
            "#0000FF",
            "#4B0082",
            "#9400D3",
          ],
        },
        {
          name: "Pastel",
          colors: [
            "#FFB6C1",
            "#FFD700",
            "#ADFF2F",
            "#87CEEB",
            "#FF69B4",
            "#BA55D3",
            "#7B68EE",
          ],
        },
        {
          name: "Earth Tones",
          colors: [
            "#8B4513",
            "#CD853F",
            "#D2691E",
            "#A0522D",
            "#BC8F8F",
            "#8B0000",
            "#B8860B",
          ],
        },
        {
          name: "Cool Blues",
          colors: [
            "#66CCCC",
            "#3399FF",
            "#0066CC",
            "#0099CC",
            "#3366FF",
            "#99CCFF",
            "#003366",
          ],
        },
      ],
    };
  },
  props: {
    selectedPalette: {
      type: Number,
      required: true,
    },
  },
  watch: {
    selectedPalette() {
      this.clearCanvas();
      this.generateFractal();
    },
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

          while (
            iteration < this.maxIterations &&
            z.re * z.re + z.im * z.im < 4
          ) {
            const prevZ = { re: z.re, im: z.im };
            z.re =
              Math.sin(prevZ.re) * prevZ.re - Math.sin(prevZ.im) * prevZ.im;
            z.im =
              Math.sin(prevZ.re) * prevZ.im + Math.sin(prevZ.im) * prevZ.re;
            z.re += c.re;
            z.im += c.im;
            iteration++;
          }

          const color =
            this.colorPalettes[this.selectedPalette].colors[
              iteration % this.colorPalettes[this.selectedPalette].colors.length
            ];

          ctx.fillStyle = color;
          ctx.fillRect(x, y, 1, 1);
        }
      }
    },
    handleMouseScroll(event) {
      event.preventDefault();
      this.scale += event.deltaY > 0 ? -10 : 10;
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
      return 100;
    },
  },
};
</script>
