import type { DirectiveBinding, ObjectDirective } from 'vue'

interface RevealOptions {
  delay?: number
}

export function useScrollReveal(): ObjectDirective<HTMLElement, RevealOptions> {
  const prefersReduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement
          const delay = Number(el.dataset.revealDelay ?? 0)
          setTimeout(() => {
            el.classList.remove('reveal-hidden')
            el.classList.add('reveal-visible')
            observer.unobserve(el)
          }, delay)
        }
      })
    },
    { threshold: 0.15 }
  )

  return {
    mounted(el: HTMLElement, binding: DirectiveBinding<RevealOptions>) {
      if (prefersReduced) return
      el.dataset.revealDelay = String(binding.value?.delay ?? 0)
      el.classList.add('reveal-hidden')
      observer.observe(el)
    },
    unmounted(el: HTMLElement) {
      observer.unobserve(el)
    }
  }
}
