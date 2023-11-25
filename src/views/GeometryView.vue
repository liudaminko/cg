<script>
import ActionButton from "../components/ActionButton.vue";
import RenderContainer from "../components/RenderSide.vue";
import AnimateButton from "../components/AnimateItButton.vue";
import Popup from "../components/InfoPopup.vue";
import Params from "../components/MovementParameters.vue";
import Triangle from "../components/TriangleMove.vue";

export default {
  name: "GeometryView",
  components: {
    ActionButton,
    RenderContainer,
    AnimateButton,
    Popup,
    Params,
    Triangle,
  },
  data() {
    return {
      animationRunning: false,
      showPopup: false,

      triangleCoordinates: {
        pointA: { x: 0, y: 0 },
        pointB: { x: 0, y: 0 },
        pointC: { x: 0, y: 0 },
        scale: 1,
      },
      popupTitle: "Geometry",
      popupText:
        "Geometry, specifically the movement of triangles within fractals, introduces a dynamic dimension to visual art and mathematical exploration. When triangles are set in motion within fractal patterns, they add a mesmerizing element of change and transformation. These moving triangles often follow intricate trajectories, enhancing the overall complexity of the fractal structure. The movement of triangles in fractals can represent various mathematical concepts, such as the convergence of geometric series or the chaotic behavior of dynamical systems. It also allows for the creation of animations that reveal the beauty and intricacy of mathematical patterns over time. Artists and mathematicians alike are drawn to the dynamic interplay of geometry and motion in fractals, using them as a canvas to illustrate the harmony between mathematics and aesthetics. This fusion of geometry and animation within fractals not only showcases the elegance of mathematical principles but also offers a captivating visual experience that engages viewers in the exploration of complex and ever-evolving shapes.",
    };
  },
  methods: {
    startAnimation() {
      //method to start animation
      //move of triangle
      this.$refs.triangleMove.moveAndScaleTriangle();
    },
    closePopup() {
      this.showPopup = false;
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="content_container">
      <div class="buttons">
        <Params
          v-model="triangleCoordinates"
          @update:params="triangleCoordinates = $event"
        />
        <div class="header_buttons">
          <AnimateButton @click="startAnimation"></AnimateButton>
        </div>
        <div class="footer_buttons">
          <ActionButton @click="showPopup = true">Learn more</ActionButton>
          <ActionButton @click="exportData">Save as</ActionButton>
        </div>
      </div>
      <RenderContainer>
        <Triangle ref="triangleMove" :coordinates="triangleCoordinates" />
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
