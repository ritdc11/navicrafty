<script setup>
import { RouterLink } from 'vue-router'
import { useSEO, organizationSchema } from '@/composables/useSEO'
import SectionTitle from '@/components/ui/SectionTitle.vue'

useSEO({
  title: 'About NaviCrafty',
  description: "Learn more about NaviCrafty's mission to make crafting accessible, joyful, and confidence-building for everyone.",
  url: '/about',
  jsonLd: organizationSchema()
})

const values = [
  {
    icon: '🌱',
    title: 'Grow at Your Pace',
    description: 'We believe every crafter starts somewhere. Our tutorials are designed to build skills gradually without overwhelm.'
  },
  {
    icon: '🤝',
    title: 'Community First',
    description: 'NaviCrafty is a space for encouragement, sharing, and celebrating every imperfect, beautiful make.'
  },
  {
    icon: '✅',
    title: 'Honest Recommendations',
    description: 'We only recommend products we genuinely love and use. Your trust matters more than any commission.'
  },
  {
    icon: '🌍',
    title: 'Sustainability Matters',
    description: 'We champion sustainable materials and mindful crafting—create more, waste less.'
  }
]
</script>

<template>
  <div>
    <!-- Header -->
    <section class="bg-hero-gradient pt-12 pb-16" aria-labelledby="about-page-heading">
      <div class="container-xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <p class="inline-block text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-5">
            Our Story
          </p>
          <h1
            id="about-page-heading"
            class="text-4xl md:text-5xl font-bold text-neutral-900 leading-tight mb-6"
          >
            Crafting Made <span class="text-gradient">Accessible</span> for Everyone
          </h1>
          <p class="text-lg text-neutral-800/60 leading-relaxed mb-6">
            NaviCrafty was founded on a simple belief: creative confidence is something every person can develop with the right guidance.
          </p>
          <p class="text-base text-neutral-800/60 leading-relaxed">
            We combine clear, step-by-step tutorials with honest material recommendations to give you everything you need—and nothing you don't.
          </p>
        </div>
        <div class="rounded-3xl overflow-hidden shadow-soft-lg aspect-square max-w-sm mx-auto lg:mx-0 lg:ml-auto">
          <img
            src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&q=80"
            alt="NaviCrafty workspace – brushes, paints, and handmade items on a wooden desk"
            class="w-full h-full object-cover"
            loading="eager"
            width="600" height="600"
          />
        </div>
      </div>
    </section>

    <!-- Mission -->
    <section class="section-py bg-white" aria-labelledby="mission-heading">
      <div class="container-xl max-w-3xl mx-auto text-center">
        <SectionTitle
          id="mission-heading"
          eyebrow="Our Mission"
          title="Why We Created NaviCrafty"
          subtitle="We noticed that most craft platforms were either too complex for beginners or too shallow for those wanting to really learn. NaviCrafty fills that gap."
        />
        <blockquote class="text-xl md:text-2xl text-neutral-900/80 font-medium italic mt-8 leading-relaxed border-l-4 border-primary pl-6 text-left">
          "Every project you finish—however imperfect—is a reminder that you create things. That's worth celebrating."
          <footer class="text-sm font-semibold text-primary mt-3 not-italic">— NaviCrafty Team</footer>
        </blockquote>
      </div>
    </section>

    <!-- Values -->
    <section class="section-py bg-beige" aria-labelledby="values-heading">
      <div class="container-xl">
        <SectionTitle
          id="values-heading"
          eyebrow="What We Stand For"
          title="Our Values"
        />
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div
            v-for="value in values"
            :key="value.title"
            class="card-base p-6 hover:shadow-soft-hover transition-all duration-300"
          >
            <span class="text-3xl mb-4 block" aria-hidden="true">{{ value.icon }}</span>
            <h3 class="text-base font-semibold text-neutral-900 mb-2">{{ value.title }}</h3>
            <p class="text-sm text-neutral-800/60 leading-relaxed">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Affiliate Disclosure -->
    <section id="affiliate" class="section-py bg-white" aria-labelledby="affiliate-heading">
      <div class="container-xl max-w-3xl mx-auto">
        <SectionTitle
          id="affiliate-heading"
          eyebrow="Transparency"
          title="Affiliate Disclosure"
          align="left"
        />
        <div class="prose prose-base text-neutral-800/70 leading-relaxed">
          <p>NaviCrafty is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com.</p>
          <p class="mt-4">When you click an affiliate link and make a purchase, we receive a small commission at no additional cost to you. These commissions help keep NaviCrafty free and allow us to continue creating quality tutorials and content.</p>
          <p class="mt-4">We only recommend products that we genuinely believe in. Our editorial integrity is not influenced by affiliate relationships.</p>
        </div>
      </div>
    </section>

    <!-- Privacy Section -->
    <section id="privacy" class="section-py bg-beige" aria-labelledby="privacy-heading">
      <div class="container-xl max-w-3xl mx-auto">
        <SectionTitle
          id="privacy-heading"
          eyebrow="Your Data"
          title="Privacy Policy"
          align="left"
        />
        <div class="prose prose-base text-neutral-800/70 leading-relaxed space-y-4">
          <p>NaviCrafty takes your privacy seriously. We do not sell your personal data to third parties.</p>
          <p>We may collect anonymous analytics data (page views, device type) to improve the site. No personally identifiable information is stored or shared.</p>
          <p>If you contact us via email, your information will only be used to respond to your enquiry.</p>
          <p>For any privacy concerns, please contact us at <a href="mailto:hello@navicrafty.com" class="text-primary hover:text-primary-dark">hello@navicrafty.com</a>.</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section-py bg-white" aria-labelledby="about-cta-heading">
      <div class="container-xl max-w-xl mx-auto text-center">
        <h2 id="about-cta-heading" class="text-3xl font-bold text-neutral-900 mb-4">Ready to Start Creating?</h2>
        <p class="text-neutral-800/60 mb-8">Browse our tutorials and find a project that sparks your creativity today.</p>
        <RouterLink to="/tutorials" class="btn-primary" aria-label="Browse NaviCrafty tutorials">
          Explore Tutorials
        </RouterLink>
      </div>
    </section>
  </div>
</template>
