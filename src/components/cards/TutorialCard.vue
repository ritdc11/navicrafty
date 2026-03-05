<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  slug: { type: String, required: true },
  category: { type: String, required: true },
  level: { type: String, required: true },
  duration: { type: String, required: true },
  image: { type: String, required: true },
  excerpt: { type: String, required: true }
})

const levelColour = {
  Beginner: 'bg-accent/20 text-accent-dark',
  Intermediate: 'bg-secondary/30 text-secondary-dark',
  Advanced: 'bg-primary/20 text-primary-dark'
}
</script>

<template>
  <article class="card-base card-hover group overflow-hidden flex flex-col h-full">
    <!-- Image -->
    <div class="relative overflow-hidden aspect-video rounded-t-2xl">
      <img
        :src="image"
        :alt="`${title} craft tutorial`"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        decoding="async"
        width="600"
        height="338"
      />
      <!-- Category Badge -->
      <span
        class="absolute top-3 left-3 text-xs font-semibold bg-white/90 backdrop-blur-sm text-primary px-3 py-1 rounded-full shadow-soft"
        aria-label="Category"
      >
        {{ category }}
      </span>
    </div>

    <!-- Content -->
    <div class="p-5 flex flex-col flex-1">
      <!-- Meta -->
      <div class="flex items-center gap-2 mb-3">
        <span
          :class="['text-xs font-medium px-2.5 py-1 rounded-full', levelColour[level]]"
          aria-label="Difficulty level"
        >
          {{ level }}
        </span>
        <span class="text-xs text-neutral-800/50 flex items-center gap-1" aria-label="Duration">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ duration }}
        </span>
      </div>

      <h3 class="text-base font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
        {{ title }}
      </h3>

      <p class="text-sm text-neutral-800/60 line-clamp-2 mb-4 flex-1">
        {{ excerpt }}
      </p>

      <RouterLink
        :to="`/tutorials/${slug}`"
        class="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark transition-colors mt-auto"
        :aria-label="`View tutorial: ${title}`"
      >
        View Tutorial
        <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </RouterLink>
    </div>
  </article>
</template>
