<script setup>
import { computed, ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useSEO } from '@/composables/useSEO'
import { tutorials } from '@/data/tutorials'

const route = useRoute()
const tutorial = computed(() => tutorials.find((t) => t.slug === route.params.slug))
const relatedTutorials = computed(() =>
  tutorials
    .filter((t) => t.slug !== route.params.slug && t.category === tutorial.value?.category)
    .slice(0, 2)
)

// Checklist state for materials
const checkedMaterials = ref([])
function toggleMaterial(index) {
  if (checkedMaterials.value.includes(index)) {
    checkedMaterials.value = checkedMaterials.value.filter((i) => i !== index)
  } else {
    checkedMaterials.value.push(index)
  }
}

// HowTo JSON-LD for rich Google results
function howToSchema(t) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: t.title,
    description: t.description,
    image: t.image,
    totalTime: `PT${t.duration.replace(' ', '')}`,
    supply: t.materials.map((m) => ({ '@type': 'HowToSupply', name: m.item })),
    step: t.steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.body
    }))
  }
}

if (tutorial.value) {
  useSEO({
    title: tutorial.value.title,
    description: tutorial.value.excerpt,
    image: tutorial.value.image,
    url: `/tutorials/${tutorial.value.slug}`,
    jsonLd: howToSchema(tutorial.value)
  })
} else {
  useSEO({ title: 'Tutorial Not Found', description: 'This tutorial could not be found.', url: '/tutorials' })
}

const levelColour = {
  Beginner: 'bg-accent/20 text-accent-dark',
  Intermediate: 'bg-secondary/30 text-secondary-dark',
  Advanced: 'bg-primary/20 text-primary-dark'
}
</script>

<template>
  <div>

    <!-- Not Found -->
    <section v-if="!tutorial" class="section-py text-center">
      <div class="container-xl max-w-lg mx-auto">
        <span class="text-6xl mb-4 block" aria-hidden="true">🔍</span>
        <h1 class="text-2xl font-bold text-neutral-900 mb-3">Tutorial Not Found</h1>
        <p class="text-neutral-800/60 mb-6">We couldn't find that tutorial. Browse all tutorials below.</p>
        <RouterLink to="/tutorials" class="btn-primary">← All Tutorials</RouterLink>
      </div>
    </section>

    <template v-else>

      <!-- ==================
           HERO BANNER
      =================== -->
      <section
        class="bg-hero-gradient pt-10 pb-12"
        aria-labelledby="tutorial-title"
      >
        <div class="container-xl max-w-5xl mx-auto">

          <!-- Breadcrumb -->
          <nav aria-label="Breadcrumb" class="mb-6">
            <ol class="flex items-center gap-2 text-sm text-neutral-800/50" role="list">
              <li><RouterLink to="/" class="hover:text-primary transition-colors">Home</RouterLink></li>
              <li aria-hidden="true"><span class="text-neutral-800/30">/</span></li>
              <li><RouterLink to="/tutorials" class="hover:text-primary transition-colors">Tutorials</RouterLink></li>
              <li aria-hidden="true"><span class="text-neutral-800/30">/</span></li>
              <li class="text-neutral-800/70 truncate max-w-[200px]" aria-current="page">{{ tutorial.title }}</li>
            </ol>
          </nav>

          <!-- Meta row -->
          <div class="flex flex-wrap items-center gap-2 mb-4">
            <span class="text-xs font-semibold bg-white/80 text-primary px-3 py-1 rounded-full shadow-soft">
              {{ tutorial.category }}
            </span>
            <span
              :class="['text-xs font-medium px-2.5 py-1 rounded-full', levelColour[tutorial.level]]"
              :aria-label="`Difficulty: ${tutorial.level}`"
            >
              {{ tutorial.level }}
            </span>
            <span class="flex items-center gap-1 text-xs text-neutral-800/60">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ tutorial.duration }}
            </span>
          </div>

          <!-- Title -->
          <h1
            id="tutorial-title"
            class="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 leading-tight mb-4"
          >
            {{ tutorial.title }}
          </h1>

          <!-- Excerpt -->
          <p class="text-lg text-neutral-800/60 leading-relaxed max-w-2xl mb-6">
            {{ tutorial.excerpt }}
          </p>

          <!-- Tags -->
          <div class="flex flex-wrap gap-2" role="list" aria-label="Tags">
            <span
              v-for="tag in tutorial.tags"
              :key="tag"
              role="listitem"
              class="text-xs bg-white/70 text-neutral-800/60 px-2.5 py-1 rounded-full border border-beige-dark"
            >
              #{{ tag }}
            </span>
          </div>
        </div>
      </section>

      <!-- ==================
           MAIN CONTENT
      =================== -->
      <div class="section-py bg-beige">
        <div class="container-xl max-w-5xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

            <!-- ---- LEFT / MAIN COLUMN ---- -->
            <div class="lg:col-span-2 space-y-8">

              <!-- 1. VIDEO EMBED -->
              <section aria-labelledby="video-heading">
                <h2 id="video-heading" class="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <span class="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-sm" aria-hidden="true">▶</span>
                  Watch the Tutorial
                </h2>
                <div
                  class="relative w-full rounded-2xl overflow-hidden shadow-soft-lg bg-neutral-900"
                  style="aspect-ratio: 16/9"
                >
                  <iframe
                    :src="`https://www.youtube.com/embed/${tutorial.youtubeId}?rel=0&modestbranding=1`"
                    :title="`${tutorial.title} – video tutorial`"
                    class="absolute inset-0 w-full h-full"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                    loading="lazy"
                  ></iframe>
                </div>
              </section>

              <!-- 2. DESCRIPTION -->
              <section aria-labelledby="overview-heading">
                <h2 id="overview-heading" class="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <span class="w-8 h-8 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary-dark text-sm" aria-hidden="true">📖</span>
                  Overview
                </h2>
                <div class="card-base p-6">
                  <p class="text-neutral-800/70 leading-relaxed whitespace-pre-line">
                    {{ tutorial.description }}
                  </p>
                </div>
              </section>

              <!-- 3. STEP-BY-STEP INSTRUCTIONS -->
              <section aria-labelledby="steps-heading">
                <h2 id="steps-heading" class="text-xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <span class="w-8 h-8 rounded-xl bg-accent/20 flex items-center justify-center text-accent-dark text-sm" aria-hidden="true">📋</span>
                  Step-by-Step Instructions
                </h2>
                <ol class="space-y-4" aria-label="Tutorial steps">
                  <li
                    v-for="(step, index) in tutorial.steps"
                    :key="index"
                    class="card-base p-5 flex gap-4"
                  >
                    <!-- Step number -->
                    <div
                      class="flex-shrink-0 w-9 h-9 rounded-xl bg-primary text-white font-bold text-sm flex items-center justify-center shadow-soft"
                      :aria-label="`Step ${index + 1}`"
                    >
                      {{ index + 1 }}
                    </div>
                    <!-- Step content -->
                    <div>
                      <h3 class="text-sm font-semibold text-neutral-900 mb-1.5">
                        {{ step.title }}
                      </h3>
                      <p class="text-sm text-neutral-800/65 leading-relaxed">
                        {{ step.body }}
                      </p>
                    </div>
                  </li>
                </ol>
              </section>

            </div>

            <!-- ---- RIGHT / SIDEBAR COLUMN ---- -->
            <aside class="space-y-6 lg:sticky lg:top-28" aria-label="Tutorial sidebar">

              <!-- Quick Stats Card -->
              <div class="card-base p-5">
                <h2 class="text-sm font-bold text-neutral-900 mb-4">At a Glance</h2>
                <dl class="space-y-3">
                  <div class="flex items-center justify-between">
                    <dt class="text-xs text-neutral-800/50 font-medium">Category</dt>
                    <dd class="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">{{ tutorial.category }}</dd>
                  </div>
                  <div class="flex items-center justify-between">
                    <dt class="text-xs text-neutral-800/50 font-medium">Difficulty</dt>
                    <dd :class="['text-xs font-semibold px-2.5 py-1 rounded-full', levelColour[tutorial.level]]">{{ tutorial.level }}</dd>
                  </div>
                  <div class="flex items-center justify-between">
                    <dt class="text-xs text-neutral-800/50 font-medium">Duration</dt>
                    <dd class="text-xs font-semibold text-neutral-900">{{ tutorial.duration }}</dd>
                  </div>
                  <div class="flex items-center justify-between">
                    <dt class="text-xs text-neutral-800/50 font-medium">Steps</dt>
                    <dd class="text-xs font-semibold text-neutral-900">{{ tutorial.steps.length }} steps</dd>
                  </div>
                  <div class="flex items-center justify-between">
                    <dt class="text-xs text-neutral-800/50 font-medium">Materials</dt>
                    <dd class="text-xs font-semibold text-neutral-900">{{ tutorial.materials.length }} items</dd>
                  </div>
                </dl>
              </div>

              <!-- Materials Checklist -->
              <div class="card-base p-5">
                <h2 class="text-sm font-bold text-neutral-900 mb-1">
                  🛒 Materials Needed
                </h2>
                <p class="text-xs text-neutral-800/45 mb-4">
                  Tick items as you gather them.
                </p>
                <ul class="space-y-2.5" role="list" aria-label="Materials checklist">
                  <li
                    v-for="(mat, index) in tutorial.materials"
                    :key="index"
                    class="flex items-start gap-3 group cursor-pointer"
                    @click="toggleMaterial(index)"
                  >
                    <!-- Checkbox -->
                    <div
                      :class="[
                        'flex-shrink-0 mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200',
                        checkedMaterials.includes(index)
                          ? 'bg-primary border-primary'
                          : 'border-neutral-800/25 group-hover:border-primary'
                      ]"
                      role="checkbox"
                      :aria-checked="checkedMaterials.includes(index)"
                      :aria-label="mat.item"
                    >
                      <svg
                        v-if="checkedMaterials.includes(index)"
                        class="w-2.5 h-2.5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <!-- Text -->
                    <div :class="checkedMaterials.includes(index) ? 'opacity-40' : ''">
                      <p class="text-xs font-medium text-neutral-900 leading-snug">{{ mat.item }}</p>
                      <p v-if="mat.note" class="text-xs text-neutral-800/45 mt-0.5">{{ mat.note }}</p>
                    </div>
                  </li>
                </ul>
                <p class="text-xs text-neutral-800/35 mt-4 text-right">
                  {{ checkedMaterials.length }}/{{ tutorial.materials.length }} gathered
                </p>
              </div>

              <!-- Pro Tips -->
              <div class="card-base p-5 border-l-4 border-accent">
                <h2 class="text-sm font-bold text-neutral-900 mb-3 flex items-center gap-2">
                  <span aria-hidden="true">💡</span> Pro Tips
                </h2>
                <ul class="space-y-2.5" role="list">
                  <li
                    v-for="(tip, index) in tutorial.tips"
                    :key="index"
                    class="flex items-start gap-2 text-xs text-neutral-800/65 leading-relaxed"
                  >
                    <span class="flex-shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full bg-accent-dark mt-1.5" aria-hidden="true"></span>
                    {{ tip }}
                  </li>
                </ul>
              </div>

              <!-- Share -->
              <div class="card-base p-5">
                <h2 class="text-sm font-bold text-neutral-900 mb-3">📤 Share this Tutorial</h2>
                <div class="flex flex-col gap-2">
                  <a
                    :href="`https://pinterest.com/pin/create/button/?url=${encodeURIComponent('https://navicrafty.com/tutorials/' + tutorial.slug)}&media=${encodeURIComponent(tutorial.image)}&description=${encodeURIComponent(tutorial.title)}`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center justify-center gap-2 text-xs font-semibold text-white bg-[#E60023] hover:bg-[#c4001d] rounded-xl py-2.5 px-4 transition-colors"
                    aria-label="Save this tutorial to Pinterest"
                  >
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
                    Save to Pinterest
                  </a>
                  <a
                    :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out this tutorial: ' + tutorial.title)}&url=${encodeURIComponent('https://navicrafty.com/tutorials/' + tutorial.slug)}&via=navicrafty`"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center justify-center gap-2 text-xs font-semibold text-white bg-neutral-900 hover:bg-neutral-700 rounded-xl py-2.5 px-4 transition-colors"
                    aria-label="Share this tutorial on Twitter/X"
                  >
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    Share on X
                  </a>
                </div>
              </div>

              <!-- CTA to Materials -->
              <div class="bg-gradient-to-br from-primary to-secondary rounded-2xl p-5 text-white text-center">
                <p class="text-sm font-bold mb-1">Need supplies?</p>
                <p class="text-xs text-white/80 mb-4 leading-relaxed">
                  Shop our curated picks for {{ tutorial.category }} projects.
                </p>
                <RouterLink
                  to="/materials"
                  class="inline-block text-xs font-semibold bg-white text-primary rounded-xl px-4 py-2.5 hover:bg-beige transition-colors"
                  aria-label="Shop recommended craft materials"
                >
                  Shop Materials →
                </RouterLink>
              </div>

            </aside>
          </div>
        </div>
      </div>

      <!-- ==================
           RELATED TUTORIALS
      =================== -->
      <section
        v-if="relatedTutorials.length"
        class="section-py bg-white"
        aria-labelledby="related-heading"
      >
        <div class="container-xl max-w-5xl mx-auto">
          <h2 id="related-heading" class="text-2xl font-bold text-neutral-900 mb-6">
            More {{ tutorial.category }} Tutorials
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <article
              v-for="rel in relatedTutorials"
              :key="rel.slug"
              class="card-base card-hover group overflow-hidden flex flex-col"
            >
              <div class="overflow-hidden rounded-t-2xl aspect-video">
                <img
                  :src="rel.image"
                  :alt="rel.title"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  width="600" height="338"
                />
              </div>
              <div class="p-5 flex flex-col flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <span :class="['text-xs font-medium px-2 py-0.5 rounded-full', levelColour[rel.level]]">{{ rel.level }}</span>
                  <span class="text-xs text-neutral-800/50">{{ rel.duration }}</span>
                </div>
                <h3 class="text-sm font-semibold text-neutral-900 mb-2 group-hover:text-primary transition-colors">
                  {{ rel.title }}
                </h3>
                <RouterLink
                  :to="`/tutorials/${rel.slug}`"
                  class="text-sm font-semibold text-primary hover:text-primary-dark transition-colors mt-auto"
                  :aria-label="`View tutorial: ${rel.title}`"
                >
                  View Tutorial →
                </RouterLink>
              </div>
            </article>
          </div>
          <div class="mt-8 text-center">
            <RouterLink to="/tutorials" class="btn-secondary" aria-label="Browse all tutorials">
              Browse All Tutorials
            </RouterLink>
          </div>
        </div>
      </section>

    </template>
  </div>
</template>
