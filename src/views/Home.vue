<template>
  <div class="home" v-resize="onResize">
    <div class="d-flex justify-space-between">
      <SourcePanel class="flex-grow-1" />
      <ResultPanel class="flex-grow-1" />
    </div>
  </div>
</template>

<style lang="scss">
.source-panel,
.result-panel {
  width: 50%;
}

.CodeMirror {
  height: 100%;
}
</style>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import Vue from 'vue'

import SourcePanel from '@/components/SourcePanel.vue'
import ResultPanel from 'src/components/ResultPanel.vue'

@Component({
  components: {
    SourcePanel,
    ResultPanel,
  },
})
export default class HomePage extends Vue {
  $el: HTMLDivElement

  onResize() {
    // adjust codemirror size so they can fit full the screen
    // console.log('on resize')
    const codeMirrorEles = this.$el.querySelectorAll('.CodeMirror')
    const expandHeightEles = this.$el.querySelectorAll('.js-expand-full-height')
    const screenHeight = window.innerHeight
    const eleList = Array.from(codeMirrorEles).concat(Array.from(expandHeightEles))
    eleList.forEach((ele: any) => {
      const oldBcr = ele.getBoundingClientRect()
      ele.style.height = `${screenHeight - oldBcr.top}px`
    })
  }
}
</script>
