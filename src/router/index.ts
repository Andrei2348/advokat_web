import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: () => import('@/views/ErrorPage/ErrorPage.vue'),
    meta: {
      layout: 'Simple',
      tKey: 'error.notFound',
    },
  },
  // {
  //   path: '/',
  //   name: 'home',
  //   component: () => import('@/views/HomePage/HomePage.vue'),
  //   meta: {
  //     layout: 'Main',
  //   },
  // },
  // {
  //   path: '/lawsuit/:id',
  //     name: 'lawsuit-details',
  //     component: () => import('@/views/LawsuitDetails/LawsuitDetails.vue'),
  //     meta: {
  //       layout: 'Main',
  //     },
  // },

  {
    path: '/',
    name: 'root',
    // component: () => import('@/App/App.vue'),
    meta: {
      layout: 'Main',
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/HomePage/HomePage.vue'),
        meta: {
          layout: 'Main',
        },
      },
      {
        path: 'lawsuit/:id',
        name: 'lawsuit-details',
        component: () => import('@/views/LawsuitDetails/LawsuitDetails.vue'),
        meta: {
          layout: 'Main',
        },
      },
    ],
  },

  {
    path: '/calendar',
    name: 'calendar',
    component: () => import('@/views/CalendarPage/CalendarPage.vue'),
    meta: {
      layout: 'Main',
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfilePage/ProfilePage.vue'),
    meta: {
      layout: 'Main',
    },
  },

  {
    path: '/clients',
    name: 'clients',
    meta: {
      layout: 'Main',
    },
    children: [
      {
        path: '',
        name: 'clients',
        component: () => import('@/views/ClientsPage/ClientsPage.vue'),
        meta: {
          layout: 'Main',
        },
      },
      {
        path: 'client',
        name: 'client',
        component: () => import('@/views/ClientDetails/ClientDetails.vue'),
        meta: {
          layout: 'Main',
        },
      },
    ],
  },

  {
    path: '/finance',
    name: 'finance',
    component: () => import('@/views/FinancePage/FinancePage.vue'),
    meta: {
      layout: 'Main',
    },
  },
  {
    path: '/notes',
    name: 'notes',
    component: () => import('@/views/NotesPage/NotesPage.vue'),
    meta: {
      layout: 'Main',
    },
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/SettingsPage/SettingsPage.vue'),
    meta: {
      layout: 'Main',
    },
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: () => import('@/views/TasksPage/TasksPage.vue'),
    meta: {
      layout: 'Main',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/AuthPage/AuthPage.vue'),
    meta: {
      layout: 'Auth',
    },
  },
  {
    path: '/login/recovery',
    name: 'recoveryPassword',
    component: () => import('@/views/AuthPage/AuthPage.vue'),
    meta: {
      layout: 'Auth',
    },
  },
  {
    path: '/login/registration',
    name: 'registration',
    component: () => import('@/views/AuthPage/AuthPage.vue'),
    meta: {
      layout: 'Auth',
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: (to, from, savedPosition) => {
    if (to.hash) return { selector: to.hash }
    if (savedPosition) return savedPosition
    return { x: 0, top: 0 }
  },
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (
    !authStore.isAuth &&
    to.name !== 'login' &&
    to.name !== 'recoveryPassword' &&
    to.name !== 'registration'
  ) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export { router, routes }