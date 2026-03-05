<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const isOpen = ref(false)
const isScrolled = ref(false)

const navLinks = [
  { name: 'Tutorials', to: '/tutorials' },
  { name: 'Materials', to: '/materials' },
  { name: 'Blog', to: '/blog' },
  { name: 'About', to: '/about' }
]

function toggleMenu() {
  isOpen.value = !isOpen.value
}

function closeMenu() {
  isOpen.value = false
}

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-soft' : 'bg-transparent'
    ]"
    role="banner"
  >
    <nav
      class="container-xl flex items-center justify-between h-16 md:h-20"
      aria-label="Primary navigation"
    >
      <!-- Logo -->
      <RouterLink
        to="/"
        class="flex items-center gap-2 group"
        aria-label="NaviCrafty home"
        @click="closeMenu"
      >
        <span class="text-2xl" aria-hidden="true">✂️</span>
        <span class="text-xl font-bold text-gradient group-hover:opacity-90 transition-opacity">
          NaviCrafty
        </span>
      </RouterLink>

      <!-- Desktop Nav Links -->
      <ul class="hidden md:flex items-center gap-1" role="list">
        <li v-for="link in navLinks" :key="link.to">
          <RouterLink
            :to="link.to"
            :class="[
              'px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200',
              route.path === link.to
                ? 'bg-primary text-white'
                : 'text-neutral-800 hover:bg-beige-dark hover:text-primary'
            ]"
            :aria-current="route.path === link.to ? 'page' : undefined"
          >
            {{ link.name }}
          </RouterLink>
        </li>
      </ul>

      <!-- Desktop CTA -->
      <div class="hidden md:flex items-center gap-3">
        <RouterLink
          to="/tutorials"
          class="btn-primary text-sm"
          aria-label="Start learning crafts"
        >
          Start Learning
        </RouterLink>
      </div>

      <!-- Mobile Menu Toggle -->
      <button
        class="md:hidden p-2 rounded-xl text-neutral-800 hover:bg-beige-dark transition-colors"
        :aria-expanded="isOpen"
        aria-controls="mobile-menu"
        aria-label="Toggle navigation menu"
        @click="toggleMenu"
      >
        <svg v-if="!isOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <!-- Mobile Menu -->
    <div
      v-show="isOpen"
      id="mobile-menu"
      class="md:hidden bg-white/95 backdrop-blur-sm border-t border-beige-dark"
    >
      <ul class="container-xl py-4 flex flex-col gap-1" role="list">
        <li v-for="link in navLinks" :key="link.to">
          <RouterLink
            :to="link.to"
            :class="[
              'block px-4 py-3 rounded-xl font-medium transition-all duration-200',
              route.path === link.to
                ? 'bg-primary text-white'
                : 'text-neutral-800 hover:bg-beige-dark'
            ]"
            :aria-current="route.path === link.to ? 'page' : undefined"
            @click="closeMenu"
          >
            {{ link.name }}
          </RouterLink>
        </li>
        <li class="pt-2">
          <RouterLink
            to="/tutorials"
            class="block btn-primary text-center text-sm"
            @click="closeMenu"
          >
            Start Learning
          </RouterLink>
        </li>
      </ul>
    </div>
  </header>

  <!-- Spacer for fixed header -->
  <div class="h-16 md:h-20" aria-hidden="true"></div>
</template>
