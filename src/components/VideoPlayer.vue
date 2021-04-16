<template>
  <div class="video-player" :id="'video-player-'+roomId+'-'+chanel">
    <!-- <canvas v-show="p_status === 1 && c_status >= 2" :id="'video-canvas-'+chanel" class="hide"></canvas> -->
    <template v-if="p_status === 1 && c_status === 1">
      <h1>On standby</h1>
      <ul>
        <li>Equipment Name : {{ e_name }}</li>
        <li>Image Source Name : {{ c_name }}</li>
        <li>port : {{ port }}</li>
      </ul>
    </template>
    <h1 v-else-if="p_status === null && c_status === null">No Video</h1>
    <div v-else-if="p_status === 1 && c_status >= 2" class="loading" :id="'loading-'+chanel"></div>
  </div>
</template>
<script>
/* eslint-disable */
import Worker from "worker-loader!@/assets/js/worker"
export default {
  name: 'VideoPlayer',
  props: ['roomId', 'chanel'],
  sockets: {
    chanelInfo(val) {
      if (val.me.roomId === this.roomId && val.me.chanel === this.chanel) {
        if (val.data.length > 0) {
          this.p_status = val.data[0].p_status
          this.c_status = val.data[0].c_status
          this.e_name = val.data[0].name
          var content = JSON.parse(val.data[0].content)
          var c = content.filter((item) => {
            return item.usb_id === val.data[0].usb_id
          })
          this.c_name = c[0].name
          this.port = val.data[0].port_no
          if (val.data[0].p_status === 1 && val.data[0].c_status === 2) {
            this.play(val.data[0].port_no + 1)
          }
        } else {
          this.p_status = null
          this.c_status = null
        }
      }
    },
    echoChanelStatus(val) {
      if (val.roomId === this.roomId && val.chanel === this.chanel) {
        this.c_status = val.status
        if (val.status === 2) {
          this.play(val.port + 1)
        }
      }
    }
  },
  data() {
    return {
      worker: null,
      c_status: '',
      p_status: '',
      video: null,
      canvas: null,
      oc: null,
      e_name: null,
      c_name: null,
      port: null
    }
  },
  created() {
    this.worker = new Worker()
    this.$socket.client.emit('getChanelInfo', { roomId: this.roomId, chanel: this.chanel })
  },
  mounted() {
    this.worker.onmessage = (evt) => {
      const data = evt.data
      switch (data.type) {
        case 'hideLodaingIcon':
          setTimeout(() => {
            const loading = document.getElementById(`loading-${this.chanel}`)
            loading.classList.add("hide")
            this.canvas.classList.remove("hide")
          }, 1000)
          break
        case 'ws_erroe':
          this.canvas.remove()
          this.canvas = null
          this.oc = null
          this.$socket.client.emit('changeChanelStatus', { roomId: this.roomId, chanel: this.chanel, status: 1, port: null, from: 'view' })
          break
      }
    }
  },
  methods: {
    play(port) {
      this.video = document.getElementById(`video-player-${this.roomId}-${this.chanel}`)
      this.canvas = document.createElement("CANVAS")
      this.canvas.classList.add("canvas")
      this.canvas.classList.add("hide")
      this.video.appendChild(this.canvas)
      this.oc = this.canvas.transferControlToOffscreen()
      this.worker.postMessage({
        type: 'create',
        data: {
          canvas: this.oc,
          url: `ws://${document.location.hostname}:${port}/`
        }
      }, [this.oc])
    }
  }
}
/* eslint-enable */

</script>
<style scoped lang="scss">
.video-player {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .loading {
    position: absolute;
    z-index: 10;
    width: 100%;
    height: 100%;
    background-image: url('../assets/img/loading.gif');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 20%;
  }

}

</style>
