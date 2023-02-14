
import { createApp, provide, h } from 'vue'
import { createPinia } from 'pinia'
import { apolloClient } from './apollo'
import { DefaultApolloClient } from '@vue/apollo-composable'

import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import VPagination from "@hennge/vue3-pagination";


const app = createApp({
    setup () {
      provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App),
})

app.use(createPinia())
app.use(router)
app.component("v-pagination", VPagination);

app.mount('#app')
import "bootstrap"
