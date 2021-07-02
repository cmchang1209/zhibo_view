<template>
  <div class="work">
    <!-- <el-row>
      <el-col :span="6">AWS</el-col>
      <el-col :span="6"><el-link type="primary" @click.native.prevent="changeVideo()">機台螢幕</el-link></el-col>
      <el-col :span="6"><el-link type="primary">靶</el-link></el-col>
      <el-col :span="6"><el-link type="primary">鏢手</el-link></el-col>
    </el-row>
    <el-row>
      <el-col :span="6">Local</el-col>
      <el-col :span="6"><el-link type="primary">機台螢幕</el-link></el-col>
      <el-col :span="6"><el-link type="primary">靶</el-link></el-col>
      <el-col :span="6"><el-link type="primary">鏢手</el-link></el-col>
    </el-row> -->
    <el-row>
      <el-col :span="24">
        <Player :id="pi" :usb="usb" :datas="data" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
/* eslint-disable */
import Player from '@/components/Player1.vue'
export default {
  components: {
    Player
  },
  props: ['id', 'usb'],
  sockets: {
    connect() {
      this.$socket.client.emit('getPiData', { id: this.id })
    },
    piDataEcho(val) {
      this.data = val.data[0]
    }
  },
  data() {
    return {
      data: {
        pi: this.id,
        usb: this.usb
      }
    }
  },
  computed: {},
  created() {}
}
/* eslint-enable */

</script>
<style lang="scss">
.work {
  width: 100vw;
  height: 100vh;
  color: white;
  text-align: center;

  .el-row {
    //padding: 20px 0;
    .el-link {
      font-size: 1rem;
    }
  }

  canvas {
    max-width: 100% !important;
  }
}

</style>
