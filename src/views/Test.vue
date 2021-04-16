<template>
  <div class="home">
    <div id="video-player"></div>
    <div id="video-player-1"></div>
    <div id="video-player-2"></div>
  </div>
</template>
<script>
/* eslint-disable */
import Worker from "worker-loader!@/assets/js/worker"
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
    var port = 50101
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
    var port1 = 50201
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
    var port2 = 50301
    this.worker2.postMessage({
      type: 'create',
      data: {
        canvas: oc2,
        url: `ws://${document.location.hostname}:${port2}/`
      }
    }, [oc2])
  }
}
/* eslint-enable */

</script>
