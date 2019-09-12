import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router'

import '@/antd.less'

import App from './App.vue'
import storeOptions from '@/store/index'
import { getEmptyRouter, getRouter } from '@/router/index'

Vue.use(Vuex)
Vue.use(Router)

new Vue({
  store: new Vuex.Store(storeOptions),
  router: getEmptyRouter(),
  data: {
    loading: true
  },
  async created() {
    await this.$store.dispatch('usePlugin', { vueInstance: Vue })
    await this.$store.dispatch('initializerState')
    this.loading = false
  },
  watch: {
    // hack vue-router reload
    '$store.getters.routerMap'(routerMap) {
      let reloadRouter = () => {
        // chear apps
        this.$router.apps = []

        // ref to 'vue-router/install.js': beforeCreate
        this._routerRoot = this
        this._router = getRouter(routerMap)
        this._router.init(this)
        Vue.util.defineReactive(this, '_route', this._router.history.current)
        let i = this.$options._parentVnode
        if (i !== undefined && (i = i.data) !== undefined && f(i = i.registerRouteInstance) !== undefined) {
          i(this, this)
        }
      }

      reloadRouter()
    }
  },
  render(h) {
    if (this.loading) {
      return h('div', ['Page loading....'])
    } else {
      return h(App)
    }
  },
  el: '#app'
})
