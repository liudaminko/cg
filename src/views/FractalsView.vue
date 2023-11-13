<script>
import PlasmaGenerator from "@/components/Plasma.vue";
import FractalGenerator from "../components/Fractal.vue";
import ActionButton from "../components/ActionButton.vue";
import RenderContainer from "../components/RenderSide.vue";
import AnimateButton from "../components/AnimateItButton.vue";
import Popup from "../components/InfoPopup.vue";
import FractalButtons from "../components/FractalButton.vue";
import ColorPalette from "../components/ColorPalette.vue";

export default {
  name: "FractalsView",
  components: {
    PlasmaGenerator,
    FractalGenerator,
    ActionButton,
    RenderContainer,
    AnimateButton,
    Popup,
    FractalButtons,
    ColorPalette,
  },
  data() {
    return {
      animationRunning: false,
      showPopup: false,
      showFractal: true,
      showPlasma: false,
      generateFractal: false,
      selectedPalette: 0,
      generatePlasma: false,
      popupTitle: "Fractals",
      popupText:
        'The fractal z*sin(z) is a mesmerizing mathematical construct that combines the complex variable "z" with the sine function to produce intricate, self-replicating patterns. This formula generates captivating shapes, including spirals, branches, and intricate tendrils, which exhibit self-similarity across different scales. This means that as you zoom in or out, you`ll find similar structures repeating endlessly, offering a sense of infinite complexity. Fractals derived from z*sin(z) are renowned for their dynamic nature, allowing for real-time exploration and creative expression. Artists, mathematicians, and scientists alike find inspiration in this fractal`s ability to seamlessly merge mathematical beauty with captivating visual art. It serves as a testament to the fascinating interplay between mathematics and the natural world, offering a playground for exploration and artistic expression.',
    };
  },
  methods: {
    startAnimation() {
      if (this.showPlasma) {
        this.generatePlasma = true;
      } else if (this.showFractal) {
        this.generateFractal = true;

        // Use $nextTick to ensure that the component is updated and the method is available
        this.$nextTick(() => {
          this.$refs.fractal.generateWithColorScheme(this.selectedPalette);
        });
      }
    },
    changeColorScheme(index) {
      this.selectedPalette = index;
    },
    animationStopped() {
      this.animationRunning = false;
    },
    closePopup() {
      this.showPopup = false;
    },
    showFractalComponent() {
      this.showFractal = true;
      this.showPlasma = false;
    },
    showPlasmaComponent() {
      this.showFractal = false;
      this.showPlasma = true;
    },
    exportData() {
      const canvas = document.querySelector("canvas");
      const imageDataURL = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = imageDataURL;
      downloadLink.download = "plasma.jpg";
      downloadLink.click();
    },
    changeColorScheme(index) {
      this.selectedPalette = index;
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="content_container">
      <div class="buttons">
        <div class="header_buttons">
          <FractalButtons
            @fractal="showFractalComponent"
            @plasma="showPlasmaComponent"
          ></FractalButtons>
          <ColorPalette
            @palette-change="changeColorScheme"
            v-if="showFractal"
          />
          <AnimateButton @click="startAnimation"></AnimateButton>
        </div>
        <div class="footer_buttons">
          <ActionButton @click="showPopup = true">Learn more</ActionButton>
          <ActionButton @click="exportData">Save as</ActionButton>
        </div>
      </div>
      <RenderContainer>
        <FractalGenerator
          ref="fractal"
          v-if="showFractal"
          :selectedPalette="selectedPalette"
        />
        <PlasmaGenerator v-if="showPlasma" :generatePlasma="generatePlasma" />
      </RenderContainer>
    </div>
    <Popup
      v-if="showPopup"
      :title="popupTitle"
      :text="popupText"
      @close="closePopup"
    ></Popup>
  </div>
</template>

<style scoped>
.container {
  margin-top: 66.4px;
  padding: 32px 48px;
  height: 643px;
}
.content_container {
  display: grid;
  gap: 3%;
  grid-template-columns: 30% 67%;
  height: 100%;
}
.buttons {
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.header_buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.footer_buttons {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
}
</style>
