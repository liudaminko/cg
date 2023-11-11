<script>
export default {
    name: 'FractalsButton',
    methods: { 
        chooseFractal() {
            const fractal_button = document.querySelector('.fractal')
            const plasma_button = document.querySelector('.plasma')
            fractal_button.classList.add('active')
            plasma_button.classList.remove('active')
            this.$emit('fractal')
            console.log('emitted draw fractal sin(z)*z')
        },
        choosePlasma() {
            const fractal_button = document.querySelector('.fractal')
            const plasma_button = document.querySelector('.plasma')
            fractal_button.classList.remove('active')
            plasma_button.classList.add('active')
            this.$emit('plasma')
            console.log('emitted draw plasma')
        }
    }
}
</script>

<template>
    <div class="buttons_container">
        <button class="fractal active" @click="chooseFractal">Fractal</button>
        <button class="plasma" @click="choosePlasma">Plasma</button>
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
.fractal {
    border-radius: 30px 0 0 30px;
}
.plasma {
    border-radius: 0 30px 30px 0;
}
.active {
    background-color: #000000;
    color: #FFFFFF;
}
</style>
