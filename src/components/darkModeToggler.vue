<template>
  <button
    @click="onClick"
    class="dark:bg-gray-800 p-3 w-[140px] h-[40px] flex items-center justify-center border rounded hover:scale-105 cursor-pointer border-blue-400 light:transition"
  >
    <span v-if="darkMode" class="dark:text-white light:transition"
      >Dark mode 🌕</span
    >
    <span v-else>Light mode ☀️</span>
  </button>
</template>

<script setup>
import { ref, onMounted } from "vue"

const darkMode = ref(false)

const updateTheme = () => {
  const htmlElement = document.documentElement
  if (darkMode.value) {
    htmlElement.setAttribute("data-theme", "dark")
    localStorage.setItem("theme", "dark")
  } else {
    htmlElement.setAttribute("data-theme", "light")
    localStorage.setItem("theme", "light")
  }
}

const onClick = () => {
  darkMode.value = !darkMode.value
  updateTheme()
}

onMounted(() => {
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark") {
    darkMode.value = true
  } else {
    darkMode.value = false
  }
  updateTheme()
})
</script>

<style scoped></style>
