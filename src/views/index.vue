<template>
<div class="index">
  <my-header></my-header>
  <div class="content"  @click="mdShow = true">

  </div>
  <div class="model" v-show="mdShow" @click.stop="mdShow = false">
  </div>
  <div class="input" v-show="mdShow">
    <label for="cartNum">输入购物车编号:  &nbsp;</label><input type="text" class="form-control" id="cartNum" v-model="cartNum">
    <button @click="toSearch">绑定购物车</button>
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
            cartNum:'',
            mdShow:false
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
            this.$http.post('/api/login',{cartId:this.cartNum}).then(res=>{
              let result = res.data;
              if(result.status==0){
                this.cartNum ='';
                this.mdShow = false;
                this.$toasted.show('购物车绑定成功',{position:'top-center',duration:1000,type:'success'});
                setTimeout(()=> {
                  this.$router.push('/search');
                },1200);
              }else if(result.status==2){
                this.$toasted.show('没有该购物车',{position:'top-center',duration:1000,type:'error'});
                this.cartNum='';
              }
            })

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
  }
  .model{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.6);
    min-height: 100vh;
  }
  .input{
    padding: 0.2rem 0.1rem;
    background-color: #fff;
    height: 1.5rem;
    width: 3rem;
    font-size: 0.14rem;
    position: absolute;
    top: 30%;
    left: 50%;
    margin-left: -1.5rem;
    button{
      display: block;
      width: 1rem;
      height: 0.4rem;
      background-color: #eb5648;
      color:white ;
      border-radius: 8px;
      margin: 0.1rem auto;
    }
  }
}
</style>
