<template>
  <div>
  	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,686,158">
  		<text x="3" y="40" font-size="32" fill="#fff">
  			<tspan dx="0" textLength="80" lengthAdjust="spacing"></tspan>
  			<tspan v-for="item in set" :dx="item===1? 105 : 50">{{ item }}</tspan>
  		</text>
  		<text x="3" y="86" font-size="32" fill="#fff">
  			<tspan dx="0" textLength="80" lengthAdjust="spacing">主隊</tspan>
  			<tspan v-for="item in set" :dx="item===1? 105 : 50"></tspan>
  		</text>
  		<text x="3" y="146" font-size="32" fill="#fff">
  			<tspan dx="0" textLength="80" lengthAdjust="spacing">客隊</tspan>
  			<tspan v-for="item in set" :dx="item===1? 105 : 50"></tspan>
  		</text>
  		<line x1="3" y1="104" x2="686" y2="104" stroke="#fff" />
  	</svg>
  </div>
</template>
<script>
/* eslint-disable */
export default {
  name: 'Score',
  props: ['set']
}
/* eslint-enable */

</script>
<style scoped lang="scss">
</style>
