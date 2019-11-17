<template>
  <div style="padding: 50px;">

    <Item :list="list"/>

  </div>
</template>

<script>
import Item from "@/components/post/item"
export default {
    // 递归的重点在于找到数据的规则
    data(){
      return {
        // 下面这个数据就是判断是否有children属性，把children列表循环渲染出来
        list: [
          {
            name: "衣服",
            children: [
              {
                name: "男装",
                children: [
                  { name: "上衣" , children: [ {name: "衬衫"} ]},
                  { name: "裤子" }
                ]
              },
              {
                name: "女装",
                children: [
                  { name: "裙子" },
                  { name: "短裤" }
                ]
              }
            ]
          }, 
          {
            name: "电器",
            children: [
              { name: "电视" },
              { name: "空调" },
              { name: "洗衣机" }
            ]
          }
        ]
      }
    },

    components: {
      Item
    }
}
</script>

<style>

</style>