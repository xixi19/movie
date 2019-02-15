<template>
  <div id="app">
    <div class="tabs">
      <div class="tab-item">
        <router-link to="/movie">
         <i class="boxa"></i>
         <span>电影</span>
       </router-link>
     </div>
     <div class="tab-item">
      <router-link to="/cinema">
       <i class="boxb"></i>
       <span>影院</span>
     </router-link>
   </div>
   <div class="tab-item">
    <router-link to="/mine">
     <i class="boxd"></i>
     <span>我的</span>
   </router-link>
 </div>
</div>
<keep-alive include="Mine">
  <!-- 将缓存组件name为a或者b的组件，结合动态组件使用 -->
<router-view/>
</keep-alive>
</div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>
<style lang="scss">
#app {
  position:fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.tabs {
  position:fixed;
  bottom: 0;
  left:0;
  display: flex;
  width: 100%;
  border: 1px solid rgba(7, 17, 27, 0.1);

  .tab-item {
    flex: 1;
    height:47px;
    line-height: 47px;
    margin-top: 11px;
    font-size: 0;
    text-align: center;

    & > a {
      display: inline-block;
      width: 100%;
      height: 100%;
      color: rgb(77, 85, 93);
      i{
        background-size: 28px 29px;
        display:block;
        width:28px;
        height:29px;
        margin:0 auto;
      }
      .boxa{
        background-image: url("assets/img/p/a0m.png");
        background-size: 28px 29px;
      }
      .boxb{
        background-image: url("assets/img/p/xr.png");
        background-size: 28px 29px;
      }
      .boxd{
        background-image: url("assets/img/p/a09.png");
        background-size: 28px 29px;
      }
      span{
        display:block;
        font-size: 12px;
        width:28px;
        line-height:12px;
        height:12px;
        margin:0 auto;

      }
    }

    & > .router-link-active {
      color: rgb(240, 20, 20);
      .boxa{
        background-image: url("assets/img/p/a0l.png");
      }
      .boxb{
        background-image: url("assets/img/p/xq.png");
      }
      .boxd{
        background-image: url("assets/img/p/a08.png");
      }
    }
  }
}
</style>
