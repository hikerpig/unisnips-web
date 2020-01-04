<template>
  <div class="u-placeholder">
    <Expandable>
      <template v-slot:header>
        <v-chip label>{{ headerStr }}</v-chip>
      </template>

      <template>
        <div v-if="token" class="u-placeholder__token">
          <div>{{ token.type }}</div>
          <pre>{{ tokenDataStr }}</pre>
        </div>
      </template>
    </Expandable>

  </div>
</template>

<style lang="scss">
.u-placeholder__token {
  margin-left: 1em;
}
</style>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import Vue from 'vue'

import { SnippetDefinition, SnippetPlaceholder } from '@unisnips/core'
import { get } from 'lodash'

import Expandable from 'src/components/result/Expandable.vue'

@Component({
  components: {
    Expandable,
  }
})
export default class UPlaceholder extends Vue {
  @Prop({ required: true }) placeholder: SnippetPlaceholder
  @Prop({ required: true }) definition: SnippetDefinition

  get token() {
    return get(this.placeholder.extra, 'token')
  }

  get headerStr() {
    let str = `valueType: ${ this.placeholder.valueType }`
    if (this.placeholder.valueType === 'positional') {
      str += `, index: ${this.placeholder.index}`
    }
    return str
  }

  get tokenDataStr() {
    const tokenData = (this.token ? this.token.data: null) || {}
    if (this.placeholder.description) {
      tokenData.description = this.placeholder.description
    }
    return JSON.stringify(tokenData, null, 2)
  }

}
</script>