<script setup>
import { ref, computed } from 'vue'
import { useSEO, productSchema } from '@/composables/useSEO'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import ProductCard from '@/components/cards/ProductCard.vue'
import { products } from '@/data/products'

useSEO({
  title: 'Craft Materials & Supplies',
  description: 'Shop our curated selection of craft materials and supplies. Every product is tested and recommended by NaviCrafty.',
  url: '/materials',
  jsonLd: products.map(productSchema)
})

const categories = ['All', ...new Set(products.map((p) => p.category))]
const activeCategory = ref('All')

const filteredProducts = computed(() => {
  if (activeCategory.value === 'All') return products
  return products.filter((p) => p.category === activeCategory.value)
})
</script>

<template>
  <div>
    <!-- Page Header -->
    <section class="bg-hero-gradient pt-12 pb-16" aria-labelledby="materials-heading">
      <div class="container-xl text-center">
        <SectionTitle
          id="materials-heading"
          eyebrow="Curated Picks"
          title="Craft Materials & Supplies"
          subtitle="Every product here has been carefully selected for quality, value, and beginner-friendliness."
          level="h1"
        />
        <p class="text-xs text-neutral-800/40 -mt-6">
          This page contains affiliate links. We may earn a small commission at no extra cost to you.
        </p>
      </div>
    </section>

    <!-- Category Filter -->
    <section class="sticky top-16 md:top-20 z-10 bg-white/95 backdrop-blur-sm border-b border-beige-dark" aria-label="Filter by category">
      <div class="container-xl py-3">
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
      </div>
    </section>

    <!-- Product Grid -->
    <section class="section-py bg-beige" aria-label="Product listing">
      <div class="container-xl">
        <p class="text-sm text-neutral-800/50 mb-6" aria-live="polite">
          Showing {{ filteredProducts.length }} product{{ filteredProducts.length !== 1 ? 's' : '' }}
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            v-bind="product"
          />
        </div>

        <!-- Disclosure -->
        <div class="mt-12 p-6 bg-white rounded-2xl shadow-soft text-sm text-neutral-800/60 leading-relaxed">
          <p class="font-semibold text-neutral-900 mb-1">Affiliate Disclosure</p>
          <p>NaviCrafty participates in affiliate advertising programs designed to provide a means for us to earn fees by linking to Amazon and other affiliated sites. As an Amazon Associate we earn from qualifying purchases. This does not affect the price you pay and helps support the free content we create.</p>
        </div>
      </div>
    </section>
  </div>
</template>
