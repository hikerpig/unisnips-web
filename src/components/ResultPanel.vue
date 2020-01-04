<template>
  <div class="result-panel">
    <div class="result-panel__header">
      <v-row justify="space-around" align-content="center">
        <v-col>
          <v-select
            v-model="target"
            :items="targetOptions"
            hide-details
            outlined
            dense
            item-text="label"
            item-value="value"
          >
          </v-select>
        </v-col>
        <v-col>
          <v-switch dense inset hide-details v-model="shouldAutoGenerate" label="Auto Generate">
          </v-switch>
        </v-col>
      </v-row>
    </div>
    <div class="result-panel__content">
      <div id="result"></div>
    </div>
  </div>
</template>

<style lang="scss">
#result {
  .CodeMirror {
    padding: 10px;
  }
}

.result-panel__header {
  .row {
    height: 48px;
    padding: 0 10px;
  }
  .v-input--selection-controls {
    margin-top: 0;
  }

  .v-input__slot {
    margin-bottom: 0 !important;
  }

  .v-input--switch {
    padding-top: 10px;
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

@Component({})
export default class ResultPanel extends Vue {
  resultCm: Editor

  @State('source') source: GlobalState['source']

  target = 'vscode'
  shouldAutoGenerate = false

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
    this.updateCodeMirrorByTarget()
  }

  mounted() {
    this.initObservers()
    this.initCodeMirror()
  }

  initCodeMirror() {
    const resultEle = document.getElementById('result') as HTMLDivElement

    this.resultCm = CodeMirror(resultEle, {
      readOnly: true,
    })
    this.updateCodeMirrorByTarget()
  }

  initObservers() {
    this.$watch('source.content', content => {
      if (this.shouldAutoGenerate) {
        this.updateByContent(content)
      }
    })
    this.$watch('shouldAutoGenerate', () => {
      if (this.shouldAutoGenerate) {
        this.updateByContent()
      }
    })
  }

  updateByContent(content = this.source.content) {
    const result = convert({
      inputContent: content,
      source: 'ultisnips',
      target: this.target,
    })
    // console.log(result)
    // this.generation.content = result.content
    this.resultCm.setValue(result.content)
  }

  updateCodeMirrorByTarget() {
    const mode = (TARGET_MODE_MAP as any)[this.target]
    // console.log('mode', mode)
    this.resultCm.setOption('mode', mode)
  }
}
</script>
