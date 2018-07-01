<template>
    <div id="search">
      <my-header >返回</my-header>
      <div class="search-bar">
        <span class="glyphicon glyphicon-search"></span>
        <input type="text" placeholder="请输入商品名称" class="form-control search">
        <button>搜索</button>
      </div>
      <h3 class="title">推荐商品</h3>
      <ul class="itemList">
        <li v-for="item in goodsList">
          <img v-lazy="'/static/goodsImg/'+item.productImage" alt="商品图片">
          <div class="goodsItem">
              <h4>{{item.productName}}</h4>
              <p>来自新疆的网红酸奶</p>
              <div class="price">
                <span class="now">￥{{item.salePrice}}</span>
                <span class="ago">￥11.9</span>
              </div>
            <img src="/static/images/cart.png" alt="加入购物车" class="putCart" @click="addCart(item.productId,item.salePrice)">
          </div>
        </li>
      </ul>
      <my-footer @toDao="go" :price="totalPrice"></my-footer>
    </div>
</template>

<script>
  import myHeader from '../components/myHeader'
  import myFooter from '../components/goodsFooter'
    export default {
        name: "search",
      data(){
          return {
            goodsList:[],
            totalPrice:0
          }
      },
      components:{
        myHeader,
        myFooter
      },
      mounted(){
          this.getGoodList();
          this.getGoodsNum();
      },
      methods:{
         go(){
           if(this.$store.state.goodsNum==0){
             this.$toasted.show('购物车里还没东西',{position:'top-center',duration:1000});
             return false;
           }
           this.$router.push('/daohang')
         },
        getGoodList(){
            this.$http.get('/api/goods/goodsList').then(res=>{
              let result = res.data;
              if(result.status == 0){
                this.goodsList = result.result;
              }
            })
        },
        addCart(id,price){
          this.$http.post('/api/goods/addCart',{productId:id}).then(res=>{
            var result = res.data;
            if(result.status==0){
              this.$store.commit('updateNum',1);
              this.totalPrice+=price;
              this.$toasted.show('加入购物车成功',{position:'top-center',duration:1000,type:'success'});
            }else if(result.status==3){
              this.$toasted.show(result.msg,{position:'top-center',duration:1000,type:'error'});
            }
          })
        },
        getGoodsNum(){
          this.$http.get('/api/goods/cartNum').then(res=>{
            this.$store.state.goodsNum = res.data.result.length;
            res.data.result.forEach(item=>{
              this.totalPrice +=item.salePrice
            })
          })
        }
      }
    }
</script>

<style scoped lang="less">
  #search{
    min-height: 100vh;
    .search-bar{
      height: 0.46rem;
      border-bottom: 2px solid #EB5648;
      padding: 0.08rem 0.4rem;
      background-color: #fff;
      font-size: 0.14rem;
      position: relative;
      span{
        position: absolute;
        top: 0.16rem;
        left: 0.48rem;
        font-size: 0.16rem;
        color: #AAAAAA
      }
      .search{
        width: 2rem;
        height: 0.3rem;
        padding-left: 0.3rem;
        display: inline-block;
        border-radius: 8px;
      }
      button{
        height: 0.3rem;
        width: 0.6rem;
        color: white;
        text-align: center;
        line-height: 0.3rem;
        background-color: #EB5648;
        border-radius: 4px;
        margin-left:0.2rem;
      }
    }
    .title{
      font-size: 0.2rem;
      margin: 0.19rem 0.2rem;
      font-weight: bold;
    }
    ul{
      padding: 0 0.1rem;
      li{
        height: 1.6rem;
        border: 1px solid #bbb;
        box-shadow: 0 0 8px #aaa;
        margin-bottom: 0.17rem;
        padding: 0.2rem ;
        background-color: #fff;
        img{
          height: 1.1rem;
          width: 1.1rem;
          float: left;
        }
        .goodsItem{
          height: 1.2rem;
          width: 2rem;
          float: right;
          position: relative;
          h4{
            font-size: 0.18rem;
            font-weight: normal;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            line-height: 0.26rem;
          }
          p{
            color: #EB5648;
            font-size: 0.14rem;
            line-height: 0.4rem;
          }
          .price{
            font-size: 0.16rem;
            margin-top: 0.2rem;
            .now{
              color: #EB5648;
              font-weight: bolder;
            }
            .ago{
              font-size: 0.14rem;
              color: #aaa;
              text-decoration: line-through;
            }
          }
          .putCart{
            height: 0.5rem;
            width: 0.5rem;
            position: absolute;
            right: 0;
            bottom: 0;
          }
        }
        &:last-child{
          margin-bottom: 1rem;
        }
      }
    }

  }
</style>
