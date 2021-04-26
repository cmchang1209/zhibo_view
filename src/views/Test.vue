<template>
  <div class="home">
    <div id="video-player"></div>
    <div id="video-player-1"></div>
    <div id="video-player-2"></div>
    <div class="jsmpeg" data-url="ws://videostream.fidodarts.com:55001/" data-loop="true" data-autoplay="true" data-video="false"></div>
    <div class="jsmpeg" data-url="ws://videostream.fidodarts.com:55003/" data-loop="true" data-autoplay="true" data-video="false"></div>
    <!-- <el-button type="danger" @click="volume"></el-button> -->
  </div>
</template>
<script>
/* eslint-disable */
import Worker from "worker-loader!@/assets/js/worker"
import JSMpeg from '@/assets/js/jsmpeg.min1'
export default {
  data() {
    return {
      worker: null,
      worker1: null,
      worker2: null
    }
  },
  created() {
    this.worker = new Worker()
    this.worker1 = new Worker()
    this.worker2 = new Worker()
  },
  mounted() {
    const video = document.getElementById('video-player')
    const canvas = document.createElement("CANVAS")
    video.appendChild(canvas)
    const oc = canvas.transferControlToOffscreen()
    var port = 55005
    this.worker.postMessage({
      type: 'create',
      data: {
        canvas: oc,
        url: `ws://${document.location.hostname}:${port}/`
      }
    }, [oc])
    const video1 = document.getElementById('video-player-1')
    const canvas1 = document.createElement("CANVAS")
    video1.appendChild(canvas1)
    const oc1 = canvas1.transferControlToOffscreen()
    var port1 = 55001
    this.worker1.postMessage({
      type: 'create',
      data: {
        canvas: oc1,
        url: `ws://${document.location.hostname}:${port1}/`
      }
    }, [oc1])
    const video2 = document.getElementById('video-player-2')
    const canvas2 = document.createElement("CANVAS")
    video2.appendChild(canvas2)
    const oc2 = canvas2.transferControlToOffscreen()
    var port2 = 55003
    this.worker2.postMessage({
      type: 'create',
      data: {
        canvas: oc2,
        url: `ws://${document.location.hostname}:${port2}/`
      }
    }, [oc2])
    this.worker.onmessage = (evt) => {
      const data = evt.data
      switch (data.type) {
        case 'hideLodaingIcon':

          break
      }
    }
  },
  methods: {
    /*volume() {
      this.worker.postMessage({ type: 'volume', volume: 1 })
    }*/
  }
}
/* eslint-enable */

</script>
