<template>
  <div style="padding: 100px;">
      <div style="margin-bottom:20px">
          <button 
          v-for="(item, index) in ['新闻', '娱乐', '体育']"
          :key="index"
          @click="handleClick(index)"
          :class="{ active: current === index }"
          >{{item}}</button>
      </div>

        <div v-if="current === 0">
            <ul>
                <li>新闻列表</li>
                <li>新闻列表</li>
                <li>新闻列表</li>
            </ul>
        </div>
        <div v-if="current === 1">
            <ul>
                <li>娱乐列表</li>
                <li>娱乐列表</li>
                <li>娱乐列表</li>
            </ul>
        </div>
        <div v-if="current === 2">
            <ul>
                <li>体育新闻</li>
                <li>体育新闻</li>
                <li>体育新闻</li>
            </ul>
        </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            // 当前高亮的索引
            current: 0
        }
    },

    methods: {
        // 点击事件
        handleClick(index){
            this.current = index;
        }
    }
}
</script>

<style scoped>

    .active{
        color:red;
    }

</style>