import Home from './views/HomeView.vue'
import Color from './views/ColorView.vue'
import Fractals from './views/FractalsView.vue'
import Geometry from './views/GeometryView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        name: 'HomeView',
        component: Home,
        path: '/'
    },
    {
        name: 'FractalsView',
        component: Fractals,
        path: '/fractals'
    },
    {
        name: 'ColorView',
        component: Color,
        path: '/color'
    },
    {
        name: 'GeometryView',
        component: Geometry,
        path: '/geometry'
    }
]

const router = createRouter({
    history:createWebHistory(),
    routes
})
export default router