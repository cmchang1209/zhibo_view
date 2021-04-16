<template>
  <div class="home">
    <div v-if="type === 4" :class="'template-'+type">
      <el-row class="screen">
        <el-col v-for="item in type" :key="'screen-' + item" :span="12">
          <VideoPlayer :roomId="id" :chanel="item" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import VideoPlayer from '@/components/VideoPlayer.vue'
export default {
  name: 'Home',
  components: {
    VideoPlayer
  },
  props: ['no'],
  sockets: {
    connect() {
      this.$socket.client.emit('getRoomData', { no: this.no })
    },
    roomData(val) {
      this.id = val[0].id
      this.type = val[0].type
    }
  },
  data() {
    return {
      id: '',
      type: ''
    }
  },
  created() {
  }
}

</script>
<style scoped lang="scss">
.screen .el-col {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-color: #121820 !important;
}

.template-4 {
  .screen {
    .el-col {
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
  }
}

</style>
/* eslint-enable */
