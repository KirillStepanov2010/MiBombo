import { createApp } from "vue"
import App from "./App.vue"
import "./style.css"
import { VueQueryPlugin } from "@tanstack/vue-query"
import { createPinia } from "pinia"
const app = createApp(App)
const pinia = createPinia()

app.use(VueQueryPlugin)
app.use(pinia)
app.mount("#app")
