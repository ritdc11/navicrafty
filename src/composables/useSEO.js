import { useHead } from '@vueuse/head'

const SITE_NAME = 'NaviCrafty'
const SITE_URL = 'https://navicrafty.com'
const DEFAULT_IMAGE = '/og-image.jpg'

/**
 * Composable for managing SEO meta tags, Open Graph, Twitter Cards and JSON-LD
 * @param {Object} options - SEO configuration options
 */
export function useSEO({
  title,
  description,
  image = DEFAULT_IMAGE,
  url,
  type = 'website',
  jsonLd = null
} = {}) {
  const fullTitle = title ? `${title} – ${SITE_NAME}` : `${SITE_NAME} – Learn. Create. Craft with Confidence.`
  const fullUrl = url ? `${SITE_URL}${url}` : SITE_URL
  const fullImage = image.startsWith('http') ? image : `${SITE_URL}${image}`

  const headConfig = {
    title: fullTitle,
    meta: [
      // Primary
      { name: 'description', content: description },
      // Open Graph
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:image', content: fullImage },
      { property: 'og:url', content: fullUrl },
      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@navicrafty' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: fullImage }
    ],
    link: [
      { rel: 'canonical', href: fullUrl }
    ]
  }

  if (jsonLd) {
    headConfig.script = [
      {
        type: 'application/ld+json',
        children: JSON.stringify(jsonLd)
      }
    ]
  }

  useHead(headConfig)
}

/**
 * Generate WebSite JSON-LD structured data
 */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'A modern craft learning hub with tutorials, materials, and inspiration.',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/tutorials?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  }
}

/**
 * Generate Organization JSON-LD structured data
 */
export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    sameAs: [
      'https://www.instagram.com/navicrafty',
      'https://www.pinterest.com/navicrafty',
      'https://www.youtube.com/navicrafty'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'hello@navicrafty.com'
    }
  }
}

/**
 * Generate BlogPosting JSON-LD structured data
 * @param {Object} post - Blog post data object
 */
export function blogPostingSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image?.startsWith('http') ? post.image : `${SITE_URL}${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.svg`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`
    }
  }
}

/**
 * Generate Product JSON-LD structured data for affiliate products
 * @param {Object} product - Product data object
 */
export function productSchema(product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image?.startsWith('http') ? product.image : `${SITE_URL}${product.image}`,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: product.price,
      availability: 'https://schema.org/InStock',
      url: product.affiliateLink
    }
  }
}
