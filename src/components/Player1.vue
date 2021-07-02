<template>
  <div class="video-player" :id="'video-player-' + id + '-' + usb">
  </div>
</template>
<script>
/* eslint-disable */
import Worker from "worker-loader!@/assets/js/worker1"
export default {
  name: 'Player',
  props: ['id', 'usb', 'datas'],
  data() {
    return {
      data: null,
      isiOS: false,
      intervalId: null,
      worker: null,
      video: null,
      canvas: null,
      oc: null,
      audioPlayer: null
    }
  },
  created() {
    var u = navigator.userAgent
    this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  },
  mounted() {
    this.intervalId = setInterval(() => {
      if (this.data) {
        clearInterval(this.intervalId)
        this.intervalId = null
        let usb = this.usb * 1
        let ports = this.data.port.find(iteam => {
          return iteam.usb_id === usb
        })
        let port = ports.port_no
        if (usb !== 4) {
          port = ports.port_no + 2
        }
        let url = `ws://videostream.fidodarts.com:${port}`
        this.video = document.getElementById(`video-player-${this.id}-${this.usb}`)
        this.canvas = document.createElement("CANVAS")
        this.video.appendChild(this.canvas)
        if (this.isiOS) {
          this.iosPlay(usb, url, this.data.audio)
        } else {
          this.worker = new Worker()
          this.worker.onmessage = (evt) => {
            const data = evt.data
            switch (data.type) {
              case 'play':
                break
              case 'destroy':
                break
            }
          }
          this.play(usb, url, this.data.audio)
        }
      }
    }, 1000);
  },
  methods: {
    play(usb, url, audio) {
      if (usb === 1 && audio === 1) {
        this.audioPlayer = new JSMpeg.Player(url, {
          audioBufferSize: 0,
          pauseWhenHidden: false,
          onAudioDecode(decoder, time) {
            console.log(time)
          }
        })
      }
      this.oc = this.canvas.transferControlToOffscreen()
      this.worker.postMessage({
        type: 'create',
        data: {
          canvas: this.oc,
          url: url
        }
      }, [this.oc])

    },
    iosPlay(usb, url, audio) {
      let playAudio = false
      if (usb === 1 && audio === 1) {
        playAudio = true
      }
      this.oc = new JSMpeg.Player(
        url, {
          canvas: this.canvas,
          audio: playAudio,
          autoplay: true,
          disableGl: true,
          disableWebAssembly: true,
          pauseWhenHidden: false,
          videoBufferSize: 10 * 1024 * 1024,
          onAudioDecode(decoder, time) {
            console.log(time)
          }
        }
      )
    }
  },
  watch: {
    datas(n, o) {
      this.data = n
    }
  }
}
/* eslint-enable */

</script>
<style scoped lang="scss">
</style>
