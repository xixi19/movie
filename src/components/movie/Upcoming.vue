<template>
	<div class="Upcoming">
		<div class="upcom-warpper"  ref="menu">
			<ul>
				<li v-for="(subject,index) in upcoming" :key="subject.id" class="upcom-box">
					<router-link :to="{name:'Updiss',params:{subject}}">
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
									类型:
									<strong v-for="item in subject.genres">
										<span>{{item}}</span>，
									</strong>
								</span>
							</div>
							<div class="protagonist ">
								<span>
									主演:
									<strong v-for="(cast,index) in subject.casts">{{cast.name}}，</strong>
								</span>
							</div>
							<div class="screening">
								<span>有
									<strong>{{subject.collect_count}}</strong>
									人想看
								</span>
							</div>
							
						</div>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default {
		props: ['upcoming'],
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
.Upcoming{
	width: 100%;
	.upcom-warpper{
		position: fixed;
		top:64px;
		left:4.6%;
		bottom:62px;
		width:100%;
		overflow: hidden;
		.upcom-box{
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
			}
		}	
	}
}
</style>