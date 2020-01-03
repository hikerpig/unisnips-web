<template>
  <div id="app">
    <nav id="nav">
      <div class="logo">
        UniSnips
      </div>
      <router-link to="/">Converter</router-link>
      <!-- <router-link to="/about">About</router-link> -->
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "src/styles/common.scss";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;

  .logo {
    padding-right: 20px;
  }

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
