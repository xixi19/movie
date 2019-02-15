<template>
	<div>
		<div class="detailpage">
			<div class="detabox" ref="men" >
				<div>
					<div class="detahead">
						<div class="pagehead">
							<router-link to="/movie/upcoming">
								<div class="pagehead-left"></div>
							</router-link>
							<div class="pagehead-con">电影</div>
							<div class="pagehead-right"></div>
						</div>
						<div class="details">
							<div class="details-left">
								<img :src="$route.params.subject.images.small ">
								<i></i>
							</div>
							<div class="details-right">
								<div class="details-name">
									{{$route.params.subject.title}}
								</div>
								<div class="details-eng">
									{{$route.params.subject.original_title}}
								</div>
								<div class="introduce">
									<span v-for="(item,index) in $route.params.subject.genres">{{item}},</span>
									<div>
										<strong></strong>
										<i></i>
									</div>
									
								</div>
								<div class="grade">
									评分：{{ $route.params.subject.rating.average>0? $route.params.subject.rating.average:"暂无评分"}}
								</div>
								<div class="details-show">
									{{$route.params.subject.year}}大陆上映
									<i></i>
								</div>
								<div class="details-peo">
									{{$route.params.subject.id}}人想看
								</div>
							</div>
						</div>
						<div class="wanna-see">
							<div class="wanna">
								<div>
									<i @click="con()" :class="num?'act':''"></i>看过
								</div>
							</div>
							<div class="see">
								<div>
									<i @click="add()" :class="active?'act':''"></i>
									<span>想看</span>
								</div>
							</div>
						</div>
						<div class="bg-img">
							<img :src="$route.params.subject.images.small">
						</div>
					</div>
					<div class="detacon">
						<div class="eggshell">
							<span>你猜有没有彩蛋</span>
							<i></i>
						</div>
						<div class="eggbox"></div>
						<div class="deta-title" @click="detashow()">
							<div class="detatext" v-show="!deta">
								海王（杰森·莫玛饰）是美国DC漫画旗下超级英雄，本名亚瑟·库瑞，是海底之国亚特兰蒂斯的皇后和美国海边一个灯塔看守人的私生子，拥有半人类、半亚特兰蒂斯人
							</div>
							<div class="detatext-box" v-show="deta">海王（杰森·莫玛饰）是美国DC漫画旗下超级英雄，本名亚瑟·库瑞，是海底之国亚特兰蒂斯的皇后和美国海边一个灯塔看守人的私生子，拥有半人类、半亚特兰蒂斯人
							</div>
							<div class="detabg">
								<transition name="fly">
									<i v-show="!deta"></i>
								</transition>
								<transition name="tatle">
									<span v-show="deta"></span>
								</transition>
							</div>
						</div>
						<div class="eggbox"></div>
						<div class="actor">
							<div class="actor-tile">
								<span>演职人员</span>
								<strong>全部</strong>
								<i></i>
							</div>
							<div class="actor-box">
								<ul>
									<li v-for="(cast,index) in $route.params.subject.casts">
										<div class="cast-img">
											<img :src="cast.avatars.small">
										</div>
										<div class="cast-text">
											{{cast.name}}
										</div>
									</li>
									<li v-for="(item,index) in $route.params.subject.directors">
										<div class="cast-img">
											<img :src="item.avatars.small">
										</div>
										<div class="cast-text">
											{{item.name}}
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="detabot"></div>
				</div>
			</div>
			<div class="detapage">
				特惠选票
			</div>
		</div>
		<router-view/>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default {
		data(){
			return{
				active:false,
				num:false,
				deta:false,
				menuScroll:null,
			}
		},
		mounted(){
			this.$nextTick(() => {
				this.menuScroll=new BScroll(this.$refs.men)
			})
		},
		methods:{
			add(){
				this.active=!this.active
				console.log(this.active)
			},
			con(){
				this.num=!this.num
			},
			detashow(){
				this.deta=!this.deta
			}
		}
	}
</script>

<style lang="scss">
.detailpage{
	width: 100%;
	.detabox{
		position: fixed;
		top:0px;
		bottom:64px;
		width:100%;
		overflow: hidden;
		.detahead{
			position:relative;
			overflow: hidden;
			.pagehead{
				position:relative;
				width:100%;
				height:52px;
				line-height:62px;
				.pagehead-left{
					position:absolute;
					top:25px;
					left: 26px;
					width:15px;
					height:26px;
					background-image: url("../../assets/img/a2/amn.png");
					background-size: 15px 26px;
				}
				.pagehead-con{
					position:absolute;
					top:20px;
					left:40%;
					width:70px;
					height:30px;
					background-color: rgb(51,61,62);
					opacity: 0.4;
					text-align:center;
					line-height:30px;
					border-radius:15px;
					color:rgb(250,250,250)
				}
				.pagehead-right{
					position:absolute;
					top:23px;
					right: 28px;
					width:24px;
					height:24px;
					background-image: url("../../assets/img/q/ark.png");
					background-size:24px 24px;
				}
			}
			.details{
				display: flex;
				margin-top: 18px;
				.details-left{
					position:relative;
					flex:0 0 152px;
					height:173px;
					overflow:hidden;
					img{
						display:inline-block;
						margin-left: 18px;
						height:173px;
						width:130px;
					}
					i{
						position:absolute;
						top: 70px;
						left:62px;
						width:44px;
						height:44px;
						background-image:url("../../assets/img/q/aqs.png");
						background-size:44px 44px;
					}
				}
				.details-right{
					flex:1;
					margin-left:10px;
					.details-name{
						width:100%;
						font-size:18px;
						font-weight:bold;
						color:rgb(247,252,252);
					}
					.details-eng{
						width:100%;
						margin-top:12px;
						font-size:14px;
						color:rgb(147,158,170);
					}
					.introduce{
						width:100%;
						margin-top:20px;
						color:rgb(147,158,170);
						span{
							display:inline-block;
						}
						div{
							position:relative;
							width:90x;
							height:20px;
							display:inline-block;
							margin-left:2%;
						}
						i{
							position:absolute;
							top:5px;
							display:inline-block;
							width:43px;
							height:20px;
							background-image:url("../../assets/img/q/zc.png");
							background-size:43px 20px;	
						}
						strong{
							position:absolute;
							top: 5px;
							left:50px;
							display:inline-block;
							width:43px;
							height:20px;
							background-image:url("../../assets/img/q/ana.png");
							background-size:43px 20px;	
						}
					}
					.grade{
						width:100%;
						margin-top:5px;
						color:rgb(147,158,170);
					}
					.details-show{
						position:relative;
						width:100%;
						margin-top:5px;
						color:rgb(147,158,170);
						i{
							position:absolute;
							left:106px;
							display:inline-block;
							width:13px;
							height:18px;
							background-image:url("../../assets/img/q/arv.png");
							background-size:13px 18px;	
						}
					}
					.details-peo{
						width:100%;
						margin-top:20px;
						color:rgb(147,158,170);
					}
				}
			}
			
			.wanna-see{
				display:flex;
				margin-top:13px;
				margin-bottom:10px;
				.wanna{
					flex:0 0 45%;
					height:51px;
					margin-left:17px;
					margin-right:13px;
					background-color:rgba(55,55,67,0.4);
					border-radius:5px;
					div{
						position:relative;
						width:70px;
						line-height:51px;
						margin:auto;
						text-align:center;
						color: rgb(250,250,250);
						i{
							position:absolute;
							display:inline-block;
							top:9px;
							left:-44px;
							margin-left:35px;
							margin-top:25px;
							width:24px;
							height:20px;
							margin-top: 5px;
							background-image:url("../../assets/img/q/adg.png");
							background-size:24px 20px;
						}
						.act{
							background-image:url("../../assets/img/q/adi.png");
							background-size:24px 20px;
						}
					}
				}
				.see{
					flex:0 0 45%;
					height:51px;
					line-height:51px;
					background-color:rgba(55,55,67,0.4);
					border-radius:5px;
					margin-right:5px;
					div{
						position:relative;
						width:70px;
						line-height:51px;
						margin:auto;
						text-align:center;
						color: rgb(250,250,250);
						i{
							position:absolute;
							top:9px;
							left:-44px;
							margin-left:35px;
							margin-top:25px;
							width:24px;
							height:20px;
							margin-top: 5px;
							background-image:url("../../assets/img/q/a7u.png");
							background-size:24px 20px;
						}
						.act{
							background-image:url("../../assets/img/q/a7v.png");
							background-size:24px 20px;
						}
					}
				}
			}
			.bg-img{
				position:absolute;
				top: 0;
				left:0;
				width:100%;
				height:100%;
				z-index: -10;
				filter: blur(20px);
				img{
					width:100%;
					height:100%;
				}
			}
		}
		.detacon{
			width:100%;
			margin-top:0px;
			margin-bottom:0px;
			padding-left:0px;
			.eggshell{
				position:relative;
				width:100%;
				height:50px;
				line-height:50px;
				text-align:center;
				span{
					position:absolute;
					top:0px;
					left:65px;
					height:50px;
					line-height:50px;
					text-align:center;
				}
				i{
					position:absolute;
					top:15px;
					left:35px;
					width:18px;
					height:22px;
					background-image:url("../../assets/img/q/sf.png");
					background-size:18px 22px;
				}
			}
			.eggbox{
				width:100%;
				height:8px;
				background-color: rgb(246,246,246)
			}
			.deta-title{
				width:100%;
				.detatext{
					margin:15px auto 8px;
					width:90%;
					height:50px;
					text-align:left;
					font-size:12px;
					overflow:hidden;
				}
				.detatext-box{
					margin:15px auto 8px;
					width:90%;
					text-align:left;
					font-size:12px;
				}
				.detabg{
					width:100%;
					height:10px;
					i{
						display:block;
						width:10px;
						height:8px;
						margin:auto;
						background-image:url("../../assets/img/q/a1o.png");
						background-size:10px 8px;                 	}
					}
					.fly-enter, .fly-leave-to {
						transform: rotate(180deg);
						
					}

					.fly-enter-active, .fly-leave-active {
						transition: all 0.5s linear;
					}
					.tatle-enter, .tatle-leave-to {
						transform: rotate(180deg);
						
					}

					.tatle-enter-active, .tatle-leave-active {
						transition: all 0.5s linear;
					}
					span{
						display:block;
						width:10px;
						height:8px;
						margin:auto;
						background-image:url("../../assets/img/q/a1p.png");
						background-size:10px 8px;       
					}
				}
			}
			.actor{
				width:100%;
				margin-top:5px;
				margin-left:10px;
				.actor-tile{
					position:relative;
					width:100%;
					height:30px;
					line-height:30px;
					color:rgb(83,83,83);
					strong{
						position:absolute;
						top:0px;
						right:0px;
						display:inline-block;
						width:50px;
						margin-right:40px;
						color:rgb(104,104,104)
					}
					i{
						position:absolute;
						top: 9px;
						right:43px;
						display:inline-block;
						width:7px;
						height:17px;
						background-image:url("../../assets/img/q/arv.png");
						background-size:7px 17px;
					}
				}
				.actor-box{
					ul{
						position:fixed;
						width:100%;
						overflow:hidden;
						margin-top:15px;
						li{
							display:inline-block;
							margin-right:15px;
							.cast-text{
								font-size: 12px;
							}
						}
					}
				}
			}
			.detabot{
				height:200px;
			}
		}
		.detapage{
			position: fixed;
			bottom:0px;
			width:100%;
			height: 64px;
			text-align: center;
			line-height: 64px;
			background-color: rgb(238,71,62);
			color:rgb(250,250,250);
			font-size: 18px;
		}
	}
</style>