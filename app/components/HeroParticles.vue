<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let animationId = 0
let mouse = { x: -999, y: -999 }

const PARTICLE_COUNT = 80
const CONNECTION_DIST = 120
const REPEL_DIST = 100

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

function getAccentColor(): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue('--color-accent')
    .trim() || '#2ecc71'
}

onMounted(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return

  const el = canvas.value
  if (!el) return
  const ctx = el.getContext('2d')!

  let W = el.offsetWidth
  let H = el.offsetHeight
  el.width = W
  el.height = H

  const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
    r: 1.5 + Math.random() * 1.5,
  }))

  function draw() {
    ctx.clearRect(0, 0, W, H)
    const accent = getAccentColor()

    for (const p of particles) {
      const dx = p.x - mouse.x
      const dy = p.y - mouse.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < REPEL_DIST && dist > 0) {
        const force = (REPEL_DIST - dist) / REPEL_DIST * 0.8
        p.vx += (dx / dist) * force
        p.vy += (dy / dist) * force
      }

      p.vx *= 0.99
      p.vy *= 0.99
      p.x += p.vx
      p.y += p.vy

      if (p.x < 0 || p.x > W) p.vx *= -1
      if (p.y < 0 || p.y > H) p.vy *= -1
      p.x = Math.max(0, Math.min(W, p.x))
      p.y = Math.max(0, Math.min(H, p.y))

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = accent + '99'
      ctx.fill()
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const pi = particles[i]!
        const pj = particles[j]!
        const dx = pi.x - pj.x
        const dy = pi.y - pj.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < CONNECTION_DIST) {
          const alpha = (1 - dist / CONNECTION_DIST) * 0.4
          ctx.beginPath()
          ctx.moveTo(pi.x, pi.y)
          ctx.lineTo(pj.x, pj.y)
          ctx.strokeStyle = accent + Math.round(alpha * 255).toString(16).padStart(2, '0')
          ctx.lineWidth = 0.8
          ctx.stroke()
        }
      }
    }

    animationId = requestAnimationFrame(draw)
  }

  function handleVisibility() {
    if (document.hidden) {
      cancelAnimationFrame(animationId)
    } else {
      animationId = requestAnimationFrame(draw)
    }
  }
  document.addEventListener('visibilitychange', handleVisibility)

  let resizeTimer: ReturnType<typeof setTimeout>
  function handleResize() {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => {
      W = el!.offsetWidth
      H = el!.offsetHeight
      el!.width = W
      el!.height = H
    }, 200)
  }
  window.addEventListener('resize', handleResize)

  animationId = requestAnimationFrame(draw)

  onUnmounted(() => {
    cancelAnimationFrame(animationId)
    clearTimeout(resizeTimer)
    document.removeEventListener('visibilitychange', handleVisibility)
    window.removeEventListener('resize', handleResize)
  })
})

function updateMouse(x: number, y: number) {
  mouse.x = x
  mouse.y = y
}

function resetMouse() {
  mouse = { x: -999, y: -999 }
}

defineExpose({ updateMouse, resetMouse })
</script>

<template>
  <canvas
    ref="canvas"
    class="absolute inset-0 w-full h-full hidden md:block"
    style="pointer-events: none; z-index: 0"
  />
</template>
