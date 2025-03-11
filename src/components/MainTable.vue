<template>
  <div
    class="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4 dark:transition light:transition"
  >
    <div
      class="w-[600px] h-[600px] dark:transition bg-white light:transition dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col overflow-x-auto overflow-y-auto"
      ref="scrollContainer"
      @scroll="handleScroll"
    >
      <table class="w-full min-w-[600px]">
        <thead>
          <tr>
            <th
              v-for="name in tHeaders"
              :key="name"
              class="p-4 bg-gray-100 light:transition dark:transition dark:bg-gray-700 sticky top-0 cursor-pointer whitespace-nowrap text-left font-semibold text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
              @click="sortData(name)"
            >
              <div class="flex items-center">
                <span>{{ name }}</span>
                <span v-if="sortKey === name" class="ml-2">
                  {{ sortOrder === "asc" ? "▲" : "▼" }}
                </span>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(element, index) in data"
            :key="index"
            class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors dark:transition light:transition"
          >
            <td
              v-for="col in tHeaders"
              :key="col"
              class="p-4 border-b border-gray-100 dark:border-gray-600 text-gray-600 dark:text-gray-300 dark:transition light:transition"
            >
              <div class="overflow-hidden overflow-ellipsis whitespace-nowrap">
                {{ element[col] }}
              </div>
            </td>
          </tr>
          <tr v-if="isLoading">
            <td
              :colspan="tHeaders.length"
              class="p-4 text-center text-gray-500 dark:text-gray-400 dark:transition light:transition"
            >
              Загрузка...
            </td>
          </tr>
          <tr v-if="isError">
            <td :colspan="tHeaders.length" class="p-4 text-center text-red-500">
              Ошибка при загрузке данных: {{ error }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue"
import { useAlbumsGet } from "../Hooks/useAlbumsGet"
import { useQueryClient } from "@tanstack/vue-query"
import { useAlbumsStore } from "../stores/albumsid"

const albumsStore = useAlbumsStore()
const albumIds = computed(() => albumsStore.albumIds) // Отслеживаем изменения в хранилище

const queryClient = useQueryClient()

const scrollContainer = ref(null)
const visRows = ref(30)
const sortKey = ref("id") // Начальный ключ
const sortOrder = ref("asc") // Начальный порядок

const { data, isLoading, isError, error } = useAlbumsGet(
  visRows,
  sortKey,
  sortOrder,
  albumIds
)

const tHeaders = ["albumId", "id", "title", "url", "thumbnailUrl"]

// Обновляем данные при изменении параметров
watch([visRows, sortKey, sortOrder, albumIds], () => {
  // Перезапускаем запрос, чтобы получить новые данные
  queryClient.invalidateQueries([
    "albums",
    visRows.value,
    sortKey.value,
    sortOrder.value,
    albumIds,
  ])
})

function handleScroll() {
  const container = scrollContainer.value
  const isAtBottom =
    container.scrollTop + container.clientHeight >= container.scrollHeight - 10

  if (isAtBottom && !isLoading.value) {
    visRows.value += 30 // Увеличиваем количество загружаемых строк при скроле до конца
    console.log(visRows.value)
  }
}

function sortData(key) {
  sortKey.value = key
  sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc" // Порядок сортировки
}
</script>
<!-- Получается, что данные запрашиваются по частям, то есть по 30 строк, постепенно увеличвая колиество запрошеных строк, 
 при этом сортировка и фильтрация по id альбома происходим на сервере, подробнее смотрите строку запроса в useAlbumsGet -->
<style scoped></style>
