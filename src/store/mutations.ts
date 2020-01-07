import Vue from 'vue'

import { GlobalState } from './type'

export const MUTATIONS = {
  UPDATE_SOURCE(state: GlobalState, payload: Partial<GlobalState['source']>) {
    Object.assign(state.source, payload)
  },
  UPDATE_HIGHLIGHT_ITEMS(state: GlobalState, payload: { items: GlobalState['highlightItems'] }) {
    for (let i = 0; i < payload.items.length; i++) {
      const item = payload.items[i]
      Vue.set(state.highlightItems, i, item)
    }
  },
}
