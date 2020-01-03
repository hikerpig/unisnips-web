<template>
  <div class="home">
    <div class="flex justify-between">
      <SourcePanel class="flex-grow" />
      <ResultPanel class="flex-grow" />
    </div>
  </div>
</template>

<script>
import SourcePanel from '@/components/SourcePanel.vue'
import ResultPanel from 'src/components/ResultPanel.vue'

export default {
  name: 'home',
  components: {
    SourcePanel,
    ResultPanel,
  }
}
</script>
