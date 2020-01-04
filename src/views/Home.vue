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
import SourcePanel from '@/components/SourcePanel.vue'
import ResultPanel from 'src/components/ResultPanel.vue'

export default {
  name: 'home',
  components: {
    SourcePanel,
    ResultPanel,
  },
  methods: {
    onResize() {
      // adjust codemirror size so they can fit full the screen
      // console.log('on resize')
      const codeMirrorEles = this.$el.querySelectorAll('.CodeMirror')
      const screenHeight = window.innerHeight
      codeMirrorEles.forEach(ele => {
        const oldBcr = ele.getBoundingClientRect()
        ele.style.height = `${screenHeight - oldBcr.top}px`
      })
    },
  },
}
</script>
