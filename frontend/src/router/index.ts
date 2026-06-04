import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import PropertiesView from '@/views/PropertiesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/imoveis',
      name: 'imoveis',
      component: PropertiesView,
    },
    // {
    //   path: '/sobre',
    //   name: 'sobre',
    //   component: () => import('@/views/SobreView.vue'),
    // },
    // {
    //   path: '/contato',
    //   name: 'contato',
    //   component: () => import('@/views/ContatoView.vue'),
    // },
  ],
})

export default router
