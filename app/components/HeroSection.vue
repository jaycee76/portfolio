<script setup lang="ts">
import { ref } from 'vue'

const particlesRef = ref<{ updateMouse: (x: number, y: number) => void, resetMouse: () => void } | null>(null)

function onMouseMove(e: MouseEvent) {
  if (!particlesRef.value) return
  const section = e.currentTarget as HTMLElement
  const rect = section.getBoundingClientRect()
  particlesRef.value.updateMouse(e.clientX - rect.left, e.clientY - rect.top)
}

function onMouseLeave() {
  particlesRef.value?.resetMouse()
}
</script>

<template>
  <section
    class="relative min-h-screen flex flex-col items-center justify-center gap-6 px-6 pt-16 overflow-hidden"
    aria-label="Hero"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
  >
    <HeroParticles ref="particlesRef" class="absolute inset-0" />

    <div class="relative z-10 flex flex-col items-center gap-6 text-center">
      <img
        src="/hero-img.jpg"
        alt="Profile photo"
        class="rounded-full border-4 border-accent w-48 h-48 object-cover shadow-lg"
        width="192"
        height="192"
      />
      <h1 class="text-5xl font-bold" style="color: var(--color-text)">
        John Christopher Jasmin
      </h1>
      <p class="text-2xl font-medium text-accent">
        Software Engineer | AI Engineer
      </p>
    </div>
  </section>
</template>

<style></style>
