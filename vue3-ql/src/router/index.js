import { createRouter, createWebHistory } from 'vue-router'

import AuthLayout from '../views/Layouts/AuthLayout.vue';
import DefaultLayout from '../views/Layouts/DefaultLayout.vue';

import PostIndex from '../views/Posts/Index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/',
        redirect: "/posts",
        component: DefaultLayout,
        meta: { requiresAuth: true },
        children: [
          { path: '/posts',name: 'post-index', component: PostIndex },
          { path: '/posts/create', name: 'post-create', component: () => import('../views/Posts/Create.vue') },
          { path: '/posts/edit/:id',name: 'post-edit',component: () => import('../views/Posts/Edit.vue') },
          { path: '/posts/:id',name: 'post-show',component: () => import('../views/Posts/Show.vue') }
        ]
    },
    {
        path: "/auth",
        redirect: "/login",
        name: "login",
        component: AuthLayout,
        meta: { isGuest: true },
        children: [
          { path: "/login", name: "login", component: () => import('@/views/Auth/Login.vue')}
        ]
    },
    {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFound.vue')
    }


  ]
})

// middleware
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !localStorage.getItem('token')) {
      next({ name: "login" });
    }
    else if (to.meta.isGuest && localStorage.getItem('token')) {
      next({ name: "post-index" });
    } else {
    next();
    }
  })

export default router
