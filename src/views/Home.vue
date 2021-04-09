<template>
  <div class="home">
    <el-row>
      <el-col v-for="item in 2" :key="'vp-'+item" :span="12">
        <VideoPlayer :no="item" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
/* eslint-disable */
import VideoPlayer from '@/components/VideoPlayer.vue'
export default {
  name: 'Home',
  components: {
    VideoPlayer
  }
}
/* eslint-enable */

</script>
