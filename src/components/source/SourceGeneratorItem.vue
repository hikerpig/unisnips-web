<template>
<v-card class="source-generator-item">
  <template>
    <div class="source-generator-item__head d-flex justify-space-between">
      <v-col class="trigger">
        <v-text-field v-model="item.trigger" label="Trigger" outlined dense>
        </v-text-field>
      </v-col>
      <v-col class="description">
        <v-text-field v-model="item.description" label="Description" outlined dense>
        </v-text-field>
      </v-col>
    </div>
    <div>
      <v-col>
        <v-textarea
          outlined
          name="body"
          label="Snippet body"
          v-model="item.body"
        ></v-textarea>
      </v-col>
    </div>
  </template>
</v-card>
</template>

<style lang="scss">
.source-generator-item {
  margin: 10px;
}
</style>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import Vue from 'vue'
import { debounce } from 'throttle-debounce'

import { GeneratorItem } from './defs.d'

@Component({

})
export default class SourceGeneratorItem extends Vue {
  @Prop({ required: true }) item: GeneratorItem

  mounted() {
    this.initWatchers()
  }

  initWatchers() {
    const debouncedEmitChange = debounce(200, false, () => {
      this.$emit('change', this.item)
    })

    this.$watch('item', () => {
      debouncedEmitChange()
    }, { deep: true })
  }
}
</script>