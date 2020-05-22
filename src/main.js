import Vue from 'vue'
import App from './App.vue'
import {DatePicker} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(DatePicker)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
