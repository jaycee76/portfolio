import { ref, onMounted, onUnmounted } from 'vue'

const ROLES = [
  'Software Engineer',
  'AI Engineer',
  'Automation Architect',
  'Full-Stack Developer',
]

const TYPE_SPEED = 80   // ms per character
const DELETE_SPEED = 40 // ms per character
const PAUSE_AFTER_TYPE = 2000  // ms
const PAUSE_BEFORE_TYPE = 400  // ms

export function useTypewriter() {
  const displayed = ref('')
  const timers: ReturnType<typeof setTimeout>[] = []

  function schedule(fn: () => void, delay: number) {
    const id = setTimeout(fn, delay)
    timers.push(id)
    return id
  }

  function typeRole(roleIndex: number) {
    const role = ROLES[roleIndex % ROLES.length]
    let charIndex = 0

    function typeNext() {
      if (charIndex < role.length) {
        displayed.value = role.slice(0, charIndex + 1)
        charIndex++
        schedule(typeNext, TYPE_SPEED)
      } else {
        schedule(deleteRole, PAUSE_AFTER_TYPE)
      }
    }

    function deleteRole() {
      if (displayed.value.length > 0) {
        displayed.value = displayed.value.slice(0, -1)
        schedule(deleteRole, DELETE_SPEED)
      } else {
        schedule(() => typeRole(roleIndex + 1), PAUSE_BEFORE_TYPE)
      }
    }

    typeNext()
  }

  onMounted(() => typeRole(0))

  onUnmounted(() => {
    timers.forEach(clearTimeout)
  })

  return { displayed }
}
