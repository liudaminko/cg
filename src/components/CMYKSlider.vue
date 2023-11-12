<script>

export default {
    name: 'CMYKSlider',
    data() {
        return {
            cyanValue: 0,
            magentaValue: 0,
            yellowValue: 0,
            blackValue: 0
        }
    }
}
</script>


<template>
    <div class="slider_container">
        <div class="cyan_saturation">
            <div class="value_container">
                <p>Cyan: </p>
                <span class="value">{{ cyanValue }}</span>
            </div>
            <input type="range" min="0" max="100" v-model="cyanValue" class="slider" id="cyan_slider">
        </div>
        <div class="magenta_container">
            <div class="value_container">
                <p>Magenta: </p>
                <span class="value">{{ magentaValue }}</span>
            </div>
            <input type="range" min="0" max="100" v-model="magentaValue" class="slider" id="magenta_slider">
        </div>
        <div class="yellow_container">
            <div class="value_container">
                <p>Yellow: </p>
                <span class="value">{{ yellowValue }}</span>
            </div>
            <input type="range" min="0" max="100" v-model="yellowValue" class="slider" id="yellow_slider">
        </div>
        <div class="black_container">
            <div class="value_container">
                <p>Black: </p>
                <span class="value">{{ blackValue }}</span>
            </div>
            <input type="range" min="0" max="100" v-model="blackValue" class="slider" id="black_slider">
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
#cyan_slider{
    background: linear-gradient(to right, #FFFFFF, cyan);
}
#magenta_slider {
    background: linear-gradient(to right, #FFFFFF, magenta);
}
#yellow_slider {
    background: linear-gradient(to right, #FFFFFF, yellow);
}
#black_slider {
    background: linear-gradient(to right, #FFFFFF, #000000);
}
</style>