<template>
  <div class="triangle-move">
    <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight"></canvas>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  props: {
    coordinates: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      vertices: [
        this.coordinates.pointA?.x || 0,
        this.coordinates.pointA?.y || 0,
        this.coordinates.pointB?.x || 0,
        this.coordinates.pointB?.y || 0,
        this.coordinates.pointC?.x || 0,
        this.coordinates.pointC?.y || 0,
      ],
      scale: this.coordinates.scale || 1,
      canvasWidth: 900,
      canvasHeight: 500,
    };
  },
  watch: {
    coordinates(newCoords) {
      // Update vertices
      this.vertices = [
        newCoords.pointA.x,
        newCoords.pointA.y,
        newCoords.pointB.x,
        newCoords.pointB.y,
        newCoords.pointC.x,
        newCoords.pointC.y,
      ];

      // Update scale
      this.scale = newCoords.scale;

      // Redraw
      this.drawCoordinatePlane();
      this.drawTriangle();
    },
  },
  computed: {
    // Calculate the style for the triangle based on vertices and scale
    triangleStyle() {
      return {
        position: "absolute",
        transform: `translate(${this.vertices[0]}px, ${this.vertices[1]}px) scale(${this.scale})`,
      };
    },
  },
  mounted() {
    this.drawCoordinatePlane();
    this.drawTriangle();
  },
  methods: {
    moveAndScaleTriangle() {
      console.log("Before transformation - Vertices:", this.vertices);

      // Translation matrix
      const translationMatrix = [
        [1, 0, 10],
        [0, 1, 10],
      ];

      // Apply translation to each point
      const translatedPoints = [];
      for (let i = 0; i < this.vertices.length; i += 2) {
        const point = this.applyMatrix(translationMatrix, [
          this.vertices[i],
          this.vertices[i + 1],
          1, // Append 1 for translation in 2D
        ]);
        translatedPoints.push(point[0], point[1]);
      }
      this.vertices[0] = translatedPoints[0];
      this.vertices[1] = translatedPoints[1];
      this.vertices[2] = translatedPoints[2];
      this.vertices[3] = translatedPoints[3];
      this.vertices[4] = translatedPoints[4];
      this.vertices[5] = translatedPoints[5];
      console.log("After translation - Vertices:", translatedPoints);

      // Scaling matrix
      console.log("scale: " + this.scale);
      const scalingMatrix = [
        [this.scale, 0],
        [0, this.scale],
      ];

      // Apply scaling to each translated point
      const scaledPoints = [];
      for (let i = 0; i < translatedPoints.length; i += 2) {
        const point = this.applyMatrix(scalingMatrix, [
          translatedPoints[i],
          translatedPoints[i + 1],
          1,
        ]);
        console.log("scaled points: " + point[0] + ", " + point[1]);
        scaledPoints.push(point[0], point[1]);
      }

      console.log("After scaling - Vertices:", scaledPoints);

      // Update vertices directly
      this.vertices[0] = scaledPoints[0];
      this.vertices[1] = scaledPoints[1];
      this.vertices[2] = scaledPoints[2];
      this.vertices[3] = scaledPoints[3];
      this.vertices[4] = scaledPoints[4];
      this.vertices[5] = scaledPoints[5];

      // Redraw the coordinate plane and triangle
      this.drawCoordinatePlane();
      this.drawTriangle();
    },
    applyMatrix(matrix, point) {
      const numRows = matrix.length;
      const numCols = matrix[0].length;

      if (numCols === 3) {
        // 2x3 matrix (translation)
        const x =
          matrix[0][0] * point[0] + matrix[0][1] * point[1] + matrix[0][2];
        const y =
          matrix[1][0] * point[0] + matrix[1][1] * point[1] + matrix[1][2];
        return [x, y];
      } else if (numCols === 2) {
        // 2x2 matrix (scaling)
        const x = matrix[0][0] * point[0] + matrix[0][1] * point[1];
        const y = matrix[1][0] * point[0] + matrix[1][1] * point[1];
        return [x, y];
      } else {
        // Unsupported matrix size
        console.error("Unsupported matrix size");
        return [NaN, NaN];
      }
    },
    drawCoordinatePlane() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw x-axis
      ctx.beginPath();
      ctx.moveTo(0, canvas.height / 2);
      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();

      // Draw y-axis
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();
    },

    drawTriangle() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext("2d");
      console.log("A.x: " + this.vertices[0] + ", A.y: " + this.vertices[1]);
      console.log("B.x: " + this.vertices[2] + ", B.y: " + this.vertices[3]);
      console.log("C.x: " + this.vertices[4] + ", C.y: " + this.vertices[5]);
      console.log("scale: " + this.scale);

      // Draw the triangle based on this.vertices
      ctx.beginPath();
      ctx.moveTo(
        this.vertices[0] + canvas.width / 2,
        -this.vertices[1] + canvas.height / 2
      );
      ctx.lineTo(
        this.vertices[2] + canvas.width / 2,
        -this.vertices[3] + canvas.height / 2
      );
      ctx.lineTo(
        this.vertices[4] + canvas.width / 2,
        -this.vertices[5] + canvas.height / 2
      );
      ctx.closePath();

      // Additional logic to draw the triangle vertices...
      ctx.fillStyle = "#7EC58E";
      ctx.fill();

      console.log("painting triangle");
    },
  },
};
</script>

<style scoped>
.triangle {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 87px solid #7ec58e; /* Adjust color and size as needed */
}
</style>
