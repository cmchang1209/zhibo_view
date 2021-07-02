<template>
  <div :id="'video-player-'+chanel" class="canvas-wap">
  </div>
</template>
<script>
/* eslint-disable */
import Worker from "worker-loader!@/assets/js/worker"
export default {
  name: 'Player',
  components: {},
  props: ['roomId', 'chanel', 'mute', 'size'],
  sockets: {
    connect() { console.log('connect') },
    chanelInfo(val) {
      console.log(val)
      if (val.roomId === this.roomId && val.chanel === this.chanel) {
        if (val.data.length > 0) {
          if (val.data[0].status === 1 && val.data[0].dev_name !== null) {
            this.port = val.data[0].port_no + this.size * 2
            this.usb_id = val.data[0].usb_id
            if (typeof this.url !== "undefined" && this.url === 'localhost') {
              this.wsUrl = val.data[0].ip
              var localPort = [
                [8002, 9002],
                [8004, 9004],
                [22, null],
                [8006, 9006]
              ]
              this.port = localPort[this.usb_id - 1][this.size]
            }
            if (this.isiOS) {
              this.iosPlay()
            } else {
              this.iosPlay()
            }
          }
        }
      }
    },
  },
  data() {
    return {
      worker: null,
      video: null,
      canvas: null,
      oc: null,
      port: null,
      audioPlayer: null,
      usb_id: null,
      d_type: null,
      wsUrl: null
    }
  },
  created() {
    var u = navigator.userAgent
    this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if (typeof this.url === "undefined") {
      this.wsUrl = document.location.hostname
    }
    this.$socket.client.emit('getChanelInfo', { roomId: this.roomId, chanel: this.chanel })
  },
  mounted() {},
  methods: {
    play() {
      let url = `ws://${this.wsUrl}:${this.port}`
      if (this.usb_id === 1) {
        this.audioPlayer = new JSMpeg.Player(url, { autoplay: true, video: false })
      }
      this.video = document.getElementById(`video-player-${this.chanel}`)
      this.canvas = document.createElement("CANVAS")
      this.video.appendChild(this.canvas)
      this.oc = this.canvas.transferControlToOffscreen()
      this.worker = new Worker()
      this.worker.postMessage({
        type: 'create',
        data: {
          canvas: this.oc,
          url: url
        }
      }, [this.oc])
    },
    iosPlay() {
      let url = `ws://${this.wsUrl}:${this.port}`
      /*if (this.usb_id === 1) {
        this.audioPlayer = new JSMpeg.Player(url, { autoplay: true, video: false })
      }*/
      this.video = document.getElementById(`video-player-${this.chanel}`)
      this.canvas = document.createElement("CANVAS")
      this.video.appendChild(this.canvas)
      this.player = new JSMpeg.Player(
        url, {
          canvas: this.canvas,
          autoplay: true,
          pauseWhenHidden: false,
          onAudioDecode(decoder, time) {
            console.log(time)
          }
        }
      )
    }
  },
  beforeDestroy() {
    this.player.destroy()
    this.player = null
    this.canvas.remove()
    this.canvas = null
    this.video = null
    this.audioPlayer.destroy()
    this.audioPlayer = null
  }
}
/* eslint-enable */

</script>
<style scoped lang="scss">
.canvas-wap {
  box-sizing: border-box;

}

</style>
