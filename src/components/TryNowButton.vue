<script>
export default {
}
</script>

<template>
    <button id="action_button">
        <slot />
    </button>
</template>

<style scoped>
#action_button {
    border: 2px solid #FFFFFF;
    background-color: transparent;
    color: #FFFFFF;
    font-size: 24px;
    padding: 16px 40px;
    border-radius: 32px;
    transition: 0.2s linear;
}
#action_button:hover {
    background-color: #FFFFFF;
    color: #000000;
    transition: 0.2s linear;
}
</style>