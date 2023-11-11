<script>
import {ref, onMounted} from 'vue'
export default {
    setup() {
        const curSlide = ref(1)
        const getSlideCount = ref(null)

        //next slide
        const nextSlide = () => {
            if (curSlide.value === getSlideCount.value) {
                curSlide.value = 1
                return
            }
            curSlide.value += 1
        }
        const setSlide = (index) => {
            curSlide.value = index
        }
        onMounted(() => {
            getSlideCount.value = document.querySelectorAll('.slide').length
        })

        return {curSlide, nextSlide, getSlideCount, setSlide}
    }
}
</script>


<template>
    <div class="carousel" @click="nextSlide">
        <slot :curSlide="curSlide" />
        <div class="pagination">
            <span @click="setSlide(index)" v-for="(slide, index) in getSlideCount" :key="index" :class="{active : index + 1 === curSlide}"></span>
        </div>
    </div>
</template>

<style scoped>
.pagination {
    position: absolute;
    bottom: 24px;
    width: 100%;
    display: flex;
    gap: 16px;
    justify-content: center;
    align-items: center;
}
span {
    cursor: pointer;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: transparent;
    border: 2px solid #000000;

}
.active {
    background-color: #000000;
}
</style>