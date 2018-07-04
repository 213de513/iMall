<template>
    <div class="goods-footer">
      商品数量：<span class="goodsNum">{{goodsNumber}}</span>&nbsp;总金额：<span class="totlePrice">￥{{amount}}</span>
      <button class="toDao" @click="toDao">
        <slot>开始导航 <span class="glyphicon glyphicon-shopping-cart"></span></slot>
      </button>
    </div>
</template>

<script>
    export default {
        name: "goods-footer",
      methods:{
          toDao(){
            this.$emit('toDao');
          }
      },
      props:['price'],
      computed:{
          goodsNumber(){
            return this.$store.state.goodsNum
          },
        amount(){
            return this.$store.state.amount
        }
      }
    }
</script>

<style scoped lang="less">
.goods-footer{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0.5rem;
  line-height: 0.5rem;
  font-size: 0.14rem;
  padding:0 0.15rem;
  border-top: 1px solid #EB5648;
  font-weight: bold;
  background-color: #fff;
  .goodsNum{
    color: #EB5648;
  }
  .totlePrice{
    color: #EB5648;
  }
  .toDao{
    height: 0.31rem;
    color: white;
    background-color:#EB5648;
    font-size: 0.14rem;
    width: 1.08rem;
    text-align: center;
    border-radius: 0.04rem;
    line-height: 0.31rem;
    font-weight: normal;
    margin-left: 0.1rem;
    float: right;
    margin-top: 0.08rem;
  }
}
</style>
