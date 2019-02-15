<template>
	<div>
		<BottomTab v-if="ren" :userName="UserName" @contrastF="contrastF"/>
		<div class="enter" v-else>
			<div class="enterHeard">
				<div class="heard-left">
					<router-link to="/movie">
						<i></i>
					</router-link>
				</div>
				<div class="heard-title">个人</div>
				<div class="heard-right">
					<i></i>
				</div>
			</div>
			<div class="enterCenter">
				<div class="centerbox">
					<div class="centerTitle" v-if="showtime">登录</div>
					<div class="centerTitle" v-else>注册</div>
					<input type="text" v-model="UserName" placeholder="请输入用户名">
					<span v-show="usershow">{{num}}</span>
					<input  type="passWord" v-model="passWord" placeholder="请输入密码">
					<span v-show="passshow">{{num}}</span>
				</div>
				<div class="enterBottom">
					<p @click="showTime" v-if="showtime">没有账号/马上注册</p>
					<p v-else @click="showTime">已有账号/马上登陆</p>
					<p  v-show="reg" class="reg">{{num}}</p>
					<button  @click="contrast()" v-if="showtime">点击登录</button>
					<button  @click="add()" v-else>点击注册</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BottomTab from './BottomTab'
	export default {
		name: 'Mine',
		data(){
			return{
				UserName:'',
				passWord:'',
				showtime:false,
				all:[],
				num:null,
				usershow:false,
				passshow:false,
				reg:false,
				ren:false
			}
		},
		components:{
			BottomTab,
		},
		methods:{
			showTime(){
				this.showtime=!this.showtime
				this.num=null
			},
			//注册验证用户是否存在
			add(){
				let pw= this.validatePass(this.passWord)
				let un=this.validateName(this.UserName)
				this.reg=false
				if(pw==1&&un==1){
					this.passshow=false
					this.usershow=false
					let data = {}
					let record = this.all.find(f => f.user === this.UserName)
					if(!record){
						data = {user:this.UserName,pass:this.passWord}
						this.all.push(data)
						console.log(this.all)
						this.reg=true
						this.num="注册成功"
						this.showtime=!this.showtime
					}else{
						this.reg=true
						this.num="账号已存在"
					}
				}
			},
			//验证用户名
			validateName(value){
				let reg=/(^\s+)|(\s+$)/g
				if (value === ''||reg.test(value)) {
					this.num='用户名不能为空或者空格' 
					this.usershow=true
					this.passshow=false
				}else{
					return 1
				}
			},
			//验证注册密码是否正确
			validatePass(value){
				let reg=/(^\s+)|(\s+$)/g
				if (value === ''||reg.test(value)) {
					this.num='密码不能为空或者空格'
					this.passshow=true
					this.usershow=false
				} else if(value.length < 6){
					this.num='密码长度最小是6位'
					this.passshow=true
					this.usershow=false
				}else{
					return 1
				}
			},
				//登录判断
				contrastF(){
				     setTimeout(()=>{ this.ren=false }, 1000)
				},
				contrast(){
					let arr=this.all.map((item)=>{
						if(this.UserName==item.user&&this.passWord==item.pass){
							return 1
						}
						if(this.UserName==item.user&&this.passWord!=item.pass){
							return 2
						}
						if(this.UserName!=item.user&&this.passWord==item.pass){
							return 3
						}
						if(this.UserName!=item.user&&this.passWord!=item.pass){
							return 4
						}
					})
					console.log(arr)
					if(arr.find(f=>f===1)){
						setTimeout(()=>{ this.ren=true }, 1000)
					}
					else{
						this.reg=false
						if(arr.find(f=>f===2)){
							this.num="密码错误"
							this.passshow=true
							this.usershow=false
						}
						else{
							if(arr.find(f=>f===3)){
								this.num="账号错误"
								this.usershow=true
								this.passshow=false
							}
							else{
								if(arr.find(f=>f===4)){
									this.num="此用户不存在"
									this.passshow=false
									this.usershow=false
									this.reg=true
								}
							}
						}
					}
				}
			}
		}
	</script>

	<style lang="scss">
	.enter{
		width: 100%;
		.enterHeard{
			width:100%;
			height: 62px;
			display:flex;
			width:100%;
			height:62px;
			background-color:rgb(250,250,250);
			border-bottom:1px solid #ddd;
			.heard-left{
				position:relative;
				flex:1;
				line-height: 62px;
				i{
					position:absolute;
					top:18px;
					left:30%;
					display:block;
					width:16px;
					height:24px;
					background-image:url('../assets/img/q/ad0.png');
					background-size:16px 24px;
				}
			}
			.heard-right{
				position:relative;
				flex:1;
				line-height: 62px;
				i{
					position:absolute;
					top:18px;
					right:30%;
					display:block;
					width:22px;
					height:22px;
					background-image:url('../assets/img/q/a44.png');
					background-size:22px 22px;
				}
			}
			.heard-title{
				flex:1;
				line-height: 62px;
				text-align:center;
				font-size: 16px;
				font-weight: bold;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				color:rgb(54,54,54)
			}
		}
		.enterCenter{
			position: fixed;
			top:80px;
			bottom: 0px;
			left: 0px;
			width: 100%;
			background-color: rgb(255,255,255);
			.centerbox{
				width:250px;
				margin:auto;
				.centerTitle{
					width:100%;
					text-align: center;
					font-size: 18px;
					margin-bottom:20px;
				}
				input{
					display:block;
					width:250px; 
					height:40px; 
					line-height:40px; 
					margin:0 auto; 
					margin-bottom: 10px; 
					outline:none; border:1px solid #888; 
					padding:10px; 
					box-sizing:border-box;
				}
				span{
					display:block;
					margin-top: 10px;
					font-size:14px;
					color:#f0f;
				}
			}
			.enterBottom{
				width:250px;
				margin:10px auto;
				p{
					width:50%;
					margin: 0 auto 5px;
					font-size:12px;
					text-align:center;
				}
				.reg{
					font-size:16px;
					color:#f0f;
				}
				button{
					display:block;
					width:80%;
					height:40px;
					line-height:40px;
					margin: 0 auto;
					font-size: 16px;
					text-align:center;
				}
			}
		}
	}
</style>