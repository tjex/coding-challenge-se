<template>
  <span class="count">{{ count }} </span>
  <br>
  <button class="incrementor" @click="increment()">Increment</button>
</template>

<script>
import { socket } from '@/socket'

export default {
  data() {
    return {
      count: 0
    }
  },
  created() {
    socket.on('updateCount', (count) => {
      this.count = count;
    })
  },

  methods: {
    increment() {
      socket.emit('increment', 1)
    }
  }

}

</script>
