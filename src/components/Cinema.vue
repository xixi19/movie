<template>
	<div class="cinema">
		<div class="cinemaHeard">
			<div class="heard-left">
				<router-link to="/movie">
				<i></i>
				</router-link>
			</div>
			<div class="heard-title">{{cinemaName}}</div>
			<div class="heard-right">
				<i></i>
			</div>
		</div>
		<div class="cinemaconter">
			<div class="conterHeard">银幕</div>
			<div class="SeatTitle">荧幕中央</div>
			<div class="conterSeat">
				<div class="seatBg" v-for="row in seatRow">
					<div v-for="col in seatCol"
					v-if="seatArray.length>0"
					class="seat">
					<div class="inner-seat"
					@click="seatClick(row,col)"
					v-if="seatArray[row-1][col-1]!==-1"
					:class="seatArray[row-1][col-1]===2?'bought-seat':(seatArray[row-1][col-1]===1?'selected-seat':'unselected-seat')">
				</div>
			</div>
		</div>
	  </div>
      <div class="seatNumber">
      <span v-for="num in seatNumber">{{num}}</span>
        </div>
	<div class="conterBg">
		<div class="conterBgOne">
			<i></i>
			<span>可选</span>
		</div>
		<div class="conterBgTwo">
			<i></i>
			<span>已购</span>
		</div>
		<div class="conterBgThe">
			<i></i>
			<span>已选</span>
		</div>
	</div>
</div>
<div class="cinemaBottom">
	<div class="bottomTitle">
		<strong>推荐选座</strong>
		<div class="bottommath">
			<span @click=" smartChoose(1)">1人</span>
			<span @click=" smartChoose(2)">2人</span>
			<span @click=" smartChoose(3)">3人</span>
			<span @click=" smartChoose(4)">4人</span>
			<span @click=" smartChoose(5)">5人</span>
		</div>
	</div>
	<div class="bottombtn" :class="{bottomb:className}" @click="buyTicket()">
		<span>立即购票</span>
	</div>
</div>
<router-view/>
</div>
</template>

<script>
	export default {
		data(){
			return{
				//影院座位的二维数组,-1为非座位，0为未购座位，1为已选座位(绿色),2为已购座位(红色)
				seatArray:[],
                //影院座位行数
                seatRow:10,
                //影院座位列数
                seatCol:14,
                //推荐选座最大数量
                smartChooseMaxNum:5,
                className:false,
                cinemaName:'电影',
                seatNumber:[],//购买的位置
            }
        },
        //初始座位
        //Array 转换数组模式
        //fill 将数组里的元素进行修改
        //生成的数组没有get和set渲染
        created(){
        	 if(this.$route.params.subject){
        	 	this.cinemaName=this.$route.params.subject.title
        	 	
        	 }
        	let seatArray = Array(this.seatRow).fill(0).map(()=>Array(this.seatCol).fill(0));
            this.seatArray = seatArray;
          //随机删除位置
          for(let i=0;i<9;i++){
          this.seatArray[i][0]=-1;
        }
        for(let i=0;i<this.seatArray[0].length;i++){
        	this.seatArray[3][i]=-1;
        }
      },
      methods:{
      	//选座
          seatClick(row,col){
          	  // this.seatArray[row-1][col-1]=1
              if(this.seatArray[row-1][col-1]==2){
              	return
              }
          	  if(this.seatArray[row-1][col-1]==1){
          	  	this.$set(this.seatArray[row-1],col-1,0)
          	  	this.className=false
          	  }
          	  else if (this.seatArray[row-1][col-1]==0){
          	  	 this.$set(this.seatArray[row-1],col-1,1)
          	  	  this.ticket()
          	  }
               
          },
          ticket(){
               this.className=true
          },
          //购票
          buyTicket(){
          	for(let i=0; i<this.seatArray.length;i++){
          		for(let j=0;j<this.seatArray[i].length;j++){
          			if(this.seatArray[i][j]==1){
          				this.$set(this.seatArray[i],j,2)
          				this.seatNumber.push(`${i+1}行${j+1}列`)
          			}
          		}
          	}
          },
          //推荐座位规则  ,参数是起始行，终止行,推荐座位个数
      searchSeatByDirection: function(fromRow,toRow,num){
        /*
         * 推荐座位规则
         * (1)初始状态从座位行数的一半处的后一排的中间开始从左到右开始搜索，取离中间最近的，如果满足条件，
         *    记录下该结果离座位中轴线的距离，后排搜索完成后取距离最小的那个结果座位最终结果，优先向后排进行搜索，
         *    后排都没有才往前排搜，前排逻辑同上
         *
         * (2)只考虑并排且连续的座位，不能不在一排或者一排中间有分隔
         *
         * */

        /*
         * 保存当前方向搜索结果的数组,元素是对象,result是结果数组，offset代表该连续座位与中轴线的距离
         * {
         *   result:Array([x,y])
         *   offset:Number
         * }
         *
         */
         //找到影院座位水平垂直中间位置的后一排
         //let rowStart = parseInt((this.seatRow-1)/2,10)+1;
         // this.searchSeatByDirection(rowStart,this.seatRow-1,num);  从后排开始所传的参数
         //this.searchSeatByDirection(rowStart-1,0,num);  前排开始所传的参数
        let currentDirectionSearchResult = [];

        let largeRow = fromRow>toRow?fromRow:toRow, //起始行
            smallRow = fromRow>toRow?toRow:fromRow; //终止行

        for(let i=smallRow;i<=largeRow;i++){
          //每一排的搜索,找出该排里中轴线最近的一组座位
          let tempRowResult = [],
              minDistanceToMidLine=Infinity;  //Infinity无穷大
          for(let j=0;j<=this.seatCol - num;j++){
            //如果有合法位置

                // this.checkRowSeatContinusAndEmpty(i,j,j+num-1)
            	// 遍历座位是否连续，且都为空 例num=5 遍历出来为（0-4,1-5...  ）
            	// 因为0的座位是==-1 所以0是没有座位
            if(this.checkRowSeatContinusAndEmpty(i,j,j+num-1)){  
              //计算该组位置距离中轴线的距离:该组位置的中间位置到中轴线的距离
              //(j+num/2)先除后加
              let resultMidPos = parseInt((j+num/2),10);
              let distance = Math.abs(parseInt(this.seatCol/2) - resultMidPos);//返回数字的绝对值
              //如果距离较短则更新
              if(distance<minDistanceToMidLine){
                minDistanceToMidLine = distance;
                //该行的最终结果
                tempRowResult = this.generateRowResult(i,j,j+num-1)
              }
            }
          }
          //保存该行的最终结果
          currentDirectionSearchResult.push({
            result:tempRowResult,
            offset:minDistanceToMidLine
          })
        }
        //处理后排的搜索结果:找到距离中轴线最短的一个
        //注意这里的逻辑需要区分前后排，对于后排是从前往后，前排则是从后往前找
        let isBackDir = fromRow < toRow;
        let finalReuslt = [],minDistanceToMid = Infinity;
        if(isBackDir){
        	//后排情况,从前往后
          currentDirectionSearchResult.forEach((item)=>{
            if(item.offset < minDistanceToMid){  
              finalReuslt = item.result;
              minDistanceToMid = item.offset;  // minDistanceToMid=最小距离,offset都是基本相等的 没有更加小的距离  所以相当于取第一行
            }
          });
        }else{
        	//前排情况，从后往前找  reverse倒叙
          currentDirectionSearchResult.reverse().forEach((item)=>{
            if(item.offset < minDistanceToMid){
              finalReuslt = item.result;
              minDistanceToMid = item.offset;
            }
          })
        }

        //直接返回结果
        return finalReuslt
      },
	//推荐选座,参数是推荐座位数目
      smartChoose: function(num){
        //找到影院座位水平垂直中间位置的后一排
        let rowStart = parseInt((this.seatRow-1)/2,10)+1; //当this.seatRow为单数的时候能更加精确中间的位置
        //先从中间排往后排搜索
      	let backResult = this.searchSeatByDirection(rowStart,this.seatRow-1,num);
      	if(backResult.length>0){
      		this.chooseSeat(backResult);
          return
        }
      	//再从中间排往前排搜索
        let forwardResult = this.searchSeatByDirection(rowStart-1,0,num);
        if(forwardResult.length>0) {
          this.chooseSeat(forwardResult);
          return
        }
        //提示用户无合法位置可选
        alert('无合法位置可选!')

      },

      /*辅助函数，判断每一行座位从i列到j列是否全部空余且连续
       *
       */
      checkRowSeatContinusAndEmpty: function(rowNum,startPos,endPos){
      	  let isValid = true;
          for(let i=startPos;i<=endPos;i++){
          	if(this.seatArray[rowNum][i]!==0){  //因为0的座位是==-1 所以0是没有座位 判断该组的座位都为0
          		isValid=false;
          		break;
            }
          }
          return isValid
      },
      //辅助函数：返回每一行的某个合理位置的座位数组
      generateRowResult: function(row,startPos,endPos){
      	let result = [];
      	for(let i=startPos;i<=endPos;i++){
      		result.push([row,i])
        }
        return result
      },
      //辅助函数:智能推荐的选座操作
      chooseSeat: function(result){
        let oldArray = this.seatArray.slice();
        for(let i=0;i<result.length;i++){
        	//选定座位
        	oldArray[result[i][0]][result[i][1]] = 1
        }
        this.seatArray = oldArray;
        this.className=true
      },

      }
    }
</script>

<style lang="scss">
.cinema{
	width: 100%;
	.cinemaHeard{
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
	.cinemaconter{
		position:fixed;
		top:62px;
		bottom:125px;
		left:0px;
		width:100%;
		background-color: rgb(241,241,241);
		.SeatTitle{
			width:64px;
			height:20px;
			line-height:20px;
			text-align: center;
			margin: 0 auto 15px;
			border: 1px solid #ddd;
			background-color:rgb(244,244,244);
			font-size: 12px;
			color:rgb(187,187,187);
			border-radius: 5px;
		}
		.conterHeard{
			width:248px;
			height:20px;
			margin:0 auto 24px;
			text-align: center;
			line-height:20px;
			border-bottom-left-radius: 20px;
			border-bottom-right-radius: 20px;
			background-color:rgb(220,220,220);
			font-size: 12px;
			color: rgb(255,255,255)
		}
		.conterSeat{
			position:relative;
			width:100%;
			.seatBg{
				width:85%;
				margin: auto;
               .seat{
               	display:inline-block;
                 width:6%;
                 height:24px;
                 margin-left:1%;
                 .inner-seat{
                   width:100%;
                   height:100%;
                   background-image:url('../assets/img/q/a6v.png');
                   background-size:100% 100%;
                 }
                 .inner-seat.bought-seat{
                 	width:100%;
                   height:100%;
                   background-image:url('../assets/img/q/a8a.png');
                   background-size:100% 100%;
                 }
                 .inner-seat.selected-seat{
                 	width:100%;
                   height:100%;
                   background-image:url('../assets/img/q/a8e.png');
                   background-size:100% 100%;
                 }
               }
			}
		}
		.seatNumber{
			width:80%;
			margin:20px auto 0px;
			span{
				display:inline-block;
				margin-right:5px;
		        font-size: 12px;
		        color:rgb(250,122,100)
			}
		}
		.conterBg{
			position:absolute;
			bottom:15px;
			left: 20%;
			display:flex;
			width:260px;
			height:38px;
			.conterBgOne{
				position:relative;
				flex:0 0 1;
				line-height:38px;
				margin-left: 15px;
				i{
					position:absolute;
					top: 8px;
					left: 0px;
					display:inline-block;
					width:22px;
					height:22px;
					background-image: url('../assets/img/q/a6v.png');
					background-size: 22px 22px;
				}
				span{
					display:inline-block;
					margin-left:28px;
				}
			}
			.conterBgThe{
				position:relative;
				flex:0 0 1;
				line-height:38px;
				margin-left: 15px;
				i{
					position:absolute;
					top: 8px;
					left: 0px;
					display:inline-block;
					width:22px;
					height:22px;
					background-image: url('../assets/img/q/a8e.png');
					background-size: 22px 22px;
				}
				span{
					display:inline-block;
					margin-left:28px;
				}
			}
			.conterBgTwo{
				position:relative;
				flex:0 0 1;
				line-height:38px;
				margin-left: 15px;
				i{
					position:absolute;
					top: 8px;
					left: 0px;
					display:inline-block;
					width:22px;
					height:22px;
					background-image: url('../assets/img/q/a8a.png');
					background-size: 22px 22px;
				}
				span{
					display:inline-block;
					margin-left:28px;
				}
			}
		}
	}
	.cinemaBottom{
		position: fixed;
		width:100%;
		bottom:0;
		left: 0;
		width:100%;
		border-top:1px solid #ddd;
		background-color: rgb(255,255,255);
		.bottombtn{
			width:93%;
			height: 56px;
			margin:0 auto 6px;
			text-align: center;
			background-color:rgb(249,224,183);
			font-size: 16px;
			span{
				display: block;
				line-height: 56px;
				color: #fff;
			}
		}
		.bottombtn.bottomb{
				background-color:rgb(250,0,0);
			}
		.bottomTitle{
			display:flex;
			width:93%;
			height:62px;
			margin: auto;
			strong{
				flex:0 0 70px;
				line-height:62px;
			}
			.bottommath{
				flex:1;
				line-height:62px;
				span{
					display:inline-block;
					width:16%;
					height:42px;
					margin-left:5px;
					text-align: center;
					line-height:42px;
					border: 1px solid #ddd;
				}
			}
		}
	}
}
</style>