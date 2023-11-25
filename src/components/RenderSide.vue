<template>
  <div class="render_container">
    <slot />
  </div>
</template>
<style scoped>
.render_container {
  background-color: #f5f5f5;
  border-radius: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;
}
</style>
