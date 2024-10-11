<template>
  <center>
    <span class="count">{{ count }} </span>
    <br>
    <button class="incrementor" @click="increment()">Increment</button>
  </center>
</template>

<script>
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
