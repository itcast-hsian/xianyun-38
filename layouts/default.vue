<template>
  <div>
    <!-- 公共的头部组件 -->
    <Header/>

    <!-- router-view: 显示路由匹配到组件, nuxt组件就是router-view -->
    <nuxt />

    <!-- 公共页脚组件 -->
    <Footer/>
  </div>
</template>

<script>
import Header from "@/components/header"
import Footer from "@/components/footer"
export default {
  // 注册组件
  components: {
    Header,
    Footer
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
