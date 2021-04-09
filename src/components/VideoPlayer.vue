<template>
  <div class="video-player">
    <canvas :id="'video-canvas-'+no"></canvas>
  </div>
</template>
<script>
/* eslint-disable */
import Worker from "worker-loader!@/assets/js/worker"
export default {
  name: 'VideoPlayer',
  props: [ 'no' ],
  data() {
    return {
      worker: null
    }
  },
  created() {
    this.worker = new Worker()
  },
  mounted() {
    const video = document.getElementById(`video-canvas-${this.no}`)
    this.worker.onmessage = (evt) => {
      const data = evt.data
      switch (data.type) {
        case 'ready':
          const oc = video.transferControlToOffscreen()
          this.worker.postMessage({
            type: 'create',
            data: {
              canvas: oc,
              url: `ws://${document.location.hostname}:50001/`
            }
          },[oc])
          break
      }
      console.log(data.type)
    }
  }
}
/* eslint-enable */

</script>
<style scoped lang="scss">
</style>
