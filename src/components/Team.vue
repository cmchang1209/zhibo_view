<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,447,153.6">
    <image v-if="type==='home'" xlink:href="../assets/img/home.png" width="100%" />
    <image v-else xlink:href="../assets/img/away.png" width="100%" />
    <text x="20" y="36" font-size="28" fill="#fff" letter-spacing="3">{{ store }}</text>
    <text x="365" y="70" font-size="42" text-anchor="end" fill="#fff" letter-spacing="3">{{ player }}</text>
    <text x="420" y="128" font-size="24" text-anchor="end" fill="#000" letter-spacing="3">紅心樂透吧Darts World</text>
  </svg>
</template>
<script>
/* eslint-disable */
export default {
  name: 'Team',
  props: ['type', 'store', 'player'],
  computed: {}
}
/* eslint-enable */

</script>
<style scoped lang="scss">
</style>
