<template>
    <div class="render_container">
        <slot />
    </div>
</template>
<style scoped>
.render_container {
    background-color: #F5F5F5;
    border-radius: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 100%; /* Adjust to limit the width */
    max-height: 100%; /* Adjust to limit the height */
    overflow: hidden; /* Hide overflow content */
}
</style>