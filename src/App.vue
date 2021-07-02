<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC&display=swap');

body {
  margin: 0;
  font-family: 'Oswald', 'Noto Sans TC', sans-serif;
  /* height: calc(100vw * 9/16); */
  max-width: 1920px;
  background-image: url('./assets/img/obs_bg.png') !important;
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  font-weight: 700;
  position: relative;
  background-color: #2b2a2b;
}

.template-4 .canvas,
.template-5 .canvas {
  max-width: 100% !important;
  max-height: 100% !important;
}

.hide {
  display: none;
}

.iconfont,
[class^="el-icon-third"],
[class^=" el-icon-third"] {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.player {
  .wap {
    canvas {
      width: auto !important;
      height: 100% !important;
    }
  }
}

</style>
