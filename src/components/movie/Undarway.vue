<template>
	<div>
		<div class="undarway">
			<div class="realtime-box">
				<div class="boxoffice">
					<span>
						实时票房
						<i></i>
					</span>
				</div>
				<div class="grail">
					<span>
						今日大盘
						<strong>4318.43万</strong>
						<i></i>
					</span>

				</div>
			</div>
			<div class="undar-warpper"  ref="menu">
				<ul>
					<li v-for="(subject,index) in undarway" :key="subject.id" class="undar-box">
						<router-link :to="{name:'DetailPage',params:{subject}}">
							<div class="imgbox">
								<img :src="subject.images.small">
							</div>
							<div class="listbox">
								<div class="headline">
									<h2>{{subject.title}}</h2>
									<span :class="subject.rating.average>5?'bg':''"></span>
									<i></i>
								</div>
								<div class="graded">
									<span>
										评分 :
										<strong>{{subject.rating.average>0?subject.rating.average:"暂无评分"}}</strong>
									</span>
								</div>
								<div class="protagonist">
									<span>
										主演:
										<strong v-for="(cast,index) in subject.casts">{{cast.name}}，</strong>

									</span>
								</div>
								<div class="screening">
									<span>今天放映
										<strong>{{subject.collect_count}}</strong>
										场
									</span>
								</div>
							</div>
						</router-link>
					<router-link :to="{name:'Cinema',params:{subject}}">
						<div class="purchase">
						</div>
					</router-link>
					</li>
				</ul>
			</div>
		</div>
		<router-view/>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default {
		props: ['undarway'],
		data(){
			return{
				menuScroll:null,
				bg:true,
				id:0,
			}
		},
		created() {
			this.$nextTick(() => {
				this.menuScroll=new BScroll(this.$refs.menu)
			})
		}
	}
</script>

<style lang="scss">
.undarway{
	width: 100%;
	.realtime-box{
		display:flex;
		margin: 20px 4.6% 0px;
		background-color: rgb(246,246,246);
		height: 50px;
		line-height: 50px;
		.boxoffice{
			flex:1;
			display: inline-block;
			span{
				position: relative;
				margin-left: 14px;
				display:block;
				padding-left: 19px;
				color:rgb(50,50,50);
			}
			i{
				position:absolute;
				top: 16px;
				left:-4px;
				background-image: url("../../assets/img/a2/ru.png");
				background-size: 19px 19px;
				width:19px;
				height:19px;
			}
		}
		.grail{
			flex:1;
			display:inline-block;
			span{
				position: relative;
				margin-right: 14px;
				display:block;
				color:rgb(50,50,50);
				text-align: right;
				strong{
					color: rgb(200,71,76)
				}
				i{
					position:absolute;
					top: 18px;
					right:-9px;
					background-image: url("../../assets/img/p/au_.png");
					background-size:5px 15px;
					width:5px;
					height:15px;
				}
			}
		}
	}
	.undar-warpper{
		position: fixed;
		top:147px;
		left:4.6%;
		bottom:62px;
		width:100%;
		overflow: hidden;
		.undar-box{
			position:relative;
			margin-top: 20px;
			a{
				display:flex;
				.imgbox{
					flex:0 0 87px;
					display: inline-block;
					width:87px;
					height:122px;
					img{
						width:100%;
						height:100%;
					}
				}
				.listbox{
					flex:1;
					display:inline-block;
					margin-left:10px;
					padding-right: 23px;
					border-bottom: 1px solid #f7f7f7;
					.headline{
						width:100%;
						h2{
							position:relative;
							display:inline-block;
							font-size: 18px;
							max-width:35%;
							font-weight: bold;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							color: rgb(48,48,48);
						}
						span{
							display:inline-block;
							background-image:url("../../assets/img/q/a0b.png");
							background-size:55px 16px;
							margin-left:3px;
							margin-top:3px;
							width:55px;
							height:16px;
						}
						.bg{
							display:inline-block;
							background-image:url("../../assets/img/q/a0d.png");
							background-size:55px 16px;
							margin-left:3px;
							width:55px;
							height:16px;
						}
						i{
							display:inline-block;
							background-image:url("../../assets/img/q/anb.png");
							background-size:55px 16px;
							margin-left:3px;
							width:55px;
							height:16px;
						}
					}
					.graded{
						display:block;
						margin-top:17px;
						color: rgb(132,132,132);
					}
					.protagonist{
						display:block;
						width:100%;
						margin-top:17px;
						span{
							display:inline-block;
							width:50%;
							padding-right:20px;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							color: rgb(132,132,132);
						}
					}
					.screening{
						margin-top:10px;
						color: rgb(132,132,132)
					}
					
				}
				.purchase{
						position:absolute;
						bottom:4%;
						right:6%;
						background-image:url("../../assets/img/a2/g1.png");
						background-size:65px 37px;
						width:65px;
						height:37px;
					}
			}
		}	
	}
}
</style>