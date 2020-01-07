<template>
  <div
    class="u-placeholder"
    :class="{
      'is-hover': isHover,
    }"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <Expandable>
      <template v-slot:header>
        <v-chip label color="cyan lighten-2" title="valueType">{{ placeholder.valueType }}</v-chip>
        <v-chip label>{{ headerStr }}</v-chip>
      </template>

      <template>
        <div v-if="token" class="u-placeholder__token">
          <div>{{ token.type }}</div>
          <pre>{{ tokenDataStr }}</pre>
        </div>
      </template>
    </Expandable>
  </div>
</template>

<style lang="scss">
.u-placeholder {
  padding: 0.5em;

  &.is-hover {
    background-color: #fff59d;
  }

  .v-chip {
    margin-right: 4px;
  }
}
.u-placeholder__token {
  margin-left: 0.5em;
}
</style>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import Vue from 'vue'

import { SnippetDefinition, SnippetPlaceholder, TokenNode } from '@unisnips/core'
import { Point } from 'unist'
import { get } from 'lodash'

import Expandable from 'src/components/result/Expandable.vue'

function positionAdd(base: Point, p: Point, lineDelta = 0): Point {
  return {
    line: base.line + p.line + lineDelta,
    column: p.column,
  }
}

@Component({
  components: {
    Expandable,
  },
})
export default class UPlaceholder extends Vue {
  @Prop({ required: true }) placeholder: SnippetPlaceholder
  @Prop({ required: true }) definition: SnippetDefinition

  isHover = false

  get token(): TokenNode<any> {
    return get(this.placeholder.extra, 'token')
  }

  get headerStr() {
    const infoSegs = []
    const { valueType } = this.placeholder
    if (valueType === 'positional') {
      infoSegs.push(`index: ${this.placeholder.index}`)
    } else if (valueType === 'variable') {
      infoSegs.push(`variableName: ${this.placeholder.variable!.name}`)
    }
    return infoSegs.join(', ')
  }

  get tokenDataStr() {
    const tokenData = (this.token ? this.token.data : null) || {}
    if (this.placeholder.description) {
      tokenData.description = this.placeholder.description
    }
    return JSON.stringify(tokenData, null, 2)
  }

  handleMouseEnter() {
    // console.log('mouse enter')

    this.isHover = true
    if (this.token) {
      const codePosition = this.placeholder.codePosition
      const snipPosition = this.definition.position
      const positionInFile: typeof codePosition = {
        start: positionAdd(snipPosition.start, codePosition.start, 1),
        end: positionAdd(snipPosition.start, codePosition.end, 1),
      }
      // console.log('position in file', JSON.stringify(positionInFile))
      this.$store.commit('UPDATE_HIGHLIGHT_ITEMS', {
        items: [
          {
            type: 'token',
            position: positionInFile,
          },
        ],
      })
    }
  }

  handleMouseLeave() {
    this.isHover = false
  }
}
</script>
