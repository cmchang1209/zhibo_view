<template>
  <div class="player">
    <div class="header">
      <div class="h_left">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,572,77">
          <image xlink:href="../assets/img/logo.png" height="100%" />
          <text x="100" y="60" font-size="48" fill="#fff" letter-spacing="3">FIDO ONLINE</text>
        </svg>
      </div>
      <div class="h_center">
        <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,761.6,77">
          <text x="385.8" y="42" text-anchor="middle" font-size="40" letter-spacing="3" fill="#009ce6">
            <tspan>第1場 SET1</tspan>
          </text>
          <text x="385.8" y="72" text-anchor="middle" font-size="24" letter-spacing="3" fill="#fff">
            <tspan>501(OI/DO)</tspan>
            <tspan> / CRICKET </tspan>
            <tspan> / 501(OI/DO)</tspan>
          </text>
        </svg> -->
      </div>
      <div class="h_right">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,572,77">
          <text x="571" y="60" text-anchor="end" font-size="48" fill="#fff" letter-spacing="3">
            {{ today }}
          </text>
        </svg>
      </div>
    </div>
    <div class="wap">
      <div class="inner left">
        <div id="video-player1" class="player1"></div>
        <div id="video-player0" class="player0"></div>
      </div>
      <div class="inner right">
        <div id="video-player2" class="player2"></div>
      </div>
    </div>
    <div class="footer">
      <!-- <div class="f_left">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,304,163">
          <image xlink:href="../assets/img/ad.png" height="100%" />
        </svg>
      </div>
      <div class="f_right">
        <div class="home inner">
          <team :type="'home'" :store="'紅心樂透吧'" :player="'詹斯強'" />
        </div>
        <div class="score inner">
          <score :set="9" />
        </div>
        <div class="away inner">
          <team :type="'away'" :store="'S.D.C.'" :player="'葉致宏'" />
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import Worker from "worker-loader!@/assets/js/worker"
import Score from '@/components/Score.vue'
import Team from '@/components/Team.vue'
export default {
  name: 'Player',
  components: {
    Score,
    Team
  },
  props: ['port', 'port1', 'port2', 'url', 'pi_id'],
  sockets: {
    connect() { console.log('connect') },
    piDataEcho(val) {
      console.log(val)
      this.data = val.data[0]
      this.data.port.map(iteam => {
        if (iteam.usb_id !== 4) {
          if (iteam.usb_id - 1 === 0 && typeof this.port === "undefined") {
            this.portData[iteam.usb_id - 1] = iteam.port_no - 1
          }
          if (iteam.usb_id - 1 === 1 && typeof this.port1 === "undefined") {
            this.portData[iteam.usb_id - 1] = iteam.port_no - 1
          }
        } else {
          if (typeof this.port2 === "undefined") {
            this.portData[2] = iteam.port_no - 1
          }
        }
      })
      if (typeof this.url !== "undefined" && this.url === 'localhost') {
        this.wsUrl = this.data.ip
        this.portData = [8001, 8003, 8005]
      }
      this.run(2)
    }
  },
  data() {
    return {
      video: [null, null, null],
      canvas: [null, null, null],
      player: [null, null, null],
      oc: [null, null, null],
      worker: [null, null, null],
      data: [],
      portData: [null, null, null],
      wsUrl: null,
      isiOS: true,
      mute: false,
      audioPlayer: [null, null, null]
    }
  },
  created() {
    if (typeof this.pi_id !== "undefined") {
      this.$socket.client.emit('getPiData', { id: this.pi_id })
    }
    var u = navigator.userAgent
    this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if (typeof this.port !== "undefined") {
      this.portData[0] = this.port - 1
    }
    if (typeof this.port1 !== "undefined") {
      this.portData[1] = this.port1 - 1
    }
    if (typeof this.port2 !== "undefined") {
      this.portData[2] = this.port2 - 1
    }
  },
  mounted() {
    if (typeof this.url === "undefined") {
      this.wsUrl = document.location.hostname
    }

    if (typeof this.pi_id === "undefined") {
      this.run(2)
    }

  },
  computed: {
    today() {
      return (new Date()).toString().split(' ').splice(1, 3).join(' ')
    }
  },
  methods: {
    run(i) {
      if (i === 2) {
        if (this.isiOS) {
          this.playIos(i)
        } else {
          this.play(i)
        }
      } else {
        if (i < 0) return false
        setTimeout(() => {
          if (this.isiOS) {
            this.playIos(i)
          } else {
            this.play(i)
          }
        }, 1000)
      }
    },
    play(i) {
      let url = `ws://${this.wsUrl}:${this.portData[i] + 1}`
      this.video[i] = document.getElementById(`video-player${i}`)
      this.canvas[i] = document.createElement("CANVAS")
      this.video[i].appendChild(this.canvas[i])
      if (!this.mute && i === 0) {
        this.audioPlayer[i] = new JSMpeg.Player(url, {
          audioBufferSize: 0,
          pauseWhenHidden: false,
          onAudioDecode(decoder, time) {
            console.log(time)
          }
        })
      }
      this.oc[i] = this.canvas[i].transferControlToOffscreen()
      this.worker[i] = new Worker()
      this.worker[i].postMessage({
        type: 'create',
        data: {
          canvas: this.oc[i],
          url: url
        }
      }, [this.oc[i]])
      /*if (i === 0) {
        this.player[i] = new JSMpeg.Player(
          url, {
            canvas: this.canvas[i],
            autoplay: true,
            disableGl: true,
            disableWebAssembly: true,
            pauseWhenHidden: false,
            videoBufferSize: 10 * 1024 * 1024
            onAudioDecode(decoder, time) {
              console.log(time)
            }
          }
        )
      } else {
        this.oc[i] = this.canvas[i].transferControlToOffscreen()
        this.worker[i] = new Worker()
        this.worker[i].postMessage({
          type: 'create',
          data: {
            canvas: this.oc[i],
            url: url
          }
        }, [this.oc[i]])
      }*/
      i--
      this.run(i)
    },
    playIos(i) {
      let url = `ws://${this.wsUrl}:${this.portData[i] + 1}`
      /*if (!this.mute && i === 0) {
        this.audioPlayer[i] = new JSMpeg.Player(url, {
          autoplay: true,
          video: false,
          onAudioDecode(decoder, time) {
            console.log(time)
          }
        })
      }*/
      let audio = false
      if (i === 0) {
        audio = true
      }
      this.video[i] = document.getElementById(`video-player${i}`)
      this.canvas[i] = document.createElement("CANVAS")
      this.video[i].appendChild(this.canvas[i])
      this.player[i] = new JSMpeg.Player(
        url, {
          canvas: this.canvas[i],
          audio: audio,
          disableGl: true,
          disableWebAssembly: true,
          pauseWhenHidden: false,
          //videoBufferSize: 10 * 1024 * 1024
        }
      )
      i--
      this.run(i)
    }
  },
  beforeDestroy() {
    this.player[0].destroy()
    this.player[1].destroy()
    this.player[2].destroy()
    this.player = [null, null, null]
    this.canvas[0].remove()
    this.canvas[1].remove()
    this.canvas[2].remove()
    this.canvas = [null, null, null]
    this.video = [null, null, null]
    this.audioPlayer[0].destroy()
    this.audioPlayer = [null, null, null]
    this.data = []
  }
}
/* eslint-enable */

</script>
<style scoped lang="scss">
/* @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap'); */


.player {
  height: calc(100vw * 9/16);
  /* font-family: 'Oswald', 'Noto Sans TC', sans-serif !important;
  height: calc(100vw * 9/16);
  max-width: 1920px;
  background-image: url('../assets/img/obs_bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  font-weight: 700;
  position: relative; */

  svg {
    width: 100%;
    height: 100%;
    position: absolute;
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

  .wap {
    position: absolute;
    width: calc(100% - 1vw);
    height: calc(100vw * 0.417);
    /* 100vw*9/16*74% */
    left: .5vw;
    top: calc(100vw * 0.05);

    .inner {
      &.left {
        width: 31.55%;
        height: 100%;
        position: absolute;

        .player1 {
          width: 100%;
          height: 56%;
          box-sizing: border-box;
          border: 1px solid white;
          position: absolute;
          display: flex;
          justify-content: center;
          overflow: hidden;
        }

        .player0 {
          width: 100%;
          height: 42.16%;
          box-sizing: border-box;
          border: 1px solid white;
          position: absolute;
          bottom: 0px;
          display: flex;
          justify-content: center;
          overflow: hidden;
        }
      }

      &.right {
        width: 68.45%;
        height: 100%;
        position: absolute;
        right: 0;

        .player2 {
          width: 99%;
          height: 100%;
          box-sizing: border-box;
          border: 1px solid white;
          position: absolute;
          right: 0;
          display: flex;
          justify-content: center;
          overflow: hidden;
        }
      }
    }
  }

  .footer {
    width: calc(100% - .6vw);
    margin-left: .3vw;
    padding: .5vw 0;
    height: 8.25vw;
    position: absolute;
    bottom: 0;

    .f_left,
    .f_right {
      position: relative;
      height: 100%;
    }

    .f_left {
      width: 16%;
      float: left;
    }

    .f_right {
      width: 84%;
      float: right;

      .inner {
        position: relative;
        height: 100%;
        float: left;
      }

      .home,
      .away {
        width: 28%;
      }

      .score {
        width: 43%;
        margin: 0 .5%;
      }
    }
  }
}

</style>
