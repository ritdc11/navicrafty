<script setup>
defineProps({
  eyebrow: {
    type: String,
    default: null
  },
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: null
  },
  align: {
    type: String,
    default: 'center',
    validator: (v) => ['left', 'center'].includes(v)
  },
  level: {
    type: String,
    default: 'h2',
    validator: (v) => ['h1', 'h2', 'h3'].includes(v)
  }
})
</script>

<template>
  <div :class="['mb-12', align === 'center' ? 'text-center' : 'text-left']">
    <!-- Eyebrow -->
    <p
      v-if="eyebrow"
      class="inline-block text-xs font-semibold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-3"
    >
      {{ eyebrow }}
    </p>

    <!-- Heading -->
    <component
      :is="level"
      :class="[
        'font-bold text-neutral-900',
        level === 'h1' ? 'text-4xl md:text-5xl lg:text-6xl' : 'text-3xl md:text-4xl'
      ]"
    >
      {{ title }}
    </component>

    <!-- Subtitle -->
    <p
      v-if="subtitle"
      :class="[
        'mt-4 text-neutral-800/60 text-lg leading-relaxed',
        align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl'
      ]"
    >
      {{ subtitle }}
    </p>
  </div>
</template>
