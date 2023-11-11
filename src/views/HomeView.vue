<script>
import Carousel from '../components/Slider.vue'
import MainSlide from '../components/MainSlide.vue'
import FractalSlide from '../components/FractalSlide.vue'
import ColorSlide from '../components/ColorSlide.vue'
import GeometrySlide from '@/components/GeometrySlide.vue'
import Slide from '../components/Slide.vue'
export default {
    name: 'HomeView',
    components: {
        Carousel,
        Slide,
        MainSlide,
        FractalSlide,
        ColorSlide,
        GeometrySlide
    },
    setup() {
        const carouselSlides = [MainSlide, FractalSlide, ColorSlide, GeometrySlide]
        return {carouselSlides}
    }
}
</script>


<template>
    <div class="container">
        <Carousel class="carousel" v-slot="{curSlide}">
            <Slide v-for="(slide, index) in carouselSlides" :key="index">
                <component v-show="curSlide === index + 1" :is="slide"></component>
            </Slide>
        </Carousel>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    height: 707px;
    width: 100vw;
}
.carousel {
    max-height: 100vh;
    height: 707px;
}
</style>