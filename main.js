import Vue from 'vue'
import App from './App'

import store from './store'

Vue.prototype.$store = store
// 将一些使用频率较高的常量或者方法，直接扩展到 Vue.prototype 上，每个 Vue 对象都会“继承”下来。
// 注意这种方式只支持vue页面
// https://ask.dcloud.net.cn/article/35021

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
