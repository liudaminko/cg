<script>
import TryNowButton from './TryNowButton.vue'
export default {
    name: 'FractalSlide',
    components: {
        TryNowButton
    }
}
</script>


<template>
    <div class="container">
        <video id="background_video" src="../assets/fractal.mp4" autoplay loop muted></video>
        <div class="content_container">
            <p class="title">Fractal Fusion: z*sin(z) vs. Plasma</p>
            <p class="subtitle">a clash of infinite patterns and elemental forces</p>
            <TryNowButton @click="this.$router.push({name: 'FractalsView'})">Try now</TryNowButton>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    height: 707px;
}
#background_video {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
}
.content_container {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
}
.title {
    font-size: 54px;
    font-weight: 700;
    text-align: center;
    margin: 0;
    margin-bottom: 24px;
}

.subtitle {
    font-size: 40px;
    font-weight: 300;
    text-align: center;
    margin: 0 0 48px 0;
}
</style>