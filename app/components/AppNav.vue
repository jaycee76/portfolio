<script setup lang="ts">
import { Sun, Moon } from 'lucide-vue-next'
import { useTheme } from '~/composables/useTheme'

const { isDark, toggleTheme } = useTheme()

const navLinks = [
  { label: "About Me", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
]
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b"
    style="background-color: color-mix(in srgb, var(--color-bg) 90%, transparent); border-color: var(--color-border)"
  >
    <div class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <div class="flex items-center gap-6">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="text-sm transition-colors duration-200 hover:text-accent"
          style="color: var(--color-text-muted)"
        >
          {{ link.label }}
        </a>
      </div>

      <button
        @click="toggleTheme"
        class="p-2 rounded-lg transition-all duration-200 hover:text-accent"
        style="color: var(--color-text-muted)"
        :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      >
        <Transition name="icon-swap" mode="out-in">
          <Sun v-if="!isDark" :key="'sun'" :size="18" />
          <Moon v-else :key="'moon'" :size="18" />
        </Transition>
      </button>
    </div>
  </nav>
</template>

<style scoped>
.icon-swap-enter-active,
.icon-swap-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.icon-swap-enter-from {
  opacity: 0;
  transform: rotate(-30deg);
}
.icon-swap-leave-to {
  opacity: 0;
  transform: rotate(30deg);
}
</style>
