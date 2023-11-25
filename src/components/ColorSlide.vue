<script>
import TryNowButton from "./ActionButton.vue";
export default {
  name: "ColorSlide",
  components: {
    TryNowButton,
  },
};
</script>

<template>
  <div class="container">
    <div class="content_container">
      <p class="title">The Art of Color Transformation</p>
      <p class="subtitle">
        unleash your imagination with dynamic color schemes
      </p>
      <TryNowButton @click="this.$router.push({ name: 'ColorView' })"
        >Try now</TryNowButton
      >
      <div class="gradient_bg">
        <div class="gradients_container">
          <div class="g1"></div>
          <div class="g2"></div>
          <div class="g3"></div>
          <div class="g4"></div>
          <div class="g5"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes moveInCircle {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes moveVertical {
  0% {
    transform: translateY(-50%);
  }
  50% {
    transform: translateY(50%);
  }
  100% {
    transform: translateY(-50%);
  }
}
@keyframes moveVertical {
  0% {
    transform: translateY(-50%);
  }
  50% {
    transform: translateY(50%);
  }
  100% {
    transform: translateY(-50%);
  }
}
@keyframes moveHorizontal {
  0% {
    transform: translateX(-50%) translateY(-10%);
  }
  50% {
    transform: translateX(50%) translateY(10%);
  }
  100% {
    transform: translateX(-50%) translateY(-10%);
  }
}
.container {
  display: flex;
  height: 707px;
}
.content_container {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
  width: 100%; /* Set the width to 100% or another appropriate value */
  height: 100vh;
}
.gradient_bg {
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
  background: linear-gradient(40deg, #ea307e, #fcbc41);
  top: 0;
  left: 0;
  z-index: -1;
}
.gradients_container {
  width: 100%;
  height: 100%;
}
.g1 {
  position: absolute;
  background: radial-gradient(
      circle at center,
      rgba(143, 151, 220, 0.8) 0%,
      rgba(143, 151, 220, 0) 50%
    )
    no-repeat;
  mix-blend-mode: hard-light;
  width: 600px;
  height: 600px;
  top: calc(50% - 600 / 2);
  left: calc(50% - 600 / 2);
  opacity: 1;
  transform-origin: center center;
  animation: moveVertical 30s ease infinite;
}
.g2 {
  position: absolute;
  background: radial-gradient(
      circle at center,
      rgba(252, 188, 65, 0.8) 0%,
      rgba(252, 188, 65, 0) 50%
    )
    no-repeat;
  mix-blend-mode: hard-light;
  width: 800px;
  height: 600px;
  top: calc(50% - 400 / 2);
  left: calc(50% - 400 / 2);
  opacity: 1;
  transform-origin: calc(50%-400px);
  animation: moveInCircle 20s reverse infinite;
}

.g3 {
  position: absolute;
  background: radial-gradient(
      circle at center,
      rgba(126, 197, 142, 0.8) 0%,
      rgba(126, 197, 142, 0) 50%
    )
    no-repeat;
  mix-blend-mode: hard-light;
  width: 300px;
  height: 300px;
  top: calc(50% - 300 / 2 + 100px);
  left: calc(50% - 300 / 2 - 300px);
  opacity: 1;
  transform-origin: calc(50%+400px);
  animation: moveInCircle 40s linear infinite;
}

.g4 {
  position: absolute;
  background: radial-gradient(
      circle at center,
      rgba(234, 48, 126, 0.8) 0%,
      rgba(234, 48, 126, 0) 50%
    )
    no-repeat;
  mix-blend-mode: hard-light;
  width: 250px;
  height: 250px;
  top: calc(50% - 250 / 2 - 75px);
  left: calc(50% - 250 / 2 + 300px);
  opacity: 0.7;
  transform-origin: calc(50%-200px);
  animation: moveHorizontal 40s ease infinite;
}

.g5 {
  position: absolute;
  background: radial-gradient(
      circle at center,
      rgba(255, 143, 177, 0.8) 0%,
      rgba(255, 143, 177, 0) 50%
    )
    no-repeat;
  mix-blend-mode: hard-light;
  width: 600px;
  height: 300px;
  top: calc(50% - 300 / 2);
  left: calc(50% - 600 / 2);
  opacity: 1;
  transform-origin: calc(50%-800px) calc(50%+200px);
  animation: moveInCircle 20s ease infinite;
}

.title {
  font-size: 50px;
  font-weight: 900;
  text-align: center;
  margin: 0;
  margin-bottom: 24px;
  color: #000000;
}

.subtitle {
  font-size: 40px;
  font-weight: 300;
  text-align: center;
  margin: 0 0 48px 0;
  color: #000000;
}
</style>
