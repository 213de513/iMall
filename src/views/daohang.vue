<template>
    <div>
      <my-header >返回</my-header>
      <div class="content">
        <span class="glyphicon glyphicon-circle-arrow-up arrow"></span>
        <canvas id="map"></canvas>
        <div class="nextGood">
            您距离下个商品——<span style="color: #eb5648;">西瓜</span>  &nbsp;还有<span style="color: #eb5648;">15</span>米
        </div>
        <div class="cartList">
          <h4>购物车：</h4>
          <ul>
            <li>
              <img src="/static/images/goods.jpg" alt="商品">
              <span class="goodsName">天润风味发酵乳巴拉巴拉</span>
              <span class="goodsPrice">￥8.9</span>
              <span class="glyphicon glyphicon-trash delete"></span>
            </li>
            <li>
              <img src="/static/images/goods.jpg" alt="商品">
              <span class="goodsName">天润风味发酵乳巴拉巴拉</span>
              <span class="goodsPrice">￥8.9</span>
              <span class="glyphicon glyphicon-trash delete"></span>
            </li>
            <li>
              <img src="/static/images/goods.jpg" alt="商品">
              <span class="goodsName">天润风味发酵乳巴拉巴拉</span>
              <span class="goodsPrice">￥8.9</span>
              <span class="glyphicon glyphicon-trash delete"></span>
            </li>
            <li>
              <img src="/static/images/goods.jpg" alt="商品">
              <span class="goodsName">天润风味发酵乳巴拉巴拉</span>
              <span class="goodsPrice">￥8.9</span>
              <span class="glyphicon glyphicon-trash delete"></span>
            </li>
          </ul>
        </div>
      </div>
      <my-footer @toDao="end">结束导航 <span class="glyphicon glyphicon-shopping-cart"></span></my-footer>
    </div>
</template>

<script>
  import myHeader from '../components/myHeader'
  import myFooter from '../components/goodsFooter'
    export default {
        name: "daohang",
      components:{
        myHeader,
        myFooter
      },
      methods:{
          end(){
            this.$toasted.show('感谢您的使用，再见',{position:'top-center',duration:1000});
            setTimeout(()=>{
              this.$router.push('/');
            },1000)
          }
      }
    }
</script>

<style scoped lang="less">
.content{
  padding: 0.1rem;
  background-color: #fff;
  min-height: 90vh;
  position: relative;
  .arrow{
    position: absolute;
    top: 0.2rem;
    right: 0.43rem;
    color: #6B80F2;
  }
  #map{
    display: block;
    width: 3rem;
    height: 3rem;
    margin: 0 auto;
    background: url("/static/images/map.png") no-repeat ;
    background-size: cover;
  }
  .nextGood{
    height: 0.57rem;
    line-height: 0.57rem;
    font-size: 0.16rem;
    border-radius: 0.08rem;
    border: 1px solid #EB5648;
    margin: 0.18rem 0;
    padding: 0 0.24rem;
    font-weight: bold;
  }
  .cartList{
    padding: 0.2rem;
    border: 1px solid #EB5648;
    border-radius: 0.08rem;
    margin-bottom: 0.5rem;
    h4{
      font-size: 0.18rem;
      font-weight: bolder;
      margin-bottom: 0.2rem;
    }
    ul{
      li{
        padding: 0.1rem;
        height: 0.7rem;
        border: 1px solid #bbb;
        border-radius: 0.08rem;
        font-size: 0.14rem;
        line-height: 0.5rem;
        margin-bottom: 0.1rem;
        img{
          height: 0.5rem;
          width: 0.5rem;
          float: left;
        }
        .goodsName{
          display: inline-block;
          width: 1.08rem;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          float: left;
          margin-left: 0.2rem;
          color: #EB5648;
        }
        .goodsPrice{
          color: #EB5648;
          font-weight: bolder;
          margin-left: 0.2rem;
        }
        .delete{
          font-size: 0.18rem;
          margin-left: 0.2rem;
          color: #aaa;
        }
      }
    }
  }
}
</style>
