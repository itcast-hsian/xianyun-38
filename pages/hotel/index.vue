<template>
  <div>
    <h1>高德地图</h1>
    <div id="container"></div> 
  </div>
</template>

<script>
export default {
  mounted(){
    window.onLoad  = function(){
        var map = new AMap.Map('container', {
          zoom:11,//级别
          center: [113.3245904, 23.1066805],//中心点坐标
      });
    }

    var url = 'https://webapi.amap.com/maps?v=1.4.15&key=20918d40bbe868d23b3a148d9b8aebd2&callback=onLoad';
    var jsapi = document.createElement('script');
    jsapi.charset = 'utf-8';
    jsapi.src = url;
    document.head.appendChild(jsapi);
  }
}
</script>

<style scoped>
#container {width:500px; height: 500px; }  
</style>