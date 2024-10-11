<!-- Counter component contains a button to increment as well as the current count -->

<template>
  <center>
    <span class="count">{{ count }} </span>
    <br>
    <button class="incrementor" @click="increment()">Increment</button>
  </center>
</template>

<script>
import { ref } from 'vue';

let count = 0;

export default {
  data() {
    return {
      count: 0
    }
  },

  methods: {
    increment() {
      count++
      this.count = count
    }
  }

}

</script>

<style>
</style>
