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
        <div v-if="marker" class="u-placeholder__marker">
          <div>{{ marker.type }}</div>
          <pre>{{ markerDataStr }}</pre>
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
.u-placeholder__marker {
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

@Component({
  components: {
    Expandable,
  },
})
export default class UPlaceholder extends Vue {
  @Prop({ required: true }) placeholder: SnippetPlaceholder
  @Prop({ required: true }) definition: SnippetDefinition

  isHover = false

  get marker(): TokenNode<any> {
    return get(this.placeholder.extra, 'marker')
  }

  get headerStr() {
    const infoSegs = []
    const { valueType } = this.placeholder
    if (valueType === 'positional') {
      infoSegs.push(`index: ${this.placeholder.index}`)
    } else if (valueType === 'variable') {
      infoSegs.push(`variableName: ${this.placeholder.variable!.name}`)
    } else if (valueType === 'script') {
      infoSegs.push(`scriptType: ${this.placeholder.scriptInfo!.scriptType}`)
    }
    return infoSegs.join(', ')
  }

  get markerDataStr() {
    const markerData = (this.marker ? this.marker.data : null) || {}
    if (this.placeholder.description) {
      markerData.description = this.placeholder.description
    }
    return JSON.stringify(markerData, null, 2)
  }

  handleMouseEnter() {
    this.isHover = true
    if (this.marker) {
      // const codePosition = this.placeholder.codePosition
      const snipPosition = this.definition.position
      const positionInFile = this.placeholder.codePosition
      // console.log('position in file', JSON.stringify(positionInFile))
      this.$store.commit('UPDATE_HIGHLIGHT_ITEMS', {
        items: [
          {
            type: 'marker',
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
