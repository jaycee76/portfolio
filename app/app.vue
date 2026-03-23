<script setup lang="ts">
import { onMounted } from 'vue'
import { useTheme } from '~/composables/useTheme'

const { initTheme } = useTheme()

onMounted(() => {
  initTheme()

  // Cursor
  const dot = document.createElement('div')
  dot.className = 'cursor-dot'
  const ring = document.createElement('div')
  ring.className = 'cursor-ring'
  document.body.appendChild(dot)
  document.body.appendChild(ring)

  let mouseX = 0, mouseY = 0
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`
    ring.style.transform = `translate(${mouseX}px, ${mouseY}px)`
  })

  document.addEventListener('mouseover', (e) => {
    const target = e.target as HTMLElement
    if (target.closest('a, button')) {
      ring.classList.add('hovered')
    } else {
      ring.classList.remove('hovered')
    }
  })

  // Word hover
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
  <div class="min-h-screen" style="background-color: var(--color-bg)">
    <app-nav />
    <hero-section />
    <about-section />
    <skills-section />
    <portfolio-section />
    <contact-section />
  </div>
</template>

<style></style>
