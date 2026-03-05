<script setup>
import { RouterLink } from 'vue-router'
import { useSEO } from '@/composables/useSEO'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import { blogPosts } from '@/data/blog'

useSEO({
  title: 'Craft Blog',
  description: 'Read the latest craft tips, project ideas, and creative inspiration on the NaviCrafty blog.',
  url: '/blog'
})

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <div>
    <!-- Page Header -->
    <section class="bg-hero-gradient pt-12 pb-16" aria-labelledby="blog-heading">
      <div class="container-xl text-center">
        <SectionTitle
          id="blog-heading"
          eyebrow="Tips & Inspiration"
          title="The NaviCrafty Blog"
          subtitle="Project ideas, material guides, trend pieces, and crafting wisdom—all in one place."
          level="h1"
        />
      </div>
    </section>

    <!-- Blog Post List -->
    <section class="section-py bg-beige" aria-label="Blog post listing">
      <div class="container-xl">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="post in blogPosts"
            :key="post.slug"
            class="card-base card-hover group overflow-hidden flex flex-col"
          >
            <!-- Thumbnail -->
            <div class="overflow-hidden rounded-t-2xl aspect-video">
              <img
                :src="post.image"
                :alt="`Blog post image for: ${post.title}`"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
                width="600" height="338"
              />
            </div>

            <div class="p-6 flex flex-col flex-1">
              <!-- Date -->
              <time
                :datetime="post.date"
                class="text-xs text-neutral-800/50 mb-3 block"
              >
                {{ formatDate(post.date) }}
              </time>

              <h2 class="text-base font-semibold text-neutral-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                {{ post.title }}
              </h2>

              <p class="text-sm text-neutral-800/60 line-clamp-3 mb-5 flex-1 leading-relaxed">
                {{ post.excerpt }}
              </p>

              <RouterLink
                :to="`/blog/${post.slug}`"
                class="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark transition-colors mt-auto"
                :aria-label="`Read more: ${post.title}`"
              >
                Read Article
                <svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </RouterLink>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
