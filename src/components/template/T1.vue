<template>
  <div class="wap">
    <div class="inner">
      <VPlayer :roomId="roomId" :chanel="1" :mute="mute" :url="url" :size="1" />
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import VPlayer from '@/components/VPlayer.vue'
export default {
  name: 'Home',
  components: {
    VPlayer
  },
  props: ['roomId', 'mute', 'url'],
  sockets: {
    connect() {}
  },
  data() {
    return {}
  },
  created() {}
}
/* eslint-enable */

</script>
<style scoped lang="scss">
.wap {
  position: absolute;
  width: calc(100% - 1vw);
  height: calc(100vw * 0.417);
  /* 100vw*9/16*74% */
  left: .5vw;
  top: calc(100vw * 0.05);

  .inner {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

</style>
<style scoped>
/deep/ .canvas-wap {
  width: 67.37%;
  height: 90%;
}

/deep/ canvas {
  border: 1px solid white;
  width: 100% !important;
  height: 100% !important;
}

</style>
