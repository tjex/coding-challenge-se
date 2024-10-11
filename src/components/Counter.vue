<template>
  <span class="count">{{ count }} </span>
  <br>
  <button class="incrementor" @click="increment()">Increment</button>
</template>

<script>
import { socket } from '../socket.js'
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
        console.log("incremented")
      socket.emit('increment', () => {
        console.log("incremented")
      })
      this.count = count
    }
  }

}

</script>
