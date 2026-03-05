<script setup>
import { ref, computed } from 'vue'
import { useSEO } from '@/composables/useSEO'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import TutorialCard from '@/components/cards/TutorialCard.vue'
import { tutorials } from '@/data/tutorials'

useSEO({
  title: 'Craft Tutorials',
  description: 'Browse our full library of step-by-step craft tutorials. From embroidery to macramé, watercolour to polymer clay—find your next creative project.',
  url: '/tutorials'
})

const categories = ['All', ...new Set(tutorials.map((t) => t.category))]
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced']

const activeCategory = ref('All')
const activeLevel = ref('All')

const filteredTutorials = computed(() => {
  return tutorials.filter((t) => {
    const matchCat = activeCategory.value === 'All' || t.category === activeCategory.value
    const matchLevel = activeLevel.value === 'All' || t.level === activeLevel.value
    return matchCat && matchLevel
  })
})
</script>

<template>
  <div>
    <!-- Page Header -->
    <section class="bg-hero-gradient pt-12 pb-16" aria-labelledby="tutorials-page-heading">
      <div class="container-xl text-center">
        <SectionTitle
          id="tutorials-page-heading"
          eyebrow="Step-by-Step Projects"
          title="Craft Tutorials"
          subtitle="Find your next project from our growing library of beginner-to-intermediate tutorials."
          level="h1"
        />
      </div>
    </section>

    <!-- Filters -->
    <section class="sticky top-16 md:top-20 z-10 bg-white/95 backdrop-blur-sm border-b border-beige-dark" aria-label="Filter tutorials">
      <div class="container-xl py-3">
        <div class="flex flex-wrap items-center gap-3">
          <!-- Category Filter -->
          <div class="flex flex-wrap gap-2">
            <button
              v-for="cat in categories"
              :key="cat"
              :class="[
                'px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200',
                activeCategory === cat
                  ? 'bg-primary text-white shadow-soft'
                  : 'bg-beige text-neutral-800/70 hover:bg-beige-dark'
              ]"
              :aria-pressed="activeCategory === cat"
              @click="activeCategory = cat"
            >
              {{ cat }}
            </button>
          </div>
          <div class="w-px h-6 bg-neutral-800/10 hidden sm:block" aria-hidden="true"></div>
          <!-- Level Filter -->
          <div class="flex gap-2">
            <button
              v-for="level in levels"
              :key="level"
              :class="[
                'px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200',
                activeLevel === level
                  ? 'bg-secondary text-white shadow-soft'
                  : 'bg-beige text-neutral-800/70 hover:bg-beige-dark'
              ]"
              :aria-pressed="activeLevel === level"
              @click="activeLevel = level"
            >
              {{ level }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Tutorial Grid -->
    <section class="section-py bg-beige" aria-label="Tutorial listing">
      <div class="container-xl">
        <p class="text-sm text-neutral-800/50 mb-6" aria-live="polite">
          Showing {{ filteredTutorials.length }} tutorial{{ filteredTutorials.length !== 1 ? 's' : '' }}
        </p>

        <div
          v-if="filteredTutorials.length > 0"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <TutorialCard
            v-for="tutorial in filteredTutorials"
            :key="tutorial.id"
            v-bind="tutorial"
          />
        </div>

        <!-- Empty state -->
        <div v-else class="text-center py-20">
          <span class="text-5xl mb-4 block" aria-hidden="true">🔍</span>
          <h2 class="text-xl font-semibold text-neutral-900 mb-2">No tutorials found</h2>
          <p class="text-neutral-800/50">Try adjusting your filters to see more results.</p>
          <button
            class="btn-primary mt-6"
            @click="activeCategory = 'All'; activeLevel = 'All'"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
