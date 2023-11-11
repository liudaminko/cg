<script>
import Header from '@/components/Header.vue';

export default {
  name: 'App',
  components: {
      Header
  }
}
</script>

<template>
  <Header/>
  <router-view />
</template>


<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  color: #000000;
  font-family: 'HelveticaNeueCyr', sans-serif;
  font-size: 21px;
  font-weight: 400;
  overflow: hidden;
}
* {
  box-sizing: border-box;
}
</style>
