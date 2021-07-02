<template>
  <div class="home">
    <div class="header">
      <div class="h_left">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,572,77">
          <image xlink:href="../assets/img/logo.png" height="100%" />
          <text x="100" y="60" font-size="48" fill="#fff" letter-spacing="3">FIDO ONLINE</text>
        </svg>
      </div>
      <div class="h_center">
      </div>
      <div class="h_right">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,572,77">
          <text x="571" y="60" text-anchor="end" font-size="48" fill="#fff" letter-spacing="3">
            {{ today }}
          </text>
        </svg>
      </div>
    </div>
    <div v-if="type === 1" :class="['template-'+type, 'template-warp']">
      <T1 :roomId="id" :mute="mute" :url="url" />
    </div>
    <div v-if="type === 3" :class="['template-'+type, 'template-warp']">
      <T3 :roomId="id" :mute="mute" :url="url" />
    </div>
    <div v-else-if="type === 4" :class="['template-'+type, 'template-warp']">
      <T4 :roomId="id" :mute="mute" :url="url" />
    </div>
    <div v-else-if="type === 5" :class="['template-'+type, 'template-warp']">
      <T5 :roomId="id" :mute="mute" :url="url" />
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import T5 from '@/components/template/T5.vue'
import T4 from '@/components/template/T4.vue'
import T3 from '@/components/template/T3.vue'
import T1 from '@/components/template/T1.vue'
export default {
  name: 'Home',
  components: {
    T1,
    T3,
    T4,
    T5
  },
  props: ['no', 'url'],
  sockets: {
    connect() {
      this.$socket.client.emit('getRoomData', { no: this.no })
    },
    roomData(val) {
      console.log(val)
      this.id = val[0].id
      this.type = val[0].type
      this.mute = val[0].mute
    }
  },
  data() {
    return {
      id: '',
      type: '',
      mute: ''
    }
  },
  created() {
    var u = navigator.userAgent
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    console.log(u)
  },
  computed: {
    today() {
      return (new Date()).toString().split(' ').splice(1,3).join(' ')
    }
  },
  methods: {}
}
/* eslint-enable */

</script>
<style scoped lang="scss">
.home {
  height: calc(100vw * 9/16);
}
.header {
  width: calc(100% - 2vw);
  margin-left: 1vw;
  padding: .5vw 0;
  height: 4vw;

  .h_left,
  .h_center,
  .h_right {
    height: 100%;
    position: relative;
  }

  .h_left {
    width: 30%;
    float: left;
  }

  .h_center {
    width: 40%;
    float: left;
  }

  .h_right {
    width: 30%;
    float: right;
  }
}

</style>
