import Vue from 'vue'
import Vuex from 'vuex'

import { GlobalState } from './type'
import { MUTATIONS } from './mutations'
import { ACTIONS } from './actions'

Vue.use(Vuex)

export default new Vuex.Store<GlobalState>({
  state: {
    swState: {
      updated: false,
    },
    source: {
      type: 'ultisnips',
      content: '',
    },
    highlightItems: [],
    snippetSourceItem: {
      name: '',
      type: '',
      content: '',
      remoteUrl: '',
    }
  },
  mutations: MUTATIONS,
  actions: ACTIONS,
  modules: {},
})
