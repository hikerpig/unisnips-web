<template>
  <div class="source-panel">
    <div class="source-panel__header">
      <label>Source: </label>
      <select v-model="sourceType">
        <option v-for="item in sourceOptions" :key="item.value" :value="item.value">{{ item.label }}</option>
      </select>
    </div>
    <div id="source" ref="codemirror"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'
import Vue from 'vue'

import CodeMirror, { Editor } from 'codemirror'

import { EXAMPLES } from 'src/settings/example'

import { GlobalState } from 'src/store/type'

@Component({

})
export default class SourcePanel extends Vue {
  editor: Editor

  sourceOptions = [
    { value: 'ultisnips', label: 'UltiSnips' },
    // { value: 'generator', label: 'Generator' },
  ]

  @State('source') source: GlobalState['source']

  get sourceType() {
    return this.source.type
  }

  set sourceType(v) {
    this.$store.commit('UPDATE_SOURCE', {
      type: v,
    })
  }

  get shouldShowSnippetGenerator() {
    return this.source.type === 'generator'
  }

  mounted() {
    this.init()
    this.loadExampleItem(EXAMPLES[0])
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
          content: content,
        })
      } catch (error) {
        console.error(error)
      }
    })

    this.editor = editor
  }

  loadExampleItem(item: any) {
    if (item.content) {
      this.editor.setValue(item.content)
    }
  }
}
</script>