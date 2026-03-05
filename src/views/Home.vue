<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useSEO, websiteSchema, organizationSchema } from '@/composables/useSEO'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import Button from '@/components/ui/Button.vue'
import TutorialCard from '@/components/cards/TutorialCard.vue'
import ProductCard from '@/components/cards/ProductCard.vue'
import { tutorials } from '@/data/tutorials'
import { products } from '@/data/products'

useSEO({
  title: null,
  description: 'NaviCrafty is your modern craft learning hub. Discover step-by-step tutorials, recommended materials, and inspiration to craft with confidence.',
  url: '/',
  jsonLd: [websiteSchema(), organizationSchema()]
})

const featuredTutorials = computed(() => tutorials.slice(0, 3))
const featuredProducts = computed(() => products.slice(0, 4))

const features = [
  {
    icon: '🎨',
    title: 'Beginner Friendly',
    description: 'Every tutorial is written with complete beginners in mind—clear steps, no jargon, just creativity.'
  },
  {
    icon: '📦',
    title: 'Curated Materials',
    description: 'We test and recommend the best craft supplies so you spend less time searching and more time making.'
  },
  {
    icon: '✂️',
    title: 'All Craft Styles',
    description: "From watercolour painting to macramé and clay jewellery—there's a craft here for everyone."
  },
  {
    icon: '🌟',
    title: 'Community-Driven',
    description: 'Built by crafters, for crafters. Share your makes and get inspired by a warm, welcoming community.'
  },
  {
    icon: '📱',
    title: 'Learn Anywhere',
    description: 'Our tutorials are fully optimised for mobile so you can craft while the instructions sit right beside you.'
  },
  {
    icon: '💡',
    title: 'Fresh Ideas Weekly',
    description: 'New projects, tips, and seasonal inspiration delivered every week to keep your creative spark alive.'
  }
]
</script>

<template>
  <div>
    <!-- ============================
         HERO SECTION
    ============================= -->
    <section
      class="bg-hero-gradient pt-10 pb-20 md:pt-16 md:pb-28 overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div class="container-xl">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <!-- Hero Text -->
          <div class="max-w-xl">
            <p class="inline-block text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-5">
              ✨ Welcome to NaviCrafty
            </p>
            <h1
              id="hero-heading"
              class="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight mb-6"
            >
              Learn.
              <span class="text-gradient block">Create.</span>
              Craft with Confidence.
            </h1>
            <p class="text-lg text-neutral-800/60 leading-relaxed mb-8">
              Step-by-step craft tutorials, curated material recommendations, and a supportive community—all in one beautiful place.
            </p>
            <div class="flex flex-wrap gap-4">
              <RouterLink to="/tutorials" class="btn-primary" aria-label="Browse all craft tutorials">
                Browse Tutorials
              </RouterLink>
              <RouterLink to="/materials" class="btn-secondary" aria-label="Shop recommended craft materials">
                Shop Materials
              </RouterLink>
            </div>
            <!-- Social proof -->
            <div class="flex items-center gap-6 mt-10">
              <div class="text-center">
                <p class="text-2xl font-bold text-neutral-900">50+</p>
                <p class="text-xs text-neutral-800/50">Tutorials</p>
              </div>
              <div class="w-px h-10 bg-neutral-800/10"></div>
              <div class="text-center">
                <p class="text-2xl font-bold text-neutral-900">10k+</p>
                <p class="text-xs text-neutral-800/50">Crafters</p>
              </div>
              <div class="w-px h-10 bg-neutral-800/10"></div>
              <div class="text-center">
                <p class="text-2xl font-bold text-neutral-900">4.9★</p>
                <p class="text-xs text-neutral-800/50">Rating</p>
              </div>
            </div>
          </div>

          <!-- Hero Visual -->
          <div class="relative hidden lg:flex justify-center items-center">
            <div class="relative grid grid-cols-2 gap-4 w-full max-w-md">
              <div class="rounded-3xl overflow-hidden shadow-soft-lg aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&q=80"
                  alt="Craft project example – hand-stitched felt"
                  class="w-full h-full object-cover"
                  width="500" height="500"
                  loading="eager"
                />
              </div>
              <div class="rounded-3xl overflow-hidden shadow-soft-lg aspect-square mt-8">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80"
                  alt="Craft project example – macramé"
                  class="w-full h-full object-cover"
                  width="500" height="500"
                  loading="eager"
                />
              </div>
              <div class="rounded-3xl overflow-hidden shadow-soft-lg aspect-square -mt-4">
                <img
                  src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&q=80"
                  alt="Craft project example – watercolour painting"
                  class="w-full h-full object-cover"
                  width="500" height="500"
                  loading="eager"
                />
              </div>
              <div class="rounded-3xl overflow-hidden shadow-soft-lg aspect-square mt-4">
                <img
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80"
                  alt="Craft project example – polymer clay"
                  class="w-full h-full object-cover"
                  width="500" height="500"
                  loading="eager"
                />
              </div>
            </div>
            <!-- Floating badge -->
            <div class="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-soft-lg px-4 py-3">
              <p class="text-xs font-medium text-neutral-800/60 mb-0.5">Latest Tutorial</p>
              <p class="text-sm font-semibold text-neutral-900">Macramé Wall Hanging 🪢</p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- ============================
         FEATURED TUTORIALS
    ============================= -->
    <section class="section-py bg-white" aria-labelledby="tutorials-heading">
      <div class="container-xl">
        <SectionTitle
          id="tutorials-heading"
          eyebrow="Learn New Skills"
          title="Featured Tutorials"
          subtitle="Handpicked beginner-friendly projects to get your creative journey started."
        />
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <TutorialCard
            v-for="tutorial in featuredTutorials"
            :key="tutorial.id"
            v-bind="tutorial"
          />
        </div>
        <div class="text-center mt-10">
          <RouterLink to="/tutorials" class="btn-secondary" aria-label="View all craft tutorials">
            View All Tutorials →
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ============================
         RECOMMENDED PRODUCTS
    ============================= -->
    <section class="section-py bg-beige" aria-labelledby="products-heading">
      <div class="container-xl">
        <SectionTitle
          id="products-heading"
          eyebrow="Craft Supplies"
          title="Recommended Materials"
          subtitle="Our tested and trusted picks to help you create beautiful things from day one."
        />
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            v-bind="product"
          />
        </div>
        <div class="text-center mt-10">
          <RouterLink to="/materials" class="btn-secondary" aria-label="View all recommended craft materials">
            View All Materials →
          </RouterLink>
        </div>
        <p class="text-center text-xs text-neutral-800/40 mt-4">
          * Affiliate links. We may earn a small commission at no extra cost to you.
        </p>
      </div>
    </section>

    <!-- ============================
         FEATURES GRID
    ============================= -->
    <section class="section-py bg-white" aria-labelledby="features-heading">
      <div class="container-xl">
        <SectionTitle
          id="features-heading"
          eyebrow="Why NaviCrafty"
          title="Everything You Need to Create"
          subtitle="We've thought of everything so you can focus on the fun part—making things."
        />
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="card-base p-6 hover:shadow-soft-hover transition-all duration-300"
          >
            <span class="text-3xl mb-4 block" aria-hidden="true">{{ feature.icon }}</span>
            <h3 class="text-base font-semibold text-neutral-900 mb-2">{{ feature.title }}</h3>
            <p class="text-sm text-neutral-800/60 leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================
         ABOUT SUMMARY
    ============================= -->
    <section class="section-py bg-beige" aria-labelledby="about-heading">
      <div class="container-xl">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div class="rounded-3xl overflow-hidden shadow-soft-lg aspect-video">
            <img
              src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80"
              alt="Person painting watercolour botanicals at a craft desk"
              class="w-full h-full object-cover"
              loading="lazy"
              width="800" height="450"
            />
          </div>
          <div>
            <SectionTitle
              id="about-heading"
              eyebrow="Our Story"
              title="Crafting Made Accessible for Everyone"
              align="left"
              level="h2"
            />
            <p class="text-neutral-800/60 leading-relaxed mb-6">
              NaviCrafty was born from a simple belief: creativity shouldn't be intimidating. We create clear, joyful tutorials that meet you exactly where you are—beginner, hobbyist, or skilled maker.
            </p>
            <p class="text-neutral-800/60 leading-relaxed mb-8">
              From our studio to your crafting space, every project we share is designed to build real skills with real results. We want you to finish every session feeling proud of what you made.
            </p>
            <RouterLink to="/about" class="btn-primary" aria-label="Learn more about NaviCrafty">
              Learn More About Us
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================
         CTA SECTION
    ============================= -->
    <section class="section-py" aria-labelledby="cta-heading">
      <div class="container-xl">
        <div class="bg-gradient-to-br from-primary via-primary-dark to-secondary rounded-4xl p-10 md:p-16 text-center text-white">
          <p class="text-sm font-semibold uppercase tracking-widest text-white/70 mb-3">Get Started Today</p>
          <h2
            id="cta-heading"
            class="text-3xl md:text-4xl font-bold mb-4"
          >
            Ready to Start Crafting?
          </h2>
          <p class="text-lg text-white/80 max-w-xl mx-auto mb-8">
            Explore over 50 free tutorials across 10 craft categories. Your next favourite project is waiting.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <RouterLink
              to="/tutorials"
              class="bg-white text-primary font-semibold rounded-2xl px-8 py-4 hover:bg-beige transition-colors duration-200 shadow-soft"
              aria-label="Start exploring tutorials"
            >
              Explore Tutorials
            </RouterLink>
            <RouterLink
              to="/blog"
              class="bg-white/20 text-white font-semibold rounded-2xl px-8 py-4 hover:bg-white/30 transition-colors duration-200 border border-white/30"
              aria-label="Read the NaviCrafty blog"
            >
              Read the Blog
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
