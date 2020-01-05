<template>
  <v-card class="definition-item" @click="handleClick"
    :ripple="false"
  >
    <header class="d-flex justify-space-between">
      <v-chip label color="yellow accent-4" :title="`trigger:${definition.trigger}`">{{ definition.trigger }}</v-chip>
      <!-- <b>{{ definition.trigger }}</b> -->
      <span>{{ definition.description }}</span>
    </header>
    <div v-show="expanded">
      <span>Placeholders: </span>
      <div class="definition-item__placeholders">
        <UPlaceholder v-for="(placeholder, i) in definition.placeholders" :key="i"
          v-bind="{
            placeholder,
            definition,
          }"
        />
      </div>
    </div>
  </v-card>
</template>

<style lang="scss">
.definition-item {
  padding: 5px;
  border-bottom: 1px solid #BBB;

  .u-placeholder {
    margin-left: 1em;
  }
}
</style>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import Vue from 'vue'

import { SnippetDefinition, ParseOptions } from '@unisnips/core'

import UPlaceholder from './UPlaceholder.vue'

// TODO: hover highlight
@Component({
  components: {
    UPlaceholder,
  }
})
export default class DefinitionItem extends Vue {
  @Prop({ required: true }) definition: SnippetDefinition

  expanded = true

  handleClick() {
    this.expanded = !this.expanded
  }
}
</script>