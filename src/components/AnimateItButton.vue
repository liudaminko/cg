<script>
export default {
    methods: {
        AddAnimateClass() {
            const button = document.getElementById('animate_button')
            button.classList.add('animate')
            setTimeout(() => {
                button.classList.remove('animate'); // Remove the "animate" class
            }, 600)
        }
    }
}
</script>

<template>
    <button id="animate_button" @click="AddAnimateClass">Create it</button>
</template>

<style>
#animate_button {
    margin: 0;
    cursor: pointer;
    width: 260px;
    background-color: #000000;
    color: #FFFFFF;
    font-size: 24px;
    padding: 12px 40px;
    border: 2px solid transparent;
    border-radius: 32px;
    transition: transform 0.2s linear, border-image 0.2s linear;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    position: relative;
}

#animate_button:active {
    transform: scale(0.96);
    background: linear-gradient(rgb(35, 14, 14), black) padding-box, linear-gradient(to right, #EA307E, #7EC58E, #8F97DC, #FF8FB1, #FCBC41) border-box;
    border-radius: 32px;
    border: 2px solid transparent;
}/*
.animate::before{
    filter: blur(4px);
    content: "";
    position: absolute;
    z-index: -1;
    height: 250%;
    transform: translate(-36%, -2%);
    border: 2px solid red;
    width: 150%; 
    background-repeat: no-repeat;
    top: -70%;
    background-image: radial-gradient(circle, #EA307E 20%, transparent 20%),
    radial-gradient(circle, #7EC58E 20%, transparent 20%),
    radial-gradient(circle, #8F97DC 20%, transparent 20%),
    radial-gradient(circle, #FF8FB1 20%, transparent 20%),
    radial-gradient(circle, #FCBC41 20%, transparent 20%);
    background-size: 50% 50%, 30% 30%, 65% 65%, 40% 40%, 60% 60%;
    background-position: 0% 50%, 40% 50%, 70% 46%, 25% 50%, 110% 50%;
    animation: topBubbles 0.6s ease-in-out forwards;
}
@keyframes topBubbles {
    0% {
        background-position: -30% 100%, 45% 25%, 75% 35%, 30% 25%, 105% 25%;
    }
    10% {
        background-position: -35% 95%, 50% 30%, 80% 40%, 35% 30%, 110% 30%;
    }
    20% {
        background-position: -40% 90%, 55% 35%, 85% 45%, 40% 35%, 115% 35%;
    }
    30% {
        background-position: -45% 85%, 60% 40%, 90% 50%, 45% 40%, 120% 40%;
    }
    40% {
        background-position: -50% 80%, 65% 45%, 95% 55%, 50% 45%, 125% 45%;
    }
    50% {
        background-position: -55% 75%, 70% 50%, 100% 60%, 55% 50%, 130% 50%;
    }
    60% {
        background-position: -60% 70%, 75% 55%, 105% 65%, 60% 55%, 135% 55%;
    }
    70% {
        background-position: -65% 65%, 80% 60%, 110% 70%, 65% 60%, 140% 60%;
    }
    80% {
        background-position: -70% 60%, 85% 65%, 115% 75%, 70% 65%, 145% 65%;
    }
    90% {
        background-position: -75% 55%, 90% 70%, 120% 80%, 75% 70%, 150% 70%;
    }
    100% {
        background-position: -80% 50%, 95% 75%, 125% 85%, 80% 75%, 155% 75%;
    }
}*/



</style>