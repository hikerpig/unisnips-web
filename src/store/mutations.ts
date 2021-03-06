import Vue from 'vue'

import { GlobalState } from './type'

export const MUTATIONS = {
  UPDATE_SW_STATE(state: GlobalState, payload: Partial<GlobalState['swState']>) {
    Object.assign(state.swState, payload)
  },
  UPDATE_SOURCE(state: GlobalState, payload: Partial<GlobalState['source']>) {
    Object.assign(state.source, payload)
  },
  UPDATE_HIGHLIGHT_ITEMS(state: GlobalState, payload: { items: GlobalState['highlightItems'] }) {
    for (let i = 0; i < payload.items.length; i++) {
      const item = payload.items[i]
      Vue.set(state.highlightItems, i, item)
    }
  },
  // UPDATE_GENERATOR_ITEMS(state: GlobalState, payload: { }) {
  // },
  SET_SNIPPET_SOURCE_ITEM(state: GlobalState, payload: GlobalState['snippetSourceItem']) {
    // state.snippetSourceItem = Object.assign(state.snippetSourceItem, payload)
    state.snippetSourceItem = payload
  },
}
