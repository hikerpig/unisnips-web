<template>
  <div class="result-panel">
    <div class="result-panel__header">
      <label>Target: </label>
      <select v-model="target">
        <option v-for="item in targetOptions" :key="item.value" :value="item.value">{{ item.label }}</option>
      </select>
    </div>
    <div class="result-panel__content">
      <div id="result"></div>
      <!-- <pre>{{ generation.content }}</pre> -->
    </div>
  </div>
</template>

<style lang="scss">
#result {
  .CodeMirror {
    padding: 10px;
  }
}

</style>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'
import Vue from 'vue'

import CodeMirror, { Editor } from 'codemirror'

import { SnippetDefinition, ParseOptions } from '@unisnips/core'
import { convert } from '@unisnips/unisnips'
import { GlobalState } from 'src/store/type'

import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/coffeescript/coffeescript'
import 'codemirror/mode/xml/xml'

const TARGET_MODE_MAP = {
  vscode: 'javascript',
  atom: 'coffeescript',
  sublime: 'xml',
}

@Component({

})
export default class ResultPanel extends Vue {
  resultCm: Editor

  @State('source') source: GlobalState['source']

  target = 'vscode'

  targetOptions = [
    { value: 'vscode', label: 'vscode' },
    { value: 'sublime', label: 'Sublime Text' },
    { value: 'atom', label: 'Atom' },
  ]

  generation = {
    content: '',
  }

  @Watch('target')
  onTargetChange() {
    this.updateByContent(this.source.content)
    this.updateByTarget()
  }

  mounted() {
    this.initObservers()
    this.initCodeMirror()
  }

  initCodeMirror() {
    const resultEle = document.getElementById('result') as HTMLDivElement

    this.resultCm = CodeMirror(resultEle, {
    })
    this.updateByTarget()
  }

  initObservers() {
    this.$watch('source.content', (content) => {
      this.updateByContent(content)
    })
  }

  updateByContent(content: string) {
    const result = convert({
      inputContent: content,
      source: 'ultisnips',
      target: this.target,
    })
    // console.log(result)
    // this.generation.content = result.content
    this.resultCm.setValue(result.content)
  }

  updateByTarget() {
    let mode = (TARGET_MODE_MAP as any)[this.target]
    console.log('mode', mode)
    this.resultCm.setOption('mode', mode)
  }
}
</script>