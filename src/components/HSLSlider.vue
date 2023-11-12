<script>
export default {
  name: "HSLSlider",
  data() {
    return {
      hueValue: 0,
      saturationValue: 0,
      lightnessValue: 0,
      lastEmittedSaturationValue: 0,
    };
  },
  methods: {
    handleMouseUp() {
      if (this.saturationValue !== this.lastEmittedSaturationValue) {
        console.log("change: saturation is now " + this.saturationValue);
        if (Number.isInteger(this.saturationValue)) {
          this.$emit("change", this.saturationValue);
          this.lastEmittedSaturationValue = this.saturationValue;
        }
      }
    },
  },
};
</script>

<template>
  <div class="slider_container">
    <div class="saturation_container">
      <div class="value_container">
        <p>Saturation:</p>
        <span class="value">{{ saturationValue }}</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        v-model="saturationValue"
        class="slider"
        id="sat_slider"
        @input="handleMouseUp"
      />
    </div>
  </div>
</template>

<style scoped>
.slider_container {
  display: flex;
  align-items: left;
  justify-content: center;
  flex-direction: column;
  background-color: #f5f5f5;
  padding: 32px 16px;
  border-radius: 16px;
  width: 300px;
}
.value_container {
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
  gap: 8px;
}
p {
  margin: 0;
}
input {
  margin: 0;
}
.slider {
  height: 20px;
  -webkit-appearance: none;
  border-radius: 10px;
  width: 100%;
}
.slider::-webkit-slider-thumb {
  cursor: pointer;
  appearance: none;
  height: 20px;
  width: 20px;
  background: none;
  border: 2px solid #ffffff;
  border-radius: 10px;
}
#hue_slider {
  background: linear-gradient(
    to right,
    #ff0000,
    #fff500,
    #33ff00,
    #0500ff,
    #ff0000
  );
}
#sat_slider {
  background: linear-gradient(to right, #767676, #fff500);
}
#light_slider {
  background: linear-gradient(to right, #000000, #fff500, #ffffff);
}
</style>
