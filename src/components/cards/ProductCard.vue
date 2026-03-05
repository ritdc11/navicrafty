<script setup>
defineProps({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  affiliateLink: { type: String, required: true },
  badge: { type: String, default: null },
  category: { type: String, default: null }
})
</script>

<template>
  <article
    class="card-base card-hover group flex flex-col h-full overflow-hidden"
    :aria-label="`Product: ${name}`"
  >
    <!-- Image -->
    <div class="relative overflow-hidden aspect-square rounded-t-2xl bg-beige-dark">
      <img
        :src="image"
        :alt="`${name} – craft supply`"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
        decoding="async"
        width="600"
        height="600"
      />
      <!-- Badge -->
      <span
        v-if="badge"
        class="absolute top-3 left-3 text-xs font-bold bg-primary text-white px-3 py-1 rounded-full shadow-soft"
        aria-label="Product badge"
      >
        {{ badge }}
      </span>
    </div>

    <!-- Content -->
    <div class="p-5 flex flex-col flex-1">
      <!-- Category -->
      <p v-if="category" class="text-xs font-medium text-primary/80 mb-1 uppercase tracking-wide">
        {{ category }}
      </p>

      <h3 class="text-sm font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
        {{ name }}
      </h3>

      <p class="text-xs text-neutral-800/60 line-clamp-3 mb-4 flex-1 leading-relaxed">
        {{ description }}
      </p>

      <div class="flex items-center justify-between mt-auto pt-3 border-t border-beige-dark">
        <!-- Price -->
        <div class="flex items-baseline gap-1">
          <span class="text-xs text-neutral-800/50">From</span>
          <span class="text-lg font-bold text-neutral-900">${{ price }}</span>
        </div>

        <!-- Affiliate CTA -->
        <a
          :href="affiliateLink"
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          :aria-label="`Buy ${name} – opens in new tab (affiliate link)`"
          class="inline-flex items-center gap-1.5 btn-primary text-xs px-4 py-2 rounded-xl"
        >
          View on Amazon
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  </article>
</template>
