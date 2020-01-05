<template>
  <v-app-bar dense dark app class="app-header">
    <v-toolbar-title>
      <div class="logo">
        <img :src="logoSrc" alt="logo">
      </div>
    </v-toolbar-title>
    <v-toolbar-title class="app-header__title" @click="handleIconClick">
      <!-- <router-link to="/">UniSnips</router-link> -->
      UniSnips
    </v-toolbar-title>

    <v-toolbar-items class="app-header__actions">
      <v-menu
        v-model="snippetPopoverVisible"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn v-on="on">
            Load Example Snippets
          </v-btn>
        </template>

        <v-card dark>
          <v-list v-for="(group, index) in exampleGroups" :key="index" subheader>
            <v-subheader>{{ group.name }}</v-subheader>
            <v-list-item v-for="item in group.items" :key="item.name"
              dense
              @click="handleExampleItemClick(item)"
            >
              <v-list-item-content>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-toolbar-items>
    <v-snackbar
      v-model="snackbarShow"
      :timeout="2000"
      color="red"
    >
      {{ snackbarContent }}
    </v-snackbar>
  </v-app-bar>
</template>

<style lang="scss">
.app-header {
  background-color: #212121 !important;

  .v-toolbar__title {
    cursor: pointer;
  }

  .logo {
    width: 1.5em;
    height: 1.5em;
    margin-right: 10px;

    img {
      max-height: 100%;
      border-radius: 4px;
    }
  }
}

.app-header__title {
  margin-right: 10px;
}

.app-header__actions {
  .v-btn {
    text-transform: none;
  }
}
</style>

<script lang="ts">
import { Component, Prop, Watch } from 'vue-property-decorator'
import Vue from 'vue'
import { SHP } from 'src/util/paths'

import { EXAMPLES, VIM_SNIPPETS_EXAMPLES } from 'src/settings/example'
import { SnippetSourceItem } from 'src/store/type'

@Component({

})
export default class AppHeader extends Vue {
  logoSrc = SHP('img/icons/icon.svg')

  snackbarContent = ''
  snackbarShow = false

  snippetPopoverVisible = false

  exampleCache = new Map<string, string>()

  exampleGroups = [
    {
      name: 'unisnips',
      items: EXAMPLES,
    },
    {
      name: 'vim-snippets',
      items: VIM_SNIPPETS_EXAMPLES.map((item) => {
        return {
          ...item,
        }
      })
    },
  ]

  handleIconClick() {
    if (this.$route.name !== 'home') {
      this.$router.push({ name: 'home' })
    }
  }

  loadExampleItemContent(item: SnippetSourceItem) {
    const { remoteUrl, name } = item
    return new Promise((resolve, reject) => {
      if (item.content) {
        return resolve(item.content)
      }
      if (remoteUrl) {
        if (this.exampleCache.get(remoteUrl)) {
          return resolve(this.exampleCache.get(remoteUrl))
        }
        fetch(remoteUrl).then(res => res.text())
          .then((text) => {
            this.exampleCache.set(remoteUrl, text)
            resolve(text)
          }).catch(reject)
      } else {
        reject()
      }
    })
  }

  handleExampleItemClick(item: SnippetSourceItem) {
    this.loadExampleItemContent(item)
      .then((content) => {
        // console.log('text', text)
        const sourceItem = {
          ...item,
          content,
        }
        this.$store.commit('SET_SNIPPET_SOURCE_ITEM', sourceItem)
      }).catch(() => {
        this.showNotification(`Error loading: ${item.name}`)
      })
  }

  showNotification(content: string) {
    this.snackbarShow = true
    this.snackbarContent = content
  }
}
</script>