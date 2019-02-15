<template>
	<div class="citysecon">
		<router-link :to="{name:'Movie',params:{vall}}">
		<div class="city">
           {{vall}}
		</div>
	</router-link>
	<router-view />
	</div>
</template>

<script>
	export default {
		 props:['citys',"vall"],
		 methods:{
		 
		 }
	}
</script>

<style lang="scss">
.citysecon{
	position:fixed;
		top: 64px;
		bottom: 0px;
		width:100%;
		overflow:hidden;
		background-color:rgb(255,255,255);
	.city{
		width:100%;
		line-height: 62px;
	  }
	
	}
</style>