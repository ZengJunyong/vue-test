import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'

Vue.use(VueResource)

window.global = {connectionError: false}
Vue.http.interceptors.push((req, next) => {
  next((res) => {
    debugger
    if (res.status * 1 === 404) {
      window.global.connectionError = true
    }
    return res
  })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
