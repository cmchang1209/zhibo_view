<template>
  <div class="video-player" :id="'video-player-'+roomId+'-'+chanel">
    <div v-if="status !== 1" class="no-video" :id="'no-video-'+chanel">
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import Worker from "worker-loader!@/assets/js/worker"
export default {
  name: 'VideoPlayer',
  props: ['roomId', 'chanel', 'mute'],
  sockets: {
    chanelInfo(val) {
      if (val.roomId === this.roomId && val.chanel === this.chanel) {
        if (val.data.length > 0) {
          if (val.data[0].status === 1 && val.data[0].dev_name !== null) {
            this.port = val.data[0].port_no
            this.usb_id = val.data[0].usb_id
            this.d_type = val.data[0].type /*cam or screen*/
            if (this.d_type !== 1 && this.mute === 0 && this.usb_id === 3) {
              var url = `ws://${document.location.hostname}:${this.port + 1}/`
              this.audioPlayer = new JSMpeg.Player(url, { autoplay: true })
            }
            this.play()
          }
        }
      }
    },
    changeChanelStatus(val) {
      if (val.roomId === this.roomId && val.chanel === this.chanel) {
        switch (val.status) {
          case 1:
            if (val.data.length > 0 && val.data[0].status === 1) {
              this.port = val.data[0].port_no
              this.play()
            }
            break
          case 2:
            if (this.status === 1) {
              this.status = ''
              this.worker.postMessage({
                type: 'destroy'
              })
            }
            break
        }
      }
    },
    changeMuteStatus(val) {
      if (this.d_type !== 1 && this.usb_id === 3 && val.data.changedRows === 1) {
        if (val.type === 1) {
          if (this.audioPlayer !== null) this.audioPlayer.destroy()
          this.audioPlayer = null
        } else {
          var url = `ws://${document.location.hostname}:${this.port + 1}/`
          this.audioPlayer = new JSMpeg.Player(url, { autoplay: true })
        }
      }
    }
  },
  data() {
    return {
      worker: null,
      status: '',
      video: null,
      canvas: null,
      oc: null,
      port: null,
      audioPlayer: null,
      usb_id: null,
      d_type: null
    }
  },
  created() {
    this.worker = new Worker()
    this.$socket.client.emit('getChanelInfo', { roomId: this.roomId, chanel: this.chanel })
    this.worker.onmessage = (evt) => {
      const data = evt.data
      switch (data.type) {
        case 'play':
          this.status = 1
          break
        case 'destroy':
          this.destroy()
          break
      }
    }
  },
  computed: {},
  mounted() {},
  methods: {
    play() {
      var port = this.port + 1
      this.video = document.getElementById(`video-player-${this.roomId}-${this.chanel}`)
      this.canvas = document.createElement("CANVAS")
      this.canvas.classList.add("canvas")
      this.video.appendChild(this.canvas)
      this.oc = this.canvas.transferControlToOffscreen()
      this.worker.postMessage({
        type: 'create',
        data: {
          canvas: this.oc,
          url: `ws://${document.location.hostname}:${port}/`
        }
      }, [this.oc])
    },
    destroy() {
      if (this.audioPlayer !== null) this.audioPlayer.destroy()
      this.audioPlayer = null
      this.status = ''
      if (this.canvas === null) return
      this.canvas.remove()
      this.canvas = null
      this.oc = null
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

  .no-video {
    margin: 15px;
    position: absolute;
    z-index: 10;
    width: calc(100%-15px);
    height: calc(100%-15px);
    background-image: url('../assets/img/no-video.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }

}

</style>
