<script>
export default {
    name: 'MainSlide'
}
</script>


<template>
    <div class="container">
        <div class="content_container">
            <p class="title">Dive into Fractals, Colors and Geometry</p>
            <p class="subtitle">explore colorful transformations and dynamic shapes</p>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    background-color: #EAE6DD;
    height: 707px;
}
.content_container {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    align-items: center;
    justify-content: center;
}
.title {
    font-size: 54px;
    font-weight: 700;
    text-align: center;
    margin: 0;
    margin-bottom: 24px;
    background: linear-gradient(90deg, #EA307E, #7EC58E, #8F97DC, #FF8FB1, #FCBC41);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 300% 300%;
    animation: gradient 6s ease-in-out infinite;
}

.subtitle {
    font-size: 40px;
    font-weight: 300;
    text-align: center;
    margin: 0 0 48px 0;
    background: linear-gradient(90deg, #EA307E, #7EC58E, #8F97DC, #FF8FB1, #FCBC41);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 300% 300%;
    animation: gradient 6s ease-in-out infinite;
}
@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
</style>