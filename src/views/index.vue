<template>
<div class="index">
  <my-header></my-header>
  <div class="content" >
    <div class="input">
      <label for="cartNum">输入购物车编号:  &nbsp;</label><input type="text" id="cartNum" v-model="cartNum">
    </div>
    <div class="gogogo" @click.defautl="toSearch">
    </div>
  </div>
  <my-footer></my-footer>
</div>
</template>

<script>
  import myHeader from '../components/myHeader'
  import myFooter from '../components/myFooter'
    export default {
        name: "index",
      data(){
          return {
            cartNum:''
          }
      },
      components:{
          myHeader,
        myFooter
      },
      methods:{
        toSearch(){
          if(this.cartNum ===''){
            this.$toasted.show('购物车编号不能为空',{position:'top-center',duration:1000});
          }else{
            this.$router.push('/search')
          }
        }
      }
    }
</script>

<style scoped lang="less">
.index{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  .content{
    flex: 1;
    background: url('/static/images/1.gif') no-repeat top;
    background-size: contain;
    position: relative;
    .input{
      position: absolute;
      top: 1.42rem;
      left: 0.39rem;
      font-size: 0.14rem;
      color: #101010;
      font-weight: bold;

      #cartNum{
        outline: none;
        border-radius: 8px;
        padding-left: 0.1rem;
        box-shadow: none;
        height: 0.24rem;
        border: 1px solid #eee;
        &:focus{
          border-color: #66afe9;
          outline: 0;
          box-shadow: 0 0 8px rgba(102,175,233,0.6);
        }
      }
    }
    .gogogo{
      width: 100%;
      height: 0.5rem;
      position: absolute;
      top: 4.6rem;
      left: 0;
    }
  }
}
</style>
