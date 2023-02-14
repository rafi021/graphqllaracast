
import { createApp, provide, h } from 'vue'
import { createPinia } from 'pinia'
import { apolloClient } from './apollo'
import { DefaultApolloClient } from '@vue/apollo-composable'

import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css"

const app = createApp({
    setup () {
      provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App),
})

app.use(createPinia())
app.use(router)

app.mount('#app')
import "bootstrap"
