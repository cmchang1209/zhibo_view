<template>
  <div class="home">
    <div v-if="type === 4" :class="'template-'+type">
      <T4 :roomId="id" :type="type" />
    </div>
    <div v-else-if="type === 5" :class="'template-'+type">
      <T5 :roomId="id" :type="type" />
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import T5 from '@/components/template/T5.vue'
import T4 from '@/components/template/T4.vue'
export default {
  name: 'Home',
  components: {
    T4,
    T5
  },
  props: ['no'],
  sockets: {
    connect() {
      this.$socket.client.emit('getRoomData', { no: this.no })
    },
    roomData(val) {
      this.id = val[0].id
      this.type = val[0].type
    }
  },
  data() {
    return {
      id: '',
      type: ''
    }
  },
  created() {},
  methods: {
    url(port) {
      port = port + 1
      return `ws://${document.location.hostname}:${port}/`
    }
  }
}

</script>
<style scoped lang="scss">
</style>
/* eslint-enable */
