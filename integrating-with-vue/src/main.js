import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

Vue.config.ignoredElements = [ 'media-comparison-component' ]

new Vue({
  render: h => h(App),
}).$mount('#app')
