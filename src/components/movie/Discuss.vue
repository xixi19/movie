<template>
	<div class="discuss">
		<div class="discusshead">
			<div class="discussbox">
				<div class="discussheadBox">
					<i></i>
					<input v-model="val" @click="disclick(val)">
				</div>
			</div>
      <router-link to="/movie">
			<div class="discussbut">取消</div>
    </router-link>
		</div>
		<div class="disscusscon" ref="discuss">
      <div>
			<div class="disscussconbox" v-for="subject in undar">
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
						<div class="protagonist ">
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
			</div>
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
				val:null,
				undar:[],
        DiScroll:null,
			}
      },
      mounted(){
      this.$nextTick(() => {
        this.DiScroll=new BScroll(this.$refs.discuss)
      })
    },
		methods: {
			disclick(val){
       if(this.undar){
         this.undar.splice(0,this.undar.length);
       }
				for(let i=0;i<this.$route.params. addsub.length;i++){
					let subjects=this.$route.params. addsub[i]
          console.log(subjects)
          for(let a=0;a<subjects.length;a++){
            let subject=subjects[a]
          let arr=subject.title.split('')
          let addval=val.split('')
          for(let b=0;b<addval.length;b++){
         for(let j=0;j<arr.length;j++){
            if (val[b]===arr[j]) {
               console.log(arr.join(''))
              var  addarr= arr.join('')
            }
           }  
         }
         if(addarr==subject.title){
              this.undar.push(subject)
               }
        }
				
					 
				}
			}
		},
	}
</script>

<style lang="scss">
.discusshead{
	display: flex;
	width:100%;
	height: 64px;
	line-height:64px;
	background-color: rgb(242,85,72);
	.discussbox{
		flex:0 0 300px;
		margin: auto;
		.discussheadBox{
			position:relative;
			width:86%;
			margin: auto;
			height: 42px;
			line-height:42px;
			background-color: rgb(255,255,255);
			border-radius:25px;
			i{
				position:absolute;
				top:8px;
				left:9px;
				display:block;
				width:21px;
				height:25px;
				background-image: url("../../assets/img/q/x6.png");
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
          .discussbut{
          	flex:1;
          }
      }                
  }
.disscusscon{
  		width:100%;
  	position:fixed;
  	top:64px;
  	bottom: 0px;
  	width:100%;
  	background-color: rgb(255,255,255);
  	overflow: hidden;
  .disscussconbox{
    width:100%;
    margin-top:20px;
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
  
</style>