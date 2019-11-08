<template>
  <div>
    <!-- 公共的头部组件 -->
    <Header/>

    <!-- router-view: 显示路由匹配到组件, nuxt组件就是router-view -->
    <nuxt />
  </div>
</template>

<script>
import Header from "@/components/header"

export default {
  // 注册组件
  components: {
    Header
  }
}
</script>

<style>
*{
  margin:0;
  padding:0;
}

a{
  color:inherit;
  text-decoration: none;
}

ul, li, ol{
  list-style: none;
}

em,i{
  font-style: normal;
}
</style>
