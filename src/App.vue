<template>
  <v-app>
    <AppHeader />
    <v-content>
      <router-view />
    </v-content>

    <v-snackbar
      color="indigo lighten-1"
      v-model="updatedSnackbarVisible"
      :timeout="0"
    >
      <span>A new version of UniSnips is available.</span>
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
</style>

<script>
import { mapState } from 'vuex'
import AppHeader from 'src/components/header/AppHeader.vue'

export default {
  components: {
    AppHeader,
  },
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
