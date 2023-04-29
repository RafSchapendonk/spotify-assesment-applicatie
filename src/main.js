import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import { faUserSecret, faCircleNotch } from '@fortawesome/free-solid-svg-icons'

import './style.scss'
import App from './App.vue'
import router from './router'

library.add(faUserSecret, faCircleNotch)

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
