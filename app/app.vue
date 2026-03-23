<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useTheme } from '~/composables/useTheme'

const { initTheme } = useTheme()

let dot: HTMLDivElement | null = null
let ring: HTMLDivElement | null = null

function onMouseMove(e: MouseEvent) {
  dot!.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
  ring!.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
}

function onMouseOver(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (target.closest('a, button')) {
    ring!.classList.add('hovered')
  } else {
    ring!.classList.remove('hovered')
  }
}

onMounted(() => {
  initTheme()

  // Cursor
  dot = document.createElement('div')
  dot.className = 'cursor-dot'
  ring = document.createElement('div')
  ring.className = 'cursor-ring'
  document.body.appendChild(dot)
  document.body.appendChild(ring)

  window.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseover', onMouseOver)

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

onUnmounted(() => {
  dot?.remove()
  ring?.remove()
  window.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseover', onMouseOver)
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
