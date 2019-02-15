<template>
	<div class="citybox">
		<div class="cityhead">
			
			<div class="citybg" v-show="!civic">
				<router-link to="/movie">
					<i></i>
				</router-link>
			</div>
			<div class="citySe">
				<div class="citySeBox">
					<i></i>
					<input v-model="val"  @focus="inputclick()" @blur.prevent="changeCount()" @click="cityclick(val)">
				</div>
			</div>
			<div class="citysebg" v-show="civic">取消</div>
		</div>
		<CitySe  :citys="citys" v-show="civic" :vall="val"></CitySe >
		<citycon :citys="citys" v-show="!civic"></citycon>
	</div>
</template>

<script>
	import Citycon from './Citycon'
	import CitySe from './CitySe'
	export default {
		data(){
			return{
				citys:null,
				cityScroll:null,
				val:"输入城市名或者id,拼音",
				civic:false,
				arr:[],
				add:[]
			}
		},
		created(){
			this.$axios.get('/city')
			.then(res=>{
				res=res.data
				this.citys=res.data
				console.log(this.citys)
				let result=[]
				for(let i=0;i<this.citys.length;i++){
					let item=this.citys[i]
					let key= item.py.split('')
					
					// let record = result.find(f => f == key[0])
     //        if (!record) { // 该商品当前没有同名商品在数组中
     //        	result.push(key[0])
     //        }
     //        this.add=result
     //        console.log(this.add)
        }
    })

		},
		methods: {
			inputclick(){
				this.civic=true
			},
			changeCount(){
				this.civic=false
			},
			cityclick(val){
				this.val=null
				for(let i=0;i<this.citys.length;i++){
					let item=this.citys[i]
					item.py.split('')
					this.val.split('')
					if(this.val==item.py){
						this.val=item.nm
						console.log(val)
					}
					if(this.val==item.id){
						this.val=item.nm
						console.log(val)
					}if (this.val==item.nm) {
						this.val=item.nm
					}

				}
			}
		},
		components:{
			Citycon,
			CitySe 
		}
	}
</script>

<style lang="scss">
.cityhead{
	display: flex;
	width: 100%;
	height: 64px;
	line-height:64px;
	background-color: rgb(242,85,72);
	.citybg{
		position: relative;
		flex:0 0 70px;
		i{
			position:absolute;
			top:18px;
			right: 0px;
			display:block;
			width:28px;
			height:28px;
			background-image: url("../assets/img/q/a51.png");
			background-size: 28px 28px;
		} 
		.citysebg{
			flex:0 0 70px;
			line-height:64px;
		} 
	}
	.citySe{
		flex:1;
		margin: auto;
		.citySeBox{
			position:relative;
			width:86%;
			margin: auto;
			height:42px;
			line-height: 42px;
			background-color: rgb(255,255,255);
			border-radius:25px;
			i{
				position:absolute;
				top:8px;
				left:9px;
				display:block;
				width:21px;
				height:25px;
				background-image: url("../assets/img/q/x6.png");
				background-size:28px 29px;
			}
			input{
				margin-left: 40px;
				width:80%;
				height:30px;
				color:rgb(162,162,162);
				  border: 0;  // 去除未选中状态边框
                  outline: none; // 去除选中状态边框
                  background-color: rgba(0, 0, 0, 0);// 透明背景
              }
          }
      }
  }

</style>