<template>
  <table>
    <tbody>
      <tr>
        <td class="left top">
        	<VideoPlayer :roomId="roomId" :chanel="1" :mute="mute" />
        </td>
        <td rowspan="2" class="right">
        	<VideoPlayer :roomId="roomId" :chanel="3" :mute="mute" />
        </td>
      </tr>
      <tr>
        <td class="left bottom">
        	<VideoPlayer :roomId="roomId" :chanel="2" :mute="mute" />
        </td>
      </tr>
    </tbody>
  </table>
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
table {
  border-spacing: 0px;
  border: 1px solid #121820;

  td {
    text-align: center;
    vertical-align: middle;

    &.left {
      width: 640px;
    }
    &.top {
    	height: 480px;
    }
    &.bottom {
    	height: 360px;
    }

    &.right {
      width: 1066px;
      height: 800px;
    }
  }
}

</style>
/* eslint-enable */
