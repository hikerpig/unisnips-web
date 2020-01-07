import Vue from 'vue'
import Vuex from 'vuex'

import { GlobalState } from './type'
import { MUTATIONS } from './mutations'

Vue.use(Vuex)

export default new Vuex.Store<GlobalState>({
  state: {
    source: {
      type: 'ultisnips',
      content: '',
    },
    highlightItems: [],
  },
  mutations: MUTATIONS,
  actions: {},
  modules: {},
})
