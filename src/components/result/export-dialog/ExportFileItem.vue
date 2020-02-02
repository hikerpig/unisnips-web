<template>
  <div class="export-file-item">
    <v-card>
      <v-card-title class="flex justify-space-between">
        <div class="export-file-item__title">
          {{ fileItem.filename }}
        </div>
        <v-card-actions class="export-file-item__actions">
          <v-btn small :href="downloadHref" :download="fileItem.filename">
            <v-icon>mdi-file-download</v-icon>
            Download
          </v-btn>
        </v-card-actions>
      </v-card-title>
      <v-card-text>
        <pre ref="codeEle" :class="[`language-${codeLanguage}`]">{{ fileItem.content }}</pre>
      </v-card-text>
    </v-card>
  </div>
</template>

<style lang="scss">
.export-file-item__actions {
}

.export-file-item {
  a.export-file-item__download {
    text-decoration: none;
    color: inherit;
  }
}
</style>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import Vue from 'vue'
import hljs from 'highlight.js'

import { FileItem } from '../defs.d'

@Component({

})
export default class ExportFileItem extends Vue {
  $refs: {
    codeEle: HTMLElement
  }
  @Prop() fileItem: FileItem

  get downloadHref() {
    return `data:text/plain;charset=utf-8,${encodeURIComponent(this.fileItem.content)}`
  }

  get codeLanguage() {
    return this.fileItem.filename.split('.').pop()
  }

  mounted() {
    hljs.highlightBlock(this.$refs.codeEle)
  }
}
</script>