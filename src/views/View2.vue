<template>
  <div class="view">
    <template v-if="data.data && data.data.length > 0">
      <table>
        <tbody>
          <tr>
            <td colspan="2">
              <el-row type="flex" justify="space-between" style="padding: 1.25rem">
                <el-col :span="6" style="text-align: left;">
                  <!-- <template v-if="mute">
                    <el-button type="success" icon="el-icon-thirdaudiohigh" circle @click="mute=false"></el-button>
                  </template>
                  <template v-else>
                    <el-button type="success" icon="el-icon-thirdaudio-mute" circle @click="mute=true"></el-button>
                  </template> -->
                </el-col>
                <el-col :span="12" style="text-align: center;">
                  <h1 style="margin: 0">{{ name }}</h1>
                </el-col>
                <el-col :span="6" class="logo">
                </el-col>
              </el-row>
            </td>
          </tr>
          <!-- <tr>
            <td class="left top">
              <Player :piId="pi_id" :port="1" :mute="mute" />
            </td>
            <td rowspan="2" class="right">
              <Player :piId="pi_id" :port="3" :mute="mute" />
            </td>
          </tr>
          <tr>
            <td class="left bottom">
              <Player :piId="pi_id" :port="2" :mute="mute" />
            </td>
          </tr> -->
        </tbody>
      </table>
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
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-image: url('../assets/img/obs_bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

table {
  border-spacing: 0px;
  width: 100%;

  .logo {
    background-image: url('../assets/img/bottom_logo.png');
    background-position: right center;
    background-repeat: no-repeat;
    background-size: auto 100%;
  }

  td {
    text-align: center;
    vertical-align: middle;

    &.left {
      width: 640px;
      border-left: 1px solid #121820;
    }

    &.top {
      height: 480px;
      border-top: 1px solid #121820;
    }

    &.bottom {
      height: 360px;
      border-bottom: 1px solid #121820;
    }

    &.right {
      width: 1066px;
      height: 800px;
      border-right: 1px solid #121820;
      border-top: 1px solid #121820;
      border-bottom: 1px solid #121820;
    }
  }
}

</style>
