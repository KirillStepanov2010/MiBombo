import { defineStore } from "pinia"

export const useAlbumsStore = defineStore("albumsId", {
  state: () => ({
    albumIds: [],
  }),
  actions: {
    addAlbumIds(ids) {
      ids ? this.albumIds.push(...ids) : null
    },
    clearAlbumIds() {
      this.albumIds = []
    },
  },
})
