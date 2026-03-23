<script setup lang="ts">
const navLinks = [
  { label: "About Me", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 bg-dark/90 backdrop-blur-md border-b border-white/5"
  >
    <div
      class="max-w-6xl mx-auto px-6 h-16 flex items-center justify-center gap-4"
    >
      <div class="flex items-center gap-6">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          class="text-sm text-white/70 hover:text-accent transition-colors duration-200"
        >
          {{ link.label }}
        </a>
      </div>
    </div>
  </nav>
</template>

<style></style>
