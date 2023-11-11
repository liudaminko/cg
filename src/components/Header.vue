<script>
export default {
    name: 'AppHeader'
}
</script>

<template>
    <header>
        <div class="logo">
            <img src="../assets/logo.svg" @click="this.$router.push({name: 'HomeView'})">
        </div>
        <nav>
            <ul>
                <li class="nav_item"><a @click="this.$router.push({name: 'FractalsView'})">Fractal</a></li>
                <li class="nav_item"><a @click="this.$router.push({name: 'ColorView'})">Color</a></li>
                <li class="nav_item"><a @click="this.$router.push({name: 'GeometryView'})">Geometry</a></li>
            </ul>
        </nav>
    </header>
</template>


<style>
header {
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 16px 96px;
    z-index: 10;
    background-color: #EAE6DD;
    align-items: center;
}
img {
    height: 30px;
    cursor: pointer;
}
nav {
    height: fit-content;
}
ul {
    margin: 0;
    padding: 0;
    display: flex;
    gap: 80px;
}
li {
    display: inline;
    
}
a {
    text-decoration: none;
    display: inline-block;
    position: relative;
    cursor: pointer;
}

a::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: -6px;
  left: 0;
  background-color: #000000;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

a:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>
