import Vue from 'vue'

import VueRouter from 'vue-router'
import routerConfig from './router'

import VueResource from 'vue-resource'

import VueTouch from 'vue-touch'

import Vuex from 'vuex'

import App from './views/App'


Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueTouch)

var router = new VueRouter({
    hashbang: true,
    history: false,
    saveScrollPosition: true,
    suppressTransitionError: true
})

routerConfig(router)

// Resource
Vue.use(VueResource)

Vue.http.options.root = '/data/'
Vue.http.options.emulateJSON = true

window.router = router
window.rootPath = 'http://www.iihwx.com/shangshi_r0/dist/index.html'
window.srcPath = 'http://ker.iihwx.com/iih_wechatbs/Public/home/common/shangshi/'

router.start(App, '#app')

