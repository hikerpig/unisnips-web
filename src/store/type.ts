// import { TokenNode } from '@unisnips/core'
import { Position } from 'unist'

export interface GlobalState {
  swState: {
    updated: boolean
  }
  source: {
    type: string
    content: string
  }
  highlightItems: Array<{
    type: string
    position: Position
  }>
}
