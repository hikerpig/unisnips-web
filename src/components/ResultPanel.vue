<template>
  <div class="result-panel">
    <div class="result-panel__header">
      <v-tabs fixed-tabs background-color="grey darken-2" color="yellow darken-1" dark v-model="tabValue">
        <v-tab v-for="item in resultOptions" :key="item.value" :value="item.value">
          {{ item.label }}
        </v-tab>
      </v-tabs>

      <v-row justify="space-around" align-content="center">
        <v-col>
          <v-autocomplete
            v-show="!shouldShowDebug"
            v-model="target"
            :items="targetOptions"
            hide-details
            outlined
            dense
            item-value="value"
            item-text="label"
          >
            <template v-slot:item="{ item }">
              <img :src="item.img" class="result-panel__select-img">
              <v-list-item-title v-html=" item.label "></v-list-item-title>
            </template>
            <template v-slot:selection="{ item, index }">
              <img :src="item.img" class="result-panel__select-img">
              <span class="caption">{{ item.label }}</span>
            </template>
          </v-autocomplete>
        </v-col>
        <v-col>
          <v-switch dense inset hide-details v-model="shouldAutoGenerate" label="Auto Generate">
          </v-switch>
        </v-col>
      </v-row>
    </div>
    <div class="result-panel__content js-expand-full-height">
      <div v-show="!shouldShowDebug" id="result"></div>
      <div v-show="shouldShowDebug">
        <DefinitionItem v-for="def in definitions" :key="def.trigger+def.description"
          :definition="def"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
#result {
  .CodeMirror {
    padding: 10px;
  }
}

.result-panel {
  .definition-item {
    margin-bottom: 10px;
    margin-left: 10px;
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

.result-panel__content {
  overflow-y: scroll;
}

.result-panel__select-img {
  height: 1.5em;
  margin-right: 10px;
}
</style>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'
import Vue from 'vue'

import CodeMirror, { Editor } from 'codemirror'

import { SnippetDefinition, ParseOptions } from '@unisnips/core'
import { convert } from '@unisnips/unisnips'
import ULTISNIPS_PLUGIN from '@unisnips/ultisnips'
import { GlobalState } from 'src/store/type'
import { SHP } from 'src/util/paths'
import { findPosAndItem } from 'src/util/util'
import DefinitionItem from 'src/components/result/DefinitionItem.vue'

import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/coffeescript/coffeescript'
import 'codemirror/mode/xml/xml'

const TARGET_MODE_MAP = {
  vscode: 'javascript',
  atom: 'coffeescript',
  sublime: 'xml',
}

function getIconImg(name: string) {
  return SHP(`/img/target-icons/${name}`)
}

@Component({
  components: {
    DefinitionItem,
  }
})
export default class ResultPanel extends Vue {
  resultCm: Editor

  @State('source') source: GlobalState['source']

  target = 'vscode'
  shouldAutoGenerate = true
  definitions: SnippetDefinition[] = []

  targetOptions = [
    { value: 'vscode', label: 'vscode', img: getIconImg('vscode.png') },
    { value: 'sublime', label: 'Sublime Text', img: getIconImg('sublime.png') },
    { value: 'atom', label: 'Atom', img: getIconImg('atom.png')  },
  ]

  resultType = 'result'
  // resultType = 'debug' // @@DEBUG:
  resultOptions = [
    { value: 'result', label: 'Result' },
    { value: 'debug', label: 'Debug' },
  ]

  generation = {
    content: '',
  }

  get tabValue() {
    const { pos } = findPosAndItem(this.resultOptions, (o) => o.value === this.resultType)
    return pos
  }

  set tabValue(v) {
    this.resultType = this.resultOptions[v].value
  }

  get shouldShowDebug() {
    return this.resultType === 'debug'
  }

  @Watch('target')
  onTargetChange() {
    this.updateByContent(this.source.content)
    this.updateCodeMirrorByTarget()
  }

  mounted() {
    this.initObservers()
    this.initCodeMirror()
    this.updateByContent()
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
    this.resultCm.setValue(result.content)

    const { definitions } = ULTISNIPS_PLUGIN.parse(content)
    console.debug('definitions', definitions)
    this.definitions = definitions
  }

  updateCodeMirrorByTarget() {
    const mode = (TARGET_MODE_MAP as any)[this.target]
    // console.log('mode', mode)
    this.resultCm.setOption('mode', mode)
  }
}
</script>
