<template>
	<div class="movie">
		<div class="movie-box">
			<div class="city">
         <router-link to="/city">
				<span>
          {{city}}
            <i></i>
        </span>
         </router-link>
			</div>
			<div class="message">
			 <router-link to="/movie/undarway">
				<div class="messleft">
					<span>
          正在热映
           <i></i>
          </span>
				</div>
			</router-link>
			 <router-link to="/movie/upcoming">
				<div class="messright">
					<span>
          即将上映
            <i></i>
          </span>
				</div>
			</router-link>
			</div>
			<div class="search">
         <router-link :to="{name:'Discuss',params:{addsub}}">
				<span></span>
      </router-link>
			</div>
		</div>
		<router-view :undarway="subjects" :upcoming="subJects"/>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				subjects:[],
        name:"深圳",
        city:null,
        subJects:[],
        addsub:[]
			}
		},
   created(){ //生命周期
      if(this.$route.params.item){
      this.name=this.$route.params.item.nm
    } 
    if(this.$route.params.vall){
      this.name=this.$route.params.vall
    }else{
      this.name
    }
   	this.$axios.get('/api',{params:{name:this.name}})
   	.then(res=>{
      res=res.data //返回res.json({})
      console.log(res)
      let ressult=JSON.parse(res.text)
      console.log(ressult)
      this.subjects=ressult.subjects
      console.log(this.subjects)
      let title=ressult.title.split('-')
      this.city=title[1]
      console.log(this.city)
      this.$router.replace('/movie/undarway')
      this.addsub.push(this.subjects)
  })
        
    this.$axios.get('/api/index',{params:{name:this.name}})
    .then(res=>{
      res=res.data //返回res.json({})
      console.log(res)
      let ressult=JSON.parse(res.text)
      console.log(ressult)
      this.subJects=ressult.subjects
      console.log(this.subJects)
       this.addsub.push(this.subJects)
  })
   
    console.log(this.addsub)
   },
}
</script>

<style lang="scss">
@import "../assets/sass/mixin";
.movie{
  position:fixed;
  top: 0;
  left: 0;
  width:100%;
  height:62px;
  background-color: rgb(250,250,250);
   @include border-bottom-1px(rgb(217,217,217));
  .movie-box{
   display:flex;
   width:100%;
    height:62px;
   line-height: 62px;
   .city{
     flex:0 0 25%;
    text-align: center; 
    display:inline-block;
    font-size: 18px;
    color: rgb(121,121,121);
    padding-left:5%;
    text-align:left;
    span{
      position:relative;
       i{
      position:absolute;
      top:4px;
      left:38px;
      background-image: url("../assets/img/q/a1o.png");
      background-size: 12px 18px;
      display:inline-block;
      width:12px;
      height:18px;
    }
    }
  
   }
   .message{
   	  flex:0 0 50%;
   	display:inline-block;
   	 font-size: 18px;
   	 font-weight: bold;
    .router-link-active{
    	span{
    		color:rgb(228,73,79);
    	}
       i{
       	background-image: url("../assets/img/p/auq.png");
    	background-size: 33px 6px;
       }
     }
   	.messleft{
   		display:inline-block;
   		width:40%;
   	   color: rgb(97,97,97);
       span{
          position:relative;
        i{
        position:absolute;
        top:36px;
        left:30%;
        display:block;
        width:33px;
        height:6px;
      }
       }
   	}
    .messright{
   		display:inline-block;
   		width:52%;
   		color: rgb(97,97,97);
      span{
        position:relative;
      i{
        position:absolute;
        top:36px;
        left:30%;
        display:block;
        width:33px;
        height:6px;
      }
      }
   	}
   }
   .search{
    flex:0 0 25%;
     margin: auto;
   	display:inline-block;
   	span{
   		background-image:url("../assets/img/q/a3t.png");
   		background-size: 32px 32px;
   		display:block;
   		width:29px;
   		height:24px;
   		margin:0 auto;
   	}
   }
  }
}
</style>