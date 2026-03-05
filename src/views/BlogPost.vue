<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useSEO, blogPostingSchema } from '@/composables/useSEO'
import { blogPosts } from '@/data/blog'

const route = useRoute()
const post = computed(() => blogPosts.find((p) => p.slug === route.params.slug))
const otherPosts = computed(() => blogPosts.filter((p) => p.slug !== route.params.slug).slice(0, 2))

// Dynamic SEO – runs as a computed call during setup
if (post.value) {
  useSEO({
    title: post.value.title,
    description: post.value.excerpt,
    image: post.value.image,
    url: `/blog/${post.value.slug}`,
    type: 'article',
    jsonLd: blogPostingSchema(post.value)
  })
} else {
  useSEO({
    title: 'Post Not Found',
    description: 'This blog post could not be found.',
    url: '/blog'
  })
}

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

    <!-- Not Found -->
    <section v-if="!post" class="section-py text-center" aria-labelledby="notfound-heading">
      <div class="container-xl max-w-lg mx-auto">
        <span class="text-6xl mb-4 block" aria-hidden="true">📄</span>
        <h1 id="notfound-heading" class="text-2xl font-bold text-neutral-900 mb-3">Post Not Found</h1>
        <p class="text-neutral-800/60 mb-6">We couldn't find that blog post. It may have been moved or deleted.</p>
        <RouterLink to="/blog" class="btn-primary">← Back to Blog</RouterLink>
      </div>
    </section>

    <!-- Article -->
    <template v-else>
      <!-- Hero Image -->
      <div class="w-full aspect-video max-h-[480px] overflow-hidden">
        <img
          :src="post.image"
          :alt="post.title"
          class="w-full h-full object-cover"
          loading="eager"
          width="1200"
          height="480"
        />
      </div>

      <!-- Article Content -->
      <article class="section-py" aria-labelledby="post-heading">
        <div class="container-xl max-w-3xl mx-auto">

          <!-- Back Link -->
          <RouterLink
            to="/blog"
            class="inline-flex items-center gap-2 text-sm text-primary font-medium mb-8 hover:text-primary-dark transition-colors"
            aria-label="Back to blog listing"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </RouterLink>

          <!-- Date -->
          <time
            :datetime="post.date"
            class="text-xs text-neutral-800/50 font-medium uppercase tracking-wide block mb-4"
          >
            {{ formatDate(post.date) }}
          </time>

          <!-- Title -->
          <h1
            id="post-heading"
            class="text-3xl md:text-4xl font-bold text-neutral-900 leading-tight mb-8"
          >
            {{ post.title }}
          </h1>

          <!-- Divider -->
          <div class="h-px bg-beige-dark mb-8" aria-hidden="true"></div>

          <!-- Body -->
          <div
            class="prose prose-base max-w-none text-neutral-800/80 leading-relaxed
              prose-headings:text-neutral-900 prose-headings:font-semibold
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-p:mb-5 prose-p:leading-relaxed
              prose-strong:text-neutral-900 prose-strong:font-semibold
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
            v-html="post.content"
          ></div>

          <!-- Tags / Share -->
          <div class="mt-12 pt-8 border-t border-beige-dark flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p class="text-sm text-neutral-800/50">
              Published on <time :datetime="post.date">{{ formatDate(post.date) }}</time> by NaviCrafty
            </p>
            <div class="flex gap-3">
              <a
                :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent('https://navicrafty.com/blog/' + post.slug)}`"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-secondary text-xs px-4 py-2 rounded-xl"
                aria-label="Share this post on Twitter"
              >
                Share on Twitter
              </a>
              <a
                :href="`https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent('https://navicrafty.com/blog/' + post.slug)}&media=${encodeURIComponent(post.image)}&description=${encodeURIComponent(post.title)}`"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-secondary text-xs px-4 py-2 rounded-xl"
                aria-label="Save this post to Pinterest"
              >
                Pin it
              </a>
            </div>
          </div>
        </div>
      </article>

      <!-- Related Posts -->
      <section
        v-if="otherPosts.length"
        class="section-py bg-beige"
        aria-labelledby="related-heading"
      >
        <div class="container-xl max-w-3xl mx-auto">
          <h2 id="related-heading" class="text-2xl font-bold text-neutral-900 mb-8">
            More from the Blog
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <article
              v-for="related in otherPosts"
              :key="related.slug"
              class="card-base card-hover group overflow-hidden flex flex-col"
            >
              <div class="overflow-hidden rounded-t-2xl aspect-video">
                <img
                  :src="related.image"
                  :alt="related.title"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  width="600" height="338"
                />
              </div>
              <div class="p-5 flex flex-col flex-1">
                <h3 class="text-sm font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {{ related.title }}
                </h3>
                <p class="text-xs text-neutral-800/60 line-clamp-2 mb-4 flex-1">{{ related.excerpt }}</p>
                <RouterLink
                  :to="`/blog/${related.slug}`"
                  class="text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                  :aria-label="`Read: ${related.title}`"
                >
                  Read →
                </RouterLink>
              </div>
            </article>
          </div>
        </div>
      </section>
    </template>

  </div>
</template>
