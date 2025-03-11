<template>
  <header class="bg-white dark:bg-gray-800 p-5 shadow-md transition">
    <div
      class="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
    >
      <a
        href="https://t.me/StepanovKR"
        class="text-sm text-blue-600 hover:underline dark:text-blue-400 transition"
        target="_blank"
      >
        Степанов Кирилл
      </a>

      <form
        @submit.prevent="onSubmit"
        class="flex flex-col md:flex-row items-center w-full md:w-auto space-y-2 md:space-y-0 md:space-x-3"
      >
        <input
          v-model="inputValue"
          type="text"
          name="sortInput"
          placeholder="Введите id альбома"
          class="w-full md:w-auto placeholder:text-gray-400 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition dark:bg-gray-700 dark:border-gray-600 dark:placeholder:text-gray-200 dark:text-white"
        />
        <button
          class="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer hover:scale-105 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Найти
        </button>
      </form>

      <DarkModeToggler class="w-full md:w-auto" />
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue"
import { useAlbumsStore } from "../storeS/albumsiD"
import DarkModeToggler from "./darkModeToggler.vue"

const inputValue = ref("")
const albumsStore = useAlbumsStore()

const onSubmit = () => {
  albumsStore.clearAlbumIds()
  const ids = inputValue.value
    .split(" ")
    .map((id) => Number(id.trim()))
    .filter((id) => !isNaN(id))

  albumsStore.addAlbumIds(ids)

  inputValue.value = ""
  console.log(albumsStore.albumIds)
}
</script>

<style></style>
