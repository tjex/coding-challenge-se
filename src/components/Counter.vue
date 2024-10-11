<!-- Counter component contains a button to increment as well as the current count -->

<template>
  <button @click="increment()">Increment</button>
  <br>
  {{ count }}
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
