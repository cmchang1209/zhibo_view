<template>
  <el-row class="screen">
    <el-col v-for="item in 4" :key="'screen-' + item" :span="12">
      <VideoPlayer :roomId="roomId" :chanel="item" :mute="mute" />
    </el-col>
  </el-row>
</template>
<script>
/* eslint-disable */
import VideoPlayer from '@/components/VideoPlayer.vue'
export default {
  name: 'Home',
  components: {
    VideoPlayer
  },
  props: ['roomId', 'mute'],
  sockets: {
    connect() {}
  },
  data() {
    return {}
  },
  created() {}
}

</script>
<style scoped lang="scss">
.screen .el-col {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-color: #121820 !important;
  height: calc(50vh-1px);

  &:nth-child(1) {
    border-top: 2px solid;
    border-bottom: 1px solid;
    border-left: 2px solid;
    border-right: 1px solid;
  }

  &:nth-child(2) {
    border-top: 2px solid;
    border-bottom: 1px solid;
    border-left: 1px solid;
    border-right: 2px solid;
  }

  &:nth-child(3) {
    border-top: 1px solid;
    border-bottom: 2px solid;
    border-left: 2px solid;
    border-right: 1px solid;
  }

  &:nth-child(4) {
    border-top: 1px solid;
    border-bottom: 2px solid;
    border-left: 1px solid;
    border-right: 2px solid;
  }
}

</style>
/* eslint-enable */
