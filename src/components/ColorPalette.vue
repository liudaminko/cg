<template>
    <div>
      <label for="colorPalette">Color palettes:</label>
      <select id="colorPalette" @change="handlePaletteChange">
        <option v-for="(palette, index) in colorPalettes" :key="index" :value="index">{{ palette.name }}</option>
      </select>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        colorPalettes: [
            {
                name: "Grayscale",
                colors: ["#000000", "#333333", "#666666", "#999999", "#CCCCCC", "#FFFFFF"],
            },
            {
                name: "Rainbow",
                colors: ["#FF0000", "#FFA500", "#FFFF00", "#008000", "#0000FF", "#4B0082", "#9400D3"],
            },
            {
                name: "Pastel",
                colors: ["#FFB6C1", "#FFD700", "#ADFF2F", "#87CEEB", "#FF69B4", "#BA55D3", "#7B68EE"],
            },
            {
                name: "Earth Tones",
                colors: ["#8B4513", "#CD853F", "#D2691E", "#A0522D", "#BC8F8F", "#8B0000", "#B8860B"],
            },
            {
                name: "Cool Blues",
                colors: ["#66CCCC", "#3399FF", "#0066CC", "#0099CC", "#3366FF", "#99CCFF", "#003366"],
            },
        ]


      };
    },
    methods: {
        handlePaletteChange(event) {
            const newPaletteIndex = event.target.value;
            this.$emit('palette-change', newPaletteIndex, this.colorPalettes); // Emit an event with the selected index and color palettes
        },
    },

  };
  </script>
  