<template>
  <div class="view">
    <template v-if="data.data && data.data.length > 0">
      <el-row type="flex" justify="space-between" style="width: 100%">
        <el-col :span="6" style="text-align: left;">
        </el-col>
        <el-col :span="12" style="text-align: center;">
          <h1 style="margin: 0; font-size: 48px;">{{ name }}</h1>
        </el-col>
        <el-col :span="6" class="logo">
        </el-col>
      </el-row>
      <el-row type="flex" style="width: 100%" class="video">
        <el-col style="width: 100px;"></el-col>
        <el-col style="width: 640px;">
          <div class="left top">
            <Player :piId="pi_id" :port="2" :mute="mute" />
          </div>
          <div class="left bottom">
            <Player :piId="pi_id" :port="1" :mute="mute" />
          </div>
        </el-col>
        <el-col style="margin-left: 14px; width: 1066px;">
          <div class="right">
            <Player :piId="pi_id" :port="4" :mute="mute" />
          </div>
        </el-col>
        <el-col style="width: 100px;"></el-col>
      </el-row>
      <el-row type="flex" style="width: 100%" align="middle" class="name">
        <el-col :span="3"></el-col>
        <el-col :span="7">
          <div class="home" style="text-align: center;">
            <h1>紅心樂透吧</h1>
          </div>
        </el-col>
        <el-col :span="4" style="text-align: center;">
          <h1>VS</h1>
        </el-col>
        <el-col :span="7">
          <div class="away" style="text-align: center;">
            <h1>SOFA Bistro</h1>
          </div>
        </el-col>
        <el-col :span="3"></el-col>
      </el-row>
    </template>
    <template v-else>
      <h3>No matching data</h3>
    </template>
  </div>
</template>
<script>
/* eslint-disable */
import Player from '@/components/Player.vue'
export default {
  name: 'View',
  components: {
    Player
  },
  props: ['pi_id'],
  sockets: {
    connect() {
      this.$socket.client.emit('getPiData', { id: this.pi_id })
    },
    piDataEcho(val) {
      this.data = val
    }
  },
  data() {
    return {
      mute: false,
      data: [],
      isiOS: false
    }
  },
  created() {
    var u = navigator.userAgent
    this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  },
  computed: {
    name() {
      return '2021 FIDO 台北聯賽'
      /*if (this.data.data) {
        if (this.data.data[0].s_name) return `${this.data.data[0].s_name} / ${this.data.data[0].fidoStoreId}`
        return this.data.data[0].name
      } else {
        return ''
      }*/
    }
  },
  mounted() {},
  methods: {}
}
/* eslint-enable */

</script>
<style scoped lang="scss">
.view {
  width: 100vw;
  height: 100vh;
  min-width: 1920px;
  min-height: 1080px;
  background-image: url('../assets/img/obs_bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 1.25rem;
  box-sizing: border-box;

  .logo {
    background-image: url('../assets/img/bottom_logo.png');
    background-position: right center;
    background-repeat: no-repeat;
    background-size: auto 100%;
  }

  .name {
    h1 {
      margin: 0;
      font-size: 48px;
      letter-spacing: .75rem;
      margin-left: .75rem;
    }
  }

  .home,
  .away {
    width: 100%;
    border: 4px solid white;
    margin: 0 auto;
    border-radius: .5rem;
    padding: .75rem 0;
  }

  .home {
    background-color: #fd032f;
  }

  .away {
    background-color: #00adff;
  }

  .video {
    margin-top: 20px;
    height: calc(100%-191px);

    .right {
      height: 800px;
    }

    .top {
      height: 440px;
      overflow: hidden;
    }

    .bottom {
      height: 360px;
    }
  }
}

</style>
