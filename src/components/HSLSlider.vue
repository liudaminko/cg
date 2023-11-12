<script>
export default {
  name: 'HSLSlider',
  data() {
    return {
      hueValue: 0,
      saturationValue: 0,
      lightnessValue: 0, // Initialize lightnessValue here
    };
  },
  watch: {
    saturationValue() {
      this.emitChange();
    }
  },
  methods: {
    emitChange() {
      this.$emit('change', this.saturationValue);
    },
  },
  
};
function debounce(callback, delay) {
  let timerId;
  return function() {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback.apply(this, arguments);
    }, delay);
  };
}
</script>



<template>
    <div class="slider_container">
        <div class="hue_saturation">
            <div class="value_container">
                <p>Hue: </p>
                <span class="value">{{ hueValue }}</span>
            </div>
            <input type="range" min="0" max="360" v-model="hueValue" class="slider" id="hue_slider">
        </div>
        <div class="saturation_container">
            <div class="value_container">
                <p>Saturation: </p>
                <span class="value">{{ saturationValue }}</span>
            </div>
            <input type="range" min="0" max="100" v-model="saturationValue" class="slider" id="sat_slider">
        </div>
        <div class="lightness_container">
            <div class="value_container">
                <p>Lightness: </p>
                <span class="value">{{ lightnessValue }}</span>
            </div>
            <input type="range" min="0" max="100" v-model="lightnessValue" class="slider" id="light_slider">
        </div>
        
    </div>
</template>

<style scoped>
.slider_container {
    display: flex;
    align-items: left;
    justify-content: center;
    flex-direction: column;
    background-color: #F5F5F5;
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
    border: 2px solid #FFFFFF;
    border-radius: 10px;
}
#hue_slider{
    background: linear-gradient(to right, #FF0000, #FFF500, #33FF00, #0500FF, #FF0000);
}
#sat_slider {
    background: linear-gradient(to right, #767676, #FFF500);
}
#light_slider {
    background: linear-gradient(to right, #000000, #FFF500, #FFFFFF);
}
</style>