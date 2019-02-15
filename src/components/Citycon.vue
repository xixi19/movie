<template>
<div class="citycon" ref="citymem">
			<div class="city">
				<ul>
					<li v-for="(item,index) in citys" :key="index" >
					 <router-link :to="{name:'Movie',params:{item}}">{{item.nm}}
					 	</router-link>
					 </li>
					
				</ul>
			</div>
		</div>
 </template>

 <script>
 	import BScroll from 'better-scroll'
    export default {
    	 props:['citys'],
    	 mounted(){
			this.$nextTick(() => {
				this.cityScroll=new BScroll(this.$refs.citymem,{
					click:true
				})
			})
		},
  }
</script>

 <style lang="scss">
.citycon{
	position:fixed;
		top: 64px;
		bottom: 0px;
		width:100%;
		overflow:hidden;
		background-color:rgb(255,255,255);
	.city{
		width:100%;
		ul{
			width:100%;
			li{
			width:90%;
			height:50px;
			line-height:50px;
			margin: 0 auto;
			border-bottom: 1px solid #f0f0f0;
		      }
	  }
	
	}
}
</style>