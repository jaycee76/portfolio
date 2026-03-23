<script setup lang="ts">
import { ExternalLink, Github } from "lucide-vue-next"

type Project = {
  title: string
  description: string
  tags: string[]
  github: string
  demo: string
}

const projects: Project[] = [
  {
    title: "Phendex Medical",
    description: "Single Page Application to feature medical products available in Phendex Medical.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/jaycee76/pendex-website",
    demo: "https://phendexmedical.net/",
  },
  {
    title: "Typing Speed Test",
    description: "Passion project to build a typing speed test app with real-time WPM and accuracy tracking. *** In progress ***",
    tags: ["VueJS", "Nuxt 3", "TypeScript"],
    github: "https://github.com/jaycee76/typing-project",
    demo: "#",
  },
]
</script>

<template>
  <section id="portfolio" class="py-24">
    <div class="max-w-6xl mx-auto px-6">
      <h2
        v-reveal
        class="text-3xl font-bold mb-12 border-l-4 border-accent pl-4"
        style="color: var(--color-text)"
      >
        Shareable Portfolio
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <article
          v-for="(project, index) in projects"
          :key="project.title"
          v-reveal="{ delay: index * 100 }"
          class="rounded-xl p-6 border border-transparent hover:border-accent transition-colors duration-200 flex flex-col gap-4"
          style="background-color: var(--color-surface)"
        >
          <h3 class="font-bold text-lg" style="color: var(--color-text)">
            {{ project.title }}
          </h3>

          <p class="text-sm leading-relaxed flex-1" style="color: var(--color-text-muted)">
            {{ project.description }}
          </p>

          <div class="flex flex-wrap gap-2">
            <span
              v-for="tag in project.tags"
              :key="tag"
              class="bg-accent/10 text-accent text-xs px-2 py-1 rounded font-medium"
            >
              {{ tag }}
            </span>
          </div>

          <div class="flex items-center gap-4 pt-2 border-t" style="border-color: var(--color-border)">
            <a
              :href="project.github"
              class="flex items-center gap-1.5 text-sm transition-colors duration-200 hover:text-accent"
              style="color: var(--color-text-muted)"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`View GitHub repository for ${project.title}`"
            >
              <Github :size="14" />
              GitHub
            </a>
            <a
              v-if="project.demo !== '#'"
              :href="project.demo"
              class="flex items-center gap-1.5 text-sm transition-colors duration-200 hover:text-accent"
              style="color: var(--color-text-muted)"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`View live demo for ${project.title}`"
            >
              <ExternalLink :size="14" />
              Live Demo
            </a>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style></style>
