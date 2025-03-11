import { useQuery } from "@tanstack/vue-query"
import axios from "axios"

async function getAlbums(Rows, sortKey, sortOrder, albumIds) {
  try {
    // Проверяем на пустую строку и если строка не пустая составляем строку запроса
    const albumIdQuery =
      albumIds && albumIds.length > 0
        ? albumIds.map((id) => `albumId=${id}`).join("&")
        : ""

    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/photos?_sort=${sortKey}&_order=${sortOrder}&_limit=${Rows}${
        albumIdQuery ? "&" + albumIdQuery : "" // Вставляем строку запроса или ничего если ничего нет
      }`
    )
    return response.data
  } catch (error) {
    console.error("Error fetching albums:", error)
    throw error
  }
}

// Хук для использования запроса
export function useAlbumsGet(visRows, sortKey, sortOrder, albumIds) {
  return useQuery({
    queryKey: ["albums", visRows.value, sortKey.value, sortOrder.value], // отслеживаем изменения в ключах
    queryFn: () =>
      getAlbums(visRows.value, sortKey.value, sortOrder.value, albumIds.value),
  })
}
