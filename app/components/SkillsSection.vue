<script setup lang="ts">
import { skills, categories } from '~/data/skills'

const skillsByCategory = (cat: string) => skills.filter(s => s.category === cat)
</script>

<template>
  <section id="skills" class="py-24">
    <div class="max-w-6xl mx-auto px-6">
      <h2
        v-reveal
        class="text-3xl font-bold mb-12 border-l-4 border-accent pl-4"
        style="color: var(--color-text)"
      >
        Skills
      </h2>

      <div class="space-y-12">
        <div v-for="cat in categories" :key="cat">
          <h3
            v-reveal
            class="text-sm font-semibold uppercase tracking-widest text-accent mb-6"
          >
            {{ cat }}
          </h3>
          <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            <div
              v-for="(skill, index) in skillsByCategory(cat)"
              :key="skill.label"
              v-reveal="{ delay: index * 50 }"
              class="rounded-lg p-4 flex flex-col items-center gap-2 border border-transparent hover:border-accent transition-colors duration-200 cursor-default"
              style="background-color: var(--color-surface)"
            >
              <div
                v-if="skill.svg"
                class="w-10 h-10 [&_svg]:w-full [&_svg]:h-full"
                aria-hidden="true"
                v-html="skill.svg"
              />
              <div v-else class="w-10 h-10 flex items-center justify-center text-accent text-xs font-bold bg-accent/10 rounded-md">
                {{ skill.label.slice(0, 2) }}
              </div>
              <span class="text-xs text-center font-medium leading-tight" style="color: var(--color-text-muted)">
                {{ skill.label }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style></style>
