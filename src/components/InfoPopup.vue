<script>

export default {
    props: {
        title: String,
        text: String
    },
    methods: {
        closePopup() {
            this.$emit('close')
        }
    }
}
</script>


<template>
    <div class="background">
        <div class="popup_container">
            <div class="popup_header">
                <h1>{{ title }}</h1>
                <img src="../assets/cancel.png" @click="closePopup">
            </div>
            <div class="popup_content">
                <img src="../assets/Questions-cuate.svg">
                <p>{{ text }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.background {
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.8);
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 20;
}
.popup_container {
    height: 80%;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #FFFFFF;
}
.popup_header {
    display: flex;
    align-items: center;
    justify-content: center;
}
h1 {
    text-align: center;
    margin: 21px 0 32px;
}
.popup_header img {
    height: 40px;
    position: fixed;
    top: 95px;
    right: 185px;
}
.popup_content {
    display: flex;
    flex-direction: row;
    padding: 0 32px 64px 32px;
}
.popup_content img {
    height: 500px;
    position: relative;
    top: -60px;
}
p {
    margin: 0;
    font-size: 18px;
}
</style>