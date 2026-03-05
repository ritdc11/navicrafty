import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: {
      title: 'NaviCrafty – Learn. Create. Craft with Confidence.',
      description: 'Discover craft tutorials, materials, and tips to unleash your creative potential with NaviCrafty.'
    }
  },
  {
    path: '/tutorials',
    name: 'Tutorials',
    component: () => import('@/views/Tutorials.vue'),
    meta: {
      title: 'Craft Tutorials – NaviCrafty',
      description: 'Explore step-by-step craft tutorials for all skill levels at NaviCrafty.'
    }
  },
  {
    path: '/tutorials/:slug',
    name: 'TutorialView',
    component: () => import('@/views/TutorialView.vue')
  },
  {
    path: '/materials',
    name: 'Materials',
    component: () => import('@/views/Materials.vue'),
    meta: {
      title: 'Craft Materials & Supplies – NaviCrafty',
      description: 'Shop our curated selection of craft materials and supplies recommended by NaviCrafty.'
    }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('@/views/Blog.vue'),
    meta: {
      title: 'Craft Blog – NaviCrafty',
      description: 'Read the latest craft tips, project ideas, and inspiration on the NaviCrafty blog.'
    }
  },
  {
    path: '/blog/:slug',
    name: 'BlogPost',
    component: () => import('@/views/BlogPost.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: {
      title: 'About NaviCrafty – Learn. Create. Craft with Confidence.',
      description: 'Learn more about NaviCrafty, our mission, and the team behind your favourite craft learning hub.'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/Home.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0, behavior: 'smooth' }
  }
})

// Update document title from route meta
router.beforeEach((to) => {
  if (to.meta?.title) {
    document.title = to.meta.title
  }
})

export default router
