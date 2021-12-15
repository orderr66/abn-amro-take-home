<template>
  <TreeComponent :key="this.componentKey" @increase-id="componentKey"/>
</template>

<script>
import TreeComponent from './components/TreeComponent.vue'

export default {
  name: 'App',
  components: {
    TreeComponent
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
