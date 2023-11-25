<template>
  <div id="plasma_container">
    <canvas ref="canvas" width="900" height="500"></canvas>
  </div>
</template>

<script>
export default {
  name: "PlasmaGenerator",
  props: {
    generatePlasma: Boolean,
  },
  data() {
    return {
      canvas: null,
      context: null,
      iterations: 5000000,
    };
  },
  watch: {
    generatePlasma(newVal) {
      if (newVal) {
        this.generatePlasmaImage(0, 0, this.canvas.width, this.canvas.height);
      }
    },
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.context = this.canvas.getContext("2d");
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  },
  methods: {
    generatePlasmaImage(x, y, width, height) {
      if (width < 2 || this.iterations <= 0) {
        return;
      }

      const halfWidth = width / 2;
      const halfHeight = height / 2;

      const topLeftColor = getRandomColor();
      const topRightColor = getRandomColor();
      const bottomLeftColor = getRandomColor();
      const bottomRightColor = getRandomColor();

      const topMidColor = calculateMidpointColor(topLeftColor, topRightColor);
      const leftMidColor = calculateMidpointColor(
        topLeftColor,
        bottomLeftColor
      );
      const rightMidColor = calculateMidpointColor(
        topRightColor,
        bottomRightColor
      );
      const bottomMidColor = calculateMidpointColor(
        bottomLeftColor,
        bottomRightColor
      );

      const centerColor = calculateMidpointColor(
        calculateMidpointColor(topMidColor, bottomMidColor),
        calculateMidpointColor(leftMidColor, rightMidColor)
      );

      this.context.fillStyle = centerColor;
      this.context.fillRect(
        x + halfWidth / 2,
        y + halfHeight / 2,
        halfWidth,
        halfHeight
      );

      this.context.fillStyle = topMidColor;
      this.context.fillRect(x + halfWidth / 2, y, halfWidth, halfHeight / 2);

      this.context.fillStyle = leftMidColor;
      this.context.fillRect(x, y + halfHeight / 2, halfWidth / 2, halfHeight);

      this.context.fillStyle = rightMidColor;
      this.context.fillRect(
        x + halfWidth + halfWidth / 2,
        y + halfHeight / 2,
        halfWidth / 2,
        halfHeight
      );

      this.context.fillStyle = bottomMidColor;
      this.context.fillRect(
        x + halfWidth / 2,
        y + halfHeight,
        halfWidth,
        halfHeight / 2
      );

      this.iterations--;
      this.generatePlasmaImage(x, y, halfWidth, halfHeight);
      this.generatePlasmaImage(x + halfWidth, y, halfWidth, halfHeight);
      this.generatePlasmaImage(x, y + halfHeight, halfWidth, halfHeight);
      this.generatePlasmaImage(
        x + halfWidth,
        y + halfHeight,
        halfWidth,
        halfHeight
      );
    },
  },
};

function getRandomColor() {
  const red = Math.random() * 255;
  const green = Math.random() * 255;
  const blue = Math.random() * 255;
  return `rgb(${red | 0}, ${green | 0}, ${blue | 0})`;
}

function calculateMidpointColor(color1, color2) {
  const rgb1 = color1.match(/\d+/g);
  const rgb2 = color2.match(/\d+/g);
  const midpoint = rgb1.map((value, index) =>
    Math.round((parseInt(value) + parseInt(rgb2[index])) / 2)
  );
  return `rgb(${midpoint[0]}, ${midpoint[1]}, ${midpoint[2]})`;
}
</script>

<style scoped>
#plasma_container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
