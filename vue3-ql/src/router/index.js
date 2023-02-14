import { createRouter, createWebHistory } from 'vue-router'
import PostIndex from '../views/Posts/Index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'post-index',
      component: PostIndex
    },
    {
      path: '/posts/create',
      name: 'post-create',
      component: () => import('../views/Posts/Create.vue')
    },
    {
      path: '/posts/edit/:id',
      name: 'post-edit',
      component: () => import('../views/Posts/Edit.vue')
    },
    {
      path: '/posts/:id',
      name: 'post-show',
      component: () => import('../views/Posts/Show.vue')
    }
  ]
})

export default router
