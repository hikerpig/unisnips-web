import Vue from 'vue'

import { GlobalState } from './type'

export const MUTATIONS = {
  UPDATE_SOURCE(state: GlobalState, payload: Partial<GlobalState['source']>) {
    Object.assign(state.source, payload)
  },
}
