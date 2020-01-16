<template>
  <div class="source-generator">
    <SourceGeneratorItem v-for="item in items" :key="item.id"
      @change="onItemChange(item)"
      v-bind="{ item }"
    />
  </div>
</template>

<style lang="scss">

</style>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import Vue from 'vue'
import outdent from 'outdent'
import SourceGeneratorItem from 'src/components/source/SourceGeneratorItem.vue'

import { GeneratorItem } from './defs.d'

let itemId = 1

function getNewItem(): GeneratorItem {
  return {
    id: itemId++,
    trigger: '',
    description: '',
    body: '',
  }
}

@Component({
  components: {
    SourceGeneratorItem,
  }
})
export default class SourceGenerator extends Vue {
  items = [getNewItem()]

  onItemChange() {
    const content = this.items.reduce((out: string[], item) => {
      const str = outdent`
      snippet ${item.trigger} "${item.description}"
      ${item.body}
      endsnippet`
      out.push(str)
      return out
    }, []).join('\n')
    this.$store.commit('UPDATE_SOURCE', {
      content,
    })
  }
}
</script>