import Vue from 'vue'
import App from './App'
import common from 'common/common.js'

Vue.prototype.common = common
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
