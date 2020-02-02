<template>
  <v-dialog
    scrollable
    :value="visible"
    @input="changeVisible"
  >
    <v-card class="export-dialog__content">
      <v-card-title
        primary-title
        class="grey lighten-2"
      >
        Export Files
      </v-card-title>
      <v-card-text>
        <div class="d-flex justify-space-between export-dialog__description">
          <div>
            Download Generated Snippet Files
          </div>
          <v-btn v-show="shouldShowDownloadAll" small color="yellow darken-1"
            :href="downloadBlobSrc" download="unisnips.zip"
            @mouseenter="handleDownloadAllMouseEnter"
          >
            <v-icon>mdi-file-download</v-icon>
            Download All (unisnips.zip)
          </v-btn>
        </div>
        <ExportFileItem v-for="fileItem in fileItems" :key="fileItem.filename"
          v-bind="{ fileItem }"
        ></ExportFileItem>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style lang="scss">
.export-dialog__content {
  .export-file-item {
    margin-top: 10px;
    margin-bottom: 10px;
  }
}

.export-dialog__description {
  font-size: 1.2em;
  margin: 10px 0;
}
</style>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import Vue from 'vue'
import JSZIP from 'jszip'

import { SnippetDefinition, GenerateResult, SyncInfo } from '@unisnips/core'
import ExportFileItem from 'src/components/result/export-dialog/ExportFileItem.vue'
import { FileItem } from './defs.d'

@Component({
  components: {
    ExportFileItem,
  }
})
export default class ExportDialog extends Vue {
  @Prop() visible: boolean
  @Prop() syncInfo: SyncInfo

  downloadBlobSrc = ''
  isPreparingDownload = false

  get fileItems() {
    const items: FileItem[] = []
    if (this.syncInfo && this.syncInfo.entries) {
      this.syncInfo.entries.forEach((entry) => {
        items.push(entry)
      })
    }
    return items
  }

  get shouldShowDownloadAll() {
    return this.fileItems.length > 1
  }

  @Watch('visible')
  onVisibleChange() {
    if (!this.visible) {
      this.downloadBlobSrc = ''
      this.isPreparingDownload = false
    }
  }

  changeVisible(v: boolean) {
    this.$emit('update:visible', v)
  }

  handleDownloadAllMouseEnter() {
    // console.log('handleDownloadAllMouseEnter')
    if (this.downloadBlobSrc) {
      return
    }
    const zip = new JSZIP()
    const folder = zip.folder('unisnips')
    this.syncInfo.entries.forEach((info) => {
      folder.file(info.filename, info.content)
    })
    this.isPreparingDownload = true
    zip.generateAsync({ type: 'blob' }).then((blob: Blob) => {
      console.log('Generated zip blob', blob)
      const url = URL.createObjectURL(blob)
      this.downloadBlobSrc = url
      this.isPreparingDownload = false
    }).catch((err: any) => {
      console.error(err)
      this.isPreparingDownload = false
    })
  }
}
</script>