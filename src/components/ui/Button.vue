<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'ghost'].includes(v)
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v)
  },
  as: {
    type: String,
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <component
    :is="as"
    :disabled="as === 'button' ? disabled : undefined"
    :class="[
      'inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
      // Variants
      variant === 'primary' && 'bg-primary hover:bg-primary-dark text-white shadow-soft hover:shadow-soft-hover hover:-translate-y-0.5 focus:ring-primary',
      variant === 'secondary' && 'bg-white hover:bg-beige-dark text-primary border-2 border-primary focus:ring-primary',
      variant === 'ghost' && 'bg-transparent hover:bg-beige-dark text-primary focus:ring-primary',
      // Sizes
      size === 'sm' && 'px-4 py-2 text-sm',
      size === 'md' && 'px-6 py-3 text-sm',
      size === 'lg' && 'px-8 py-4 text-base',
      // Disabled
      disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
    ]"
  >
    <slot />
  </component>
</template>
