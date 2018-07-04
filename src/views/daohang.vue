<template>
    <div>
      <my-header >返回</my-header>
      <div class="content">
        <span class="glyphicon glyphicon-circle-arrow-up arrow"></span>
        <canvas id="map" width="300" height="300"></canvas>
        <!--<div class="nextGood">-->
            <!--您距离下个商品——<span style="color: #eb5648;">西瓜</span>  &nbsp;还有<span style="color: #eb5648;">15</span>米-->
        <!--</div>-->
        <div class="cartList">
          <h4>购物车：</h4>
          <ul>
            <li v-for="item in cartList" >
              <img :src="'/static/goodsImg/1.jpg'" alt="商品">
              <span class="goodsName">{{item.name}}</span>
              <span class="goodsPrice">￥{{item.newPrice}}</span>
              <span class="glyphicon glyphicon-trash delete" @click="deleteGoods(item.id,item.newPrice)"></span>
            </li>
            <li v-show="cartList.length==0" style="text-align: center">没有商品啦</li>
          </ul>
        </div>
      </div>
      <my-footer @toDao="end" :price="totalPrice">结束导航 <span class="glyphicon glyphicon-shopping-cart"></span></my-footer>
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
      data(){
          return {
            cartList:[],
            totalPrice:0
          }
      },
      computed:{
        cartId(){
          var cookieArr = document.cookie.split('; ')[1].slice(11);
          return cookieArr;
        }
      },
      mounted(){
        this.drawCanvas();
        if(window.DeviceOrientationEvent){//返回一个DeviceOrientationEvent对象
          window.addEventListener('deviceorientation',this.zhinanzhen,false);///添加监听事件
        }else{
          alert("您的浏览器不支持DeviceOrientation");
        }
          this.getCartItem();

      },
      methods:{
          end(){
            this.$http.post('/api/logout',{trolley_id:this.cartId}).then(res=>{
              if(res.data.code=='1000'){
                this.$toasted.show('感谢您的使用',{position:'top-center',duration:1000});
                document.cookie = 'trolley_id=""';
                setTimeout(()=>{
                  this.$router.push('/');
                },1000)
              }
            });
          },
          getCartItem(){
            this.$http.post('/api/getTrolleyGoods',{trolley_id:this.cartId}).then(res=>{
              var result = res.data;
              if(result.code=='1000'){
                this.cartList = result.trolley_goods; //渲染列表
                this.$store.state.goodsNum = res.data.trolley_goods.length; //商品数量
                  var price = 0;
                this.cartList.forEach(item=>{
                 price+=item.newPrice;
                });
                this.$store.state.amount = price;
              }
                else{
                this.cartList=[];
                this.totalPrice = 0;
                this.$store.state.amount = 0;
                  this.$toasted.show('去选购商品吧',{position:'top-center',duration:1000});
                  setTimeout(() =>{
                    this.$router.push('/search');
                  },1100);
              }
            })
          },
          deleteGoods(id,price){
              this.$http.post('/api/delete_goods',{goods_id:id,trolley_id:this.cartId}).then(res=>{
                let result = res.data;
                if(result.code=='1000'){
                  this.$store.commit('updateNum',-1);
                  this.$toasted.show('删除商品成功',{position:'top-center',duration:1000,type:'success'});
                  this.$store.commit('updateAmount',-price);
                  this.getCartItem();
                }
              })
          },
          zhinanzhen(event){
            let arrow = document.getElementsByClassName('arrow')[0];
            let alpha = event.alpha; //Z轴方向
            let beta = event.beta,//X轴方向
              gamma = event.gamma;//Y轴方向
            if (alpha != null) {
              arrow.style.webkitTransform = "rotate(" + alpha + "deg)";//箭头旋转
            }
          },
          getWS(){
            let url = '';
            let ws = '';
            let ctx = document.getElementById('map').getContext('2d');
            ctx.strokeStyle = '#0000ff';
            ctx.lineWidth = 3;
            if('WebSocket' in window){
              ws = new WebSocket(url);
            }
            else if('MozWebSocket' in window){
              ws = new MozWebSocket(url);
            }
            ws.onopen = function(){
              console.log("已经打开了websocket连接，可以进行实时通信了");
            };
            ws.onmessage = function(e){
              console.log("接受到来自服务器端的数据:"+e.data);
              if(e.data.code=='1000'){
                console.log(e.data);
                ctx.clearRect(0,0,300,300);
                let arr = [
                  {x:290,y:300,ori:'north'},
                  {x:290,y:240,ori:'north'},
                  {x:150,y:240,ori:'west'}
                ];
                for(let i=0;i<arr.length;i++){
                  ctx.moveTo(arr[i].x,arr[i].y);
                  if(arr[i+1]){
                    ctx.lineTo(arr[i+1].x,arr[i+1].y);
                  }
                  ctx.stroke();
                }
              }
            };
            ws.onerror = function(e){
              console.log("websocket连接错误"+e.error);
              ws.close(3000,"websocket连接异常导致的关闭");
            };
            ws.onclose = function(e){
              console.log("websocket关闭连接:"+e.error);
            };
          },
         drawCanvas(){
           let ctx = document.getElementById('map').getContext('2d');
           ctx.strokeStyle = '#0000ff';
           ctx.lineWidth = 3;
           ctx.lineCap="round";
           ctx.clearRect(0,0,300,300);
           var img = new Image();
           var end = new Image();
           let arr = [
             {x:290,y:300,ori:'north'},
             {x:290,y:240,ori:'north'},
             {x:150,y:240,ori:'west'}
           ];
           img.onload = function () {
             ctx.drawImage(img,(arr[0].x-10),(arr[0].y)-10,20,20);
           };
           end.onload = function () {
             ctx.drawImage(end,(arr[arr.length-1].x-15),(arr[arr.length-1].y-12.5),30,25)
           };
           img.src = '/static/images/cart.png';
           end.src = '/static/images/star.png';
           for(let i=0;i<arr.length;i++){
             ctx.moveTo(arr[i].x,arr[i].y);
             if(arr[i+1]){
               ctx.lineTo(arr[i+1].x,arr[i+1].y);
             }
             ctx.stroke();
           }
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
    border: 2px solid #EB5648;
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
    margin-top: 0.18rem;
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
          float: right;
          margin-top: 0.16rem;
        }
      }
    }
  }
}
</style>
