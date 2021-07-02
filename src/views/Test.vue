<template>
  <div class="view">
    <div id="video-player2" class="video-player main">
      <div id="video-player1" class="video-player bar"></div>
      <div id="video-player0" class="video-player screen"></div>
      <div class="title">
        <div class="item">
          <div class="sub"></div>
          <div class="sub name">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,672,100">
              <!-- <image xlink:href="../assets/img/badge.png" /> -->
              <text x="768" y="80%" text-anchor="end" font-size="70" lengthAdjust="spacing" textLength="820" stroke="#000" stroke-width="1">2021 FIDO 台北聯賽</text>
            </svg>
          </div>
        </div>
      </div>
      <div class="kanban">
        <img src="../assets/img/logo.png" />
        <div class="item">
          <div class="sub home"></div>
          <div class="sub"></div>
          <div class="sub">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,100,100">
              <text x="15%" y="70%" textLength="70" font-size="70" lengthAdjust="spacing">vs</text>
            </svg>
          </div>
          <div class="sub"></div>
          <div class="sub away"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Worker from "worker-loader!@/assets/js/worker"
export default {
  name: 'Player',
  props: ['port', 'port1', 'port2', 'url', 'pi_id'],
  sockets: {
    connect() { console.log('connect') },
    piDataEcho(val) {
      console.log(val)
      this.data = val.data[0]
      this.data.port.map(iteam => {
        if (iteam.usb_id !== 4) {
          this.portData[iteam.usb_id - 1] = iteam.port_no
        } else {
          this.portData[2] = iteam.port_no
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
      audioPlayer: null
    }
  },
  created() {
    if (typeof this.pi_id !== "undefined") {
      this.$socket.client.emit('getPiData', { id: this.pi_id })
    }
    var u = navigator.userAgent
    this.isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if (typeof this.port !== "undefined") {
      this.portData[0] = this.port
    }
    if (typeof this.port1 !== "undefined") {
      this.portData[1] = this.port1
    }
    if (typeof this.port2 !== "undefined") {
      this.portData[2] = this.port2
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
      if (!this.mute && i === 2) {
        this.audioPlayer = new JSMpeg.Player(url, { autoplay: true, video: false })
      }
      this.video[i] = document.getElementById(`video-player${i}`)
      this.canvas[i] = document.createElement("CANVAS")
      this.video[i].appendChild(this.canvas[i])
      this.oc[i] = this.canvas[i].transferControlToOffscreen()
      this.worker[i] = new Worker()
      this.worker[i].postMessage({
        type: 'create',
        data: {
          canvas: this.oc[i],
          url: url
        }
      }, [this.oc[i]])
      i--
      this.run(i)
    },
    playIos(i) {
      let url = `ws://${this.wsUrl}:${this.portData[i] + 1}`
      if (!this.mute && i === 2) {
        this.audioPlayer = new JSMpeg.Player(url, { autoplay: true, video: false })
      }
      this.video[i] = document.getElementById(`video-player${i}`)
      this.canvas[i] = document.createElement("CANVAS")
      this.video[i].appendChild(this.canvas[i])
      this.player[i] = new JSMpeg.Player(
        url, {
          canvas: this.canvas[i]
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
    this.audioPlayer.destroy()
    this.audioPlayer = null
    this.data = []
  }
}

</script>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap');

.view {
  font-family: 'Oswald', 'Noto Sans TC', sans-serif !important;

  .main {
    width: 100vw;
    overflow-y: hidden;
    position: relative;
    background-color: white;

    canvas {
      margin-bottom: -.25%;
    }

    .bar {
      position: absolute;
      top: .5%;
      left: .5%;
      width: calc(100vw*0.33);
      height: calc(100vw*0.33*0.75);
      background-color: white;
      padding: .5%;
    }

    .screen {
      position: absolute;
      top: calc(100vw*0.33*0.75+3%);
      left: .5%;
      width: calc(100vw*0.33);
      height: calc(100vw*0.33*0.56);
      background-color: white;
      padding: .5%;
    }

    .kanban,
    .title {
      position: absolute;
      left: .5%;
      bottom: .5%;
      width: 99%;
      height: calc(100vw*0.095);
      background-color: rgba(0, 0, 0, .8);
      padding: .5%;
      box-sizing: border-box;
      display: inline-flex;
      flex-direction: row;

      .item {
        display: flex;
        flex-direction: row;
        width: 100%;

        .sub {
          display: flex;
          width: 10%;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .home,
        .away {
          width: 35%;
          background-image: url('../assets/img/home.png');
          background-size: auto 100%;
          background-position-y: .25rem;
          background-position-x: left;
          background-repeat: no-repeat;
        }

        .away {
          background-position-x: right;
          background-image: url('../assets/img/away.png');
        }
      }

      img {
        display: flex;
        height: 100%;
        width: auto;
        margin-right: .5%;
      }

      svg {
        position: absolute;
        width: 100%;
        height: 100%;

        text {
          font-weight: 700;
          fill: #fff;
        }
      }
    }

    .title {
      top: .5%;
      bottom: auto;
      height: calc(100vw*0.33*0.15);
      background-color: rgba(0, 0, 0, 0);

      .item {
        justify-content: flex-end !important;
      }

      .sub {}

      .name {
        width: 35% !important;
      }
    }
  }

  canvas {
    width: 100% !important;
    height: auto !important;
  }

}

</style>
