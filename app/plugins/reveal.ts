import { useScrollReveal } from '~/composables/useScrollReveal'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('reveal', useScrollReveal())
})
