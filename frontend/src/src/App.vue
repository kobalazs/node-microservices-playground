<template>
  <div id="app">
    <div id="sidebar">
      <BasketComponent />
    </div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import BasketComponent from './components/BasketComponent'

export default {
  name: 'App',
  components: {
    BasketComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#sidebar {
  float: right;
  width: 30%;
  margin-bottom: 0;
  background-color: lightgray;
}
</style>
