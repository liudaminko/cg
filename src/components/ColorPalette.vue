<script>
export default {
  data() {
    return {
      selectedPalette: null,
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
  methods: {
    handlePaletteChange(index) {
      this.selectedPalette = index;
      this.$emit("palette-change", this.selectedPalette);
    },
  },
};
</script>

<template>
  <div class="color_palette_container">
    <label for="color_palette">Color palettes:</label>
    <div class="color-palette-row">
      <div
        v-for="(palette, index) in colorPalettes"
        :key="index"
        @click="handlePaletteChange(index)"
        :class="{ 'color-circle': true, selected: index === selectedPalette }"
        :style="{
          background: `linear-gradient(to right, ${palette.colors.join(',')})`,
        }"
      ></div>
    </div>
  </div>
</template>

<style scoped>
.color_palette_container {
  display: flex;
  align-items: left;
  justify-content: center;
  flex-direction: column;
  background-color: #f5f5f5;
  padding: 32px 16px;
  border-radius: 16px;
  width: 300px;
  gap: 16px;
  margin-bottom: 32px;
}
.color-palette-row {
  display: flex;
}

.color-circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
  border: 2px solid transparent;
}

.selected {
  border-color: #333;
}
</style>
