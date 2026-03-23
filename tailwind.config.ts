import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/components/**/*.vue',
    './app/pages/**/*.vue',
    './app/app.vue',
    './app/layouts/**/*.vue',
  ],
  theme: {
    extend: {
      colors: {
        accent: 'var(--color-accent)',
        dark: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        foreground: 'var(--color-text)',
        muted: 'var(--color-text-muted)',
      },
      fontFamily: {
        cursive: ['Pacifico', 'cursive'],
        sans: ['Inter', 'sans-serif'],
      }
    }
  }
} satisfies Config
