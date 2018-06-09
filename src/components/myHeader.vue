<template>
    <div class="myHeader">
      <div class="back" @click="goBack">
        <slot ></slot>
      </div>

     iMall超市导航
    </div>
</template>

<script>
    export default {
        name: "myHeader",
      methods:{
        goBack(){
          history.go(-1);
        }
      }
    }
</script>

<style scoped lang="less">
.myHeader{
  height: 0.5rem;
  background-color: #EB5648;
  font-size: 0.18rem;
  color: #ffffff;
  line-height: 0.5rem;
  text-align: center;
  position: relative;
  .back{
    position: absolute;
    top: 0;
    left: 0.22rem;
    font-size: 0.14rem;
  }
}
</style>
