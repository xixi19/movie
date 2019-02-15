<template>
<div class="ren">
	<span>用户名:{{userName}}</span>
	<span class="title" @click="clicke()">注销</span>
</div>
 </template>

 <script>
    export default {
    	 props:['userName'],
    	 data(){
    	 	return{
    	 		ren:false
    	 	}
    	 },
    	 methods:{
    	 	clicke(){
    	 		  this.$emit('contrastF')
    	 	}
    	 }
  }
</script>

 <style lang="scss">
.ren{
	width: 100%;
	height: 40px;
	background-color: #f00;
	line-height: 40px;
	span{
		display: inline-block;
		width:45%;
	}
	.title{
		width:50%;
		text-align: right;
	}
}
</style>