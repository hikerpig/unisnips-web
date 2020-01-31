<template>
  <v-dialog class="export-dialog"
    :value="visible"
    @input="changeVisible"
  >
    <v-card>
      <v-card-title
        primary-title
        class="grey lighten-2"
      >
        Export Files
      </v-card-title>
      <v-card-text>
        <template v-if="conversionResult">
          <ExportFileItem v-for="fileItem in fileItems" :key="fileItem.filename"
            v-bind="{ fileItem }"
          ></ExportFileItem>
        </template>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style lang="scss">

</style>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import Vue from 'vue'

import { SnippetDefinition, GenerateResult } from '@unisnips/core'
import ExportFileItem from 'src/components/result/export-dialog/ExportFileItem.vue'
import { FileItem } from './defs.d'

@Component({
  components: {
    ExportFileItem,
  }
})
export default class ExportDialog extends Vue {
  @Prop() visible: boolean
  @Prop() definitions: SnippetDefinition[]
  @Prop() conversionResult: GenerateResult

  get fileItems() {
    const items: FileItem[] = []
    if (this.definitions) {
      items.push({
        filename: 'test-download.json',
        content: '{ "content": "test" }'
      })
    }
    return items
  }

  changeVisible(v: boolean) {
    this.$emit('update:visible', v)
  }
}
</script>