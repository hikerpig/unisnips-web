<template>
  <v-app>
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

    <v-snackbar
      color="indigo lighten-1"
      v-model="updatedSnackbarVisible"
      :timeout="0"
    >
      <span>New content is available, please refresh.</span>
      <v-btn
        color="yellow"
        text
        @click="handleRefreshClick"
      >
        Refresh
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<style lang="scss">
@import 'src/styles/common.scss';

.app-header {
  background-color: #212121 !important;

  .v-toolbar__title {
    cursor: pointer;
  }
}
</style>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      updatedSnackbarVisible: false,
    }
  },
  computed: {
    ...mapState(['swState']),
  },
  mounted() {
    this.initSwStateWatcher()
  },
  methods: {
    initSwStateWatcher() {
      this.$watch('swState.updated', (v) => {
        if (v) {
          this.updatedSnackbarVisible = true
        }
      })
    },
    handleRefreshClick() {
      this.updatedSnackbarVisible = false
      window.location.reload()
    },
    handleIconClick() {
      if (this.$route.name !== 'home') {
        this.$router.push({ name: 'home' })
      }
    },
  },
}
</script>
