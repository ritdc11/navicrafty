<script setup>
import { RouterLink } from 'vue-router'

const currentYear = new Date().getFullYear()

const footerLinks = {
  Learn: [
    { name: 'Tutorials', to: '/tutorials' },
    { name: 'Blog', to: '/blog' },
    { name: 'About', to: '/about' }
  ],
  Shop: [
    { name: 'Materials', to: '/materials' },
  ],
  Legal: [
    { name: 'Affiliate Disclosure', to: '/about#affiliate' },
    { name: 'Privacy Policy', to: '/about#privacy' }
  ]
}

const socialLinks = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/navicrafty',
    icon: `<svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" /></svg>`
  },
  {
    name: 'Pinterest',
    href: 'https://www.pinterest.com/navicrafty',
    icon: `<svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>`
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/navicrafty',
    icon: `<svg fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 01-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 01-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 011.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418zM15.194 12l-5.197 3V9l5.197 3z" clip-rule="evenodd" /></svg>`
  }
]
</script>

<template>
  <footer class="bg-neutral-900 text-white" role="contentinfo">
    <div class="container-xl pt-16 pb-8">

      <!-- Top section -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-10 border-b border-white/10">

        <!-- Brand column -->
        <div class="lg:col-span-2">
          <RouterLink to="/" class="flex items-center gap-2 mb-4 group">
            <span class="text-2xl" aria-hidden="true">✂️</span>
            <span class="text-xl font-bold text-primary-light">NaviCrafty</span>
          </RouterLink>
          <p class="text-white/60 text-sm leading-relaxed max-w-xs">
            Your modern craft learning hub. Tutorials, inspiration, and recommended materials to help you create with confidence.
          </p>
          <!-- Social Links -->
          <div class="flex items-center gap-3 mt-6">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`Follow NaviCrafty on ${social.name}`"
              class="w-9 h-9 bg-white/10 hover:bg-primary rounded-xl flex items-center justify-center transition-colors duration-200"
            >
              <span class="w-4 h-4" v-html="social.icon"></span>
            </a>
          </div>
        </div>

        <!-- Link Columns -->
        <div
          v-for="(links, group) in footerLinks"
          :key="group"
          class="lg:col-span-1"
        >
          <h3 class="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">
            {{ group }}
          </h3>
          <ul class="space-y-2" role="list">
            <li v-for="link in links" :key="link.to">
              <RouterLink
                :to="link.to"
                class="text-sm text-white/50 hover:text-primary-light transition-colors duration-200"
              >
                {{ link.name }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div class="lg:col-span-1">
          <h3 class="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">
            Stay Inspired
          </h3>
          <p class="text-sm text-white/50 mb-4">Get weekly project ideas and tutorials.</p>
          <form
            class="flex flex-col gap-2"
            aria-label="Newsletter signup"
            @submit.prevent
          >
            <label for="footer-email" class="sr-only">Email address</label>
            <input
              id="footer-email"
              type="email"
              placeholder="you@example.com"
              class="w-full px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              aria-required="true"
            />
            <button
              type="submit"
              class="w-full btn-primary text-sm justify-center"
              aria-label="Subscribe to NaviCrafty newsletter"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <!-- Bottom -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
        <p>&copy; {{ currentYear }} NaviCrafty. All rights reserved.</p>
        <p class="text-center sm:text-right">
          This site contains affiliate links. As an Amazon Associate we earn from qualifying purchases.
        </p>
      </div>

    </div>
  </footer>
</template>
