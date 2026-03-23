<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'

interface Line {
  type: 'command' | 'output' | 'empty'
  text: string
}

const lines = ref<Line[]>([])
const userInput = ref('')
const inputRef = ref<HTMLInputElement | null>(null)
const bodyRef = ref<HTMLDivElement | null>(null)
const isRunning = ref(false)
const showCursor = ref(false)

const BIO = 'Software Engineer turned AI Engineer. With a foundation in shipping production-grade applications using React and Vue.js, I bring strong technical discipline into the modern AI landscape. I now specialize in designing autonomous workflows and RAG-driven systems using n8n and Mastra.ai.'

const FAKE_COMMITS = [
  'a3f1c2e feat: ship AI workflow that actually works',
  'b9d4a77 fix: remove console.logs before PR review',
  'c2e8f01 chore: push to prod on a Friday (YOLO)',
]

const EASTER_EGGS: Record<string, string> = {
  help: 'Available commands: whoami, skills, contact, joke, clear',
  whoami: 'John Christopher Jasmin',
  skills: 'frontend/  backend/  ai-orchestration/  devops/',
  contact: 'Email: jaycee.a.jasmin@gmail.com | LinkedIn: /in/johnchristopherjasmin/',
  joke: "Why do programmers prefer dark mode? Because light attracts bugs.",
}

async function typeCommand(text: string, speed = 60) {
  lines.value.push({ type: 'command', text: '' })
  const idx = lines.value.length - 1
  for (const char of text) {
    lines.value[idx].text += char
    await sleep(speed)
    scrollBottom()
  }
}

async function showOutput(text: string, delay = 200) {
  await sleep(delay)
  lines.value.push({ type: 'output', text })
  lines.value.push({ type: 'empty', text: '' })
  scrollBottom()
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function scrollBottom() {
  nextTick(() => {
    if (bodyRef.value) {
      bodyRef.value.scrollTop = bodyRef.value.scrollHeight
    }
  })
}

async function runSequence() {
  isRunning.value = true

  await sleep(600)
  await typeCommand('whoami')
  await showOutput('John Christopher Jasmin')

  await typeCommand('cat bio.txt')
  await showOutput(BIO)

  await typeCommand('ls skills/')
  await showOutput('frontend/  backend/  ai-orchestration/  devops/')

  await typeCommand('git log --oneline -3')
  for (const commit of FAKE_COMMITS) {
    lines.value.push({ type: 'output', text: commit })
    await sleep(120)
    scrollBottom()
  }
  lines.value.push({ type: 'empty', text: '' })

  showCursor.value = true
  isRunning.value = false
  nextTick(() => inputRef.value?.focus())
}

function handleCommand() {
  const cmd = userInput.value.trim().toLowerCase()
  if (!cmd) return
  lines.value.push({ type: 'command', text: cmd })
  userInput.value = ''

  if (cmd === 'clear') {
    lines.value = []
    return
  }

  const response = EASTER_EGGS[cmd]
  if (response) {
    lines.value.push({ type: 'output', text: response })
  } else {
    lines.value.push({ type: 'output', text: `command not found: ${cmd}. Type 'help' for available commands.` })
  }
  lines.value.push({ type: 'empty', text: '' })
  scrollBottom()
}

// Trigger sequence on scroll into view
onMounted(() => {
  const section = document.getElementById('about')
  if (!section) { runSequence(); return }

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        runSequence()
        observer.disconnect()
      }
    },
    { threshold: 0.2 }
  )
  observer.observe(section)
})
</script>

<template>
  <section id="about" class="py-24">
    <div class="max-w-6xl mx-auto px-6">
      <h2
        v-reveal
        class="text-3xl font-bold mb-12 border-l-4 border-accent pl-4"
        style="color: var(--color-text)"
      >
        About Me
      </h2>

      <div v-reveal class="terminal-window">
        <!-- Title bar -->
        <div class="terminal-titlebar">
          <div class="terminal-dot" style="background: #ff5f57" />
          <div class="terminal-dot" style="background: #febc2e" />
          <div class="terminal-dot" style="background: #28c840" />
          <span class="ml-3 text-xs" style="color: #888">jaycee@portfolio:~</span>
        </div>

        <!-- Terminal body -->
        <div ref="bodyRef" class="terminal-body">
          <div v-for="(line, i) in lines" :key="i">
            <div v-if="line.type === 'command'" class="terminal-line">
              <span class="terminal-prompt">jaycee@portfolio:~$</span>
              <span>{{ line.text }}</span>
            </div>
            <div v-else-if="line.type === 'output'" class="terminal-output">{{ line.text }}</div>
            <div v-else class="h-2" />
          </div>

          <!-- Waiting cursor after sequence -->
          <div v-if="showCursor" class="terminal-line">
            <span class="terminal-prompt">jaycee@portfolio:~$</span>
            <span class="terminal-cursor" />
          </div>
        </div>

        <!-- User input row (shown after sequence completes) -->
        <div v-if="!isRunning" class="terminal-input-row">
          <span class="terminal-prompt" style="font-size: 13px">jaycee@portfolio:~$</span>
          <input
            ref="inputRef"
            v-model="userInput"
            class="terminal-input"
            placeholder="type a command..."
            @keydown.enter="handleCommand"
            spellcheck="false"
            autocomplete="off"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style></style>
