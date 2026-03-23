<script setup lang="ts">
import { Github, Linkedin, Mail } from 'lucide-vue-next'

const contacts = [
  { label: 'Email', value: 'jaycee.a.jasmin@gmail.com', href: 'mailto:jaycee.a.jasmin@gmail.com', icon: Mail },
  { label: 'LinkedIn', value: 'John Christopher Jasmin', href: 'https://www.linkedin.com/in/johnchristopherjasmin/', icon: Linkedin },
  { label: 'GitHub', value: 'github.com/jaycee76', href: 'https://github.com/jaycee76', icon: Github },
]
</script>

<template>
  <section id="contact" class="py-24">
    <div class="max-w-2xl mx-auto px-6 text-center">
      <h2 class="text-3xl font-bold text-white mb-4 border-l-4 border-accent pl-4 text-left">
        Get In Touch
      </h2>
      <p class="text-white/50 text-sm mb-12 text-left">Feel free to reach out through any of the channels below.</p>

      <div class="space-y-4">
        <a
          v-for="contact in contacts"
          :key="contact.label"
          :href="contact.href"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-4 bg-[#1a1a1a] border border-transparent hover:border-accent rounded-xl px-6 py-4 transition-colors duration-200 group"
        >
          <component :is="contact.icon" :size="20" class="text-accent shrink-0" />
          <div class="text-left">
            <p class="text-white/50 text-xs uppercase tracking-widest">{{ contact.label }}</p>
            <p class="text-white font-medium group-hover:text-accent transition-colors duration-200">{{ contact.value }}</p>
          </div>
        </a>
      </div>

      <p class="text-white/30 text-sm text-center mt-16">
        © 2026 John Christopher Jasmin. All rights reserved.
      </p>
    </div>
  </section>
</template>

<style></style>
