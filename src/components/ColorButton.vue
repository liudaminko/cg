<script>
export default {
    name: 'ColorButton',
    methods: { 
        chooseHSL() {
            const hsl_button = document.querySelector('.hsl')
            const cmyk_button = document.querySelector('.cmyk')
            hsl_button.classList.add('active')
            cmyk_button.classList.remove('active')
            this.$emit('hsl')
            console.log('emitted show hsl bar')
        },
        chooseCMYK() {
            const hsl_button = document.querySelector('.hsl')
            const cmyk_button = document.querySelector('.cmyk')
            hsl_button.classList.remove('active')
            cmyk_button.classList.add('active')
            this.$emit('cmyk')
            console.log('emitted show cmyk bar')
        }
    }
}
</script>

<template>
    <div class="buttons_container">
        <button class="hsl active" @click="chooseHSL">HSL</button>
        <button class="cmyk" @click="chooseCMYK">CMYK</button>
    </div>
</template>


<style scoped>
.buttons_container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 24px;
}
button {
    border: 3px solid #000000;
    background-color: #FFFFFF;
    padding: 12px 26px;
    font-size: 24px;
    font-weight: 600;
}
.hsl {
    border-radius: 30px 0 0 30px;
}
.cmyk {
    border-radius: 0 30px 30px 0;
}
.active {
    background-color: #000000;
    color: #FFFFFF;
}
</style>
