<template>
  <el-row class="screen">
    <el-col v-for="item in type" :key="'screen-' + item" :span="item<=2? 12 : 8">
      <VideoPlayer :roomId="roomId" :chanel="item" />
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
  props: ['roomId', 'type'],
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

  &:nth-child(1) {
    height: calc(60vh-1px);
    border-top: 2px solid;
    border-bottom: 1px solid;
    border-left: 2px solid;
    border-right: 1px solid;
  }

  &:nth-child(2) {
    height: calc(60vh-1px);
    border-top: 2px solid;
    border-bottom: 1px solid;
    border-left: 1px solid;
    border-right: 2px solid;
  }

  &:nth-child(3) {
    height: calc(40vh-1px);
    border-top: 1px solid;
    border-bottom: 2px solid;
    border-left: 2px solid;
    border-right: 1px solid;
  }

  &:nth-child(4) {
    height: calc(40vh-1px);
    border-top: 1px solid;
    border-bottom: 2px solid;
    border-left: 1px solid;
    border-right: 1px solid;
  }

  &:nth-child(5) {
    height: calc(40vh-1px);
    border-top: 1px solid;
    border-bottom: 2px solid;
    border-left: 1px solid;
    border-right: 2px solid;
  }
}

</style>
/* eslint-enable */
