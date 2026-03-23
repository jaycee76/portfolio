import { ref, computed, onMounted } from 'vue'

type Theme = 'dark' | 'light'

const theme = ref<Theme>('dark')

export function useTheme() {
  const isDark = computed(() => theme.value === 'dark')

  function applyTheme(t: Theme) {
    theme.value = t
    document.documentElement.setAttribute('data-theme', t)
    localStorage.setItem('theme', t)
  }

  function toggleTheme() {
    applyTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  function initTheme() {
    const stored = localStorage.getItem('theme') as Theme | null
    if (stored === 'dark' || stored === 'light') {
      applyTheme(stored)
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      applyTheme(prefersDark ? 'dark' : 'light')
    }
  }

  return { theme, isDark, toggleTheme, initTheme }
}
