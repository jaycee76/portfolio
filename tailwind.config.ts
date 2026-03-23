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
        accent: '#2ecc71',
        dark: '#0d0d0d',
      },
      fontFamily: {
        cursive: ['Pacifico', 'cursive'],
        sans: ['Inter', 'sans-serif'],
      }
    }
  }
} satisfies Config
