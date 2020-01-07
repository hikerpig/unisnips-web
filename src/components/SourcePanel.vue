<template>
  <div class="source-panel">
    <div class="source-panel__header">
      <v-tabs fixed-tabs color="yellow darken-1" dark v-model="tabValue">
        <v-tab v-for="item in sourceOptions" :key="item.value" :value="item.value">
          {{ item.label }}
        </v-tab>
      </v-tabs>
    </div>
    <div id="source" ref="codemirror"></div>
  </div>
</template>

<style lang="scss">
.source__mark-text {
  background-color: rgba(#FFEE58, 0.4);
}

</style>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'
import Vue from 'vue'

import CodeMirror, { Editor } from 'codemirror'

import { EXAMPLES } from 'src/settings/example'

import { Point } from 'unist'
import { GlobalState } from 'src/store/type'

import 'src/util/codemirror-mode/snippets'

@Component({})
export default class SourcePanel extends Vue {
  editor: Editor

  sourceOptions = [
    { value: 'ultisnips', label: 'UltiSnips' },
    // { value: 'generator', label: 'Generator' },
  ]

  @State('source') source: GlobalState['source']
  @State('highlightItems') highlightItems: GlobalState['highlightItems']

  get sourceType() {
    return this.source.type
  }

  set sourceType(v) {
    this.$store.commit('UPDATE_SOURCE', {
      type: v,
    })
  }

  get tabValue() {
    for (let i = 0; i < this.sourceOptions.length; i++) {
      const item = this.sourceOptions[i]
      if (item.value === this.sourceType) { return i }
    }
    return 0
  }

  set tabValue(v) {
    const item = this.sourceOptions[v]
    if (item) {
      this.sourceType = item.value
    }
  }

  get shouldShowSnippetGenerator() {
    return this.source.type === 'generator'
  }

  mounted() {
    this.init()
    this.loadExampleItem(EXAMPLES[0])
    this.initWatchers()
  }

  init() {
    const sourceEle = document.getElementById('source') as HTMLDivElement

    const editor = CodeMirror(sourceEle, {
      lineNumbers: true,
      theme: 'material',
      mode: 'snippets',
    })

    editor.on('change', () => {
      const content = editor.getValue()
      try {
        this.$store.commit('UPDATE_SOURCE', {
          content,
        })
      } catch (error) {
        console.error(error)
      }
    })

    this.editor = editor
  }

  initWatchers() {
    function toCodeMirrorPosition(point: Point): CodeMirror.Position {
      return {
        line: point.line,
        ch: point.column,
      }
    }
    this.$watch('highlightItems', () => {
      // console.log('highlightItems', this.highlightItems)
      this.editor.getAllMarks().forEach((marker) => {
        marker.clear()
      })
      this.highlightItems.forEach((item) => {
        // console.log(JSON.stringify(item.position))
        this.editor.markText(
          toCodeMirrorPosition(item.position.start),
          toCodeMirrorPosition(item.position.end),
          { className: 'source__mark-text' }
        )
      })
    })
  }

  loadExampleItem(item: any) {
    if (item.content) {
      this.editor.setValue(item.content)
    }
  }
}
</script>
