<template>
  <v-app id="app">
    <v-app-bar dense dark app class="app-header">
      <v-toolbar-title @click="handleIconClick">
        <!-- <router-link to="/">UniSnips</router-link> -->
        UniSnips
      </v-toolbar-title>
      <!-- <nav>
        <router-link to="/">UniSnips</router-link>
        <router-link to="/about">About</router-link>
      </nav> -->
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<style lang="scss">
@import 'src/styles/common.scss';

.app-header {
  .v-toolbar__title {
    cursor: pointer;
  }
}
</style>

<script>
export default {
  methods: {
    handleIconClick() {
      if (this.$route.name !== 'home') {
        this.$router.push({ name: 'home' })
      }
    },
  }
}
</script>