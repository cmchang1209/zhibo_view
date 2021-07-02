<template>
  <div class="video-player" :id="'video-player-' + piId + '-' + port">
    <div v-if="status !== 1" class="no-video" :id="'no-video-' + port">
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import Worker from "worker-loader!@/assets/js/worker"
export default {
  name: 'Player',
  props: ['piId', 'port', 'mute'],
  sockets: {
    connect() {},
    portInfoEcho(val) {
      if (val.port === this.port) {
        if (val.data.length > 0) {
          if (val.data[0].dev_name !== null) {
          	this.type = val.data[0].type
          	this.port_no = val.data[0].port_no
          	this.url = `ws://${document.location.hostname}:${this.port_no + 1}/`
            this.play()
          }
        }
      }
    }
  },
  data() {
    return {
      worker: null,
      video: null,
      canvas: null,
      oc: null,
      type: null,
      port_no: null,
      url: null,
      intervalId: null,
      status: 0,
      audioPlayer: null
    }
  },
  created() {
    this.$socket.client.emit('getPortInfo', { id: this.piId, port: this.port })
    this.worker = new Worker()
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
      if (this.type !== 1 && !this.mute && this.port === 4) {
        this.audioPlayer = new JSMpeg.Player(this.url, { autoplay: true })
      }
      this.video = document.getElementById(`video-player-${this.piId}-${this.port}`)
      this.canvas = document.createElement("CANVAS")
      this.canvas.classList.add("canvas")
      this.video.appendChild(this.canvas)
      this.oc = this.canvas.transferControlToOffscreen()
      this.worker.postMessage({
        type: 'create',
        data: {
          canvas: this.oc,
          url: this.url
        }
      }, [this.oc])
    },
    destroy() {
      if (this.audioPlayer !== null) this.audioPlayer.destroy()
      this.audioPlayer = null
      this.status = 0
      if (this.canvas === null) return
      this.canvas.remove()
      this.canvas = null
      this.oc = null
    }
  },
  watch: {
    mute(val, old) {
      if(val) {
      	if (this.audioPlayer !== null) { 
      		this.audioPlayer.destroy()
      		this.audioPlayer = null
      	}
      } else {
      	if (this.audioPlayer === null && this.port === 3 && this.type !== 1) {
      		this.audioPlayer = new JSMpeg.Player(this.url, { autoplay: true })
      	}
      }
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
