<template>
  <div class="expandable" @click.stop="handleClick">
    <slot name="header"></slot>
    <div class="expandable__content" v-show="expanded">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">

</style>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import Vue from 'vue'

@Component({

})
export default class Expandable extends Vue {
  expanded = true

  handleClick() {
    this.expanded = !this.expanded
  }
}
</script>