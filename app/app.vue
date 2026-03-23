<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  const skip = new Set(['SCRIPT', 'STYLE', 'INPUT', 'TEXTAREA', 'SELECT', 'CODE', 'PRE'])

  function wrapWords(node: Node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent ?? ''
      if (!text.trim()) return
      const wrapped = text.replace(/(\S+)/g, '<span class="word-hover">$1</span>')
      const span = document.createElement('span')
      span.innerHTML = wrapped
      node.parentNode?.replaceChild(span, node)
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (skip.has((node as Element).tagName)) return
      Array.from(node.childNodes).forEach(wrapWords)
    }
  }

  wrapWords(document.body)
})
</script>

<template>
  <div class="bg-dark min-h-screen">
    <app-nav />
    <hero-section />
    <about-section />
    <skills-section />
    <portfolio-section />
    <contact-section />
  </div>
</template>

<style></style>
