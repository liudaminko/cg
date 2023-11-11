<script>
export default {
}
</script>

<template>
    <button id="action_button">
        <slot />
    </button>
</template>

<style>
#action_button {
    cursor: pointer;
    border: 2px solid #000000;
    background-color: transparent;
    color: #000000;
    font-size: 24px;
    padding: 16px 40px;
    border-radius: 32px;
    transition: 0.2s linear;
}
#action_button:hover {
    background-color: #000000;
    color: #FFFFFF;
    transition: 0.2s linear;
}
</style>