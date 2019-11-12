<template>
    <div class="search-form">

        <!-- 头部tab切换 -->
        <el-row type="flex" class="search-tab">
            <span v-for="(item, index) in tabs" 
            :key="index"
            @click="handleSearchTab(item, index)"
            :class="{active: index === currentTab}">
                <i :class="item.icon"></i>{{item.name}}
            </span>
        </el-row>

        <!-- 搜索表单 -->
        <el-form class="search-form-content" ref="form" label-width="80px">
            <el-form-item label="出发城市">

                <!-- fetch-suggestions：输入框文字变化时候就会触发，类似input事件 -->
                <!-- select: 选中下拉列表数据时候触发 -->
                <el-autocomplete
                v-model="form.departCity"
                :fetch-suggestions="queryDepartSearch"
                placeholder="请搜索出发城市"
                @select="handleDepartSelect"
                class="el-autocomplete"
                ></el-autocomplete>
            </el-form-item>
            
            <el-form-item label="到达城市">
                <el-autocomplete
                :fetch-suggestions="queryDestSearch"
                placeholder="请搜索到达城市"
                @select="handleDestSelect"
                class="el-autocomplete"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="出发时间">
                <!-- change 用户确认选择日期时触发 -->
                <el-date-picker type="date" 
                placeholder="请选择日期" 
                style="width: 100%;"
                @change="handleDate">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="">
                <el-button style="width:100%;" 
                type="primary" 
                icon="el-icon-search"
                @click="handleSubmit">
                    搜索
                </el-button>
            </el-form-item>
            <div class="reverse">
                <span @click="handleReverse">换</span>
            </div>
        </el-form>  
      </div>
</template>

<script>
export default {
    data(){
        return {
            tabs: [
                {icon: "iconfont icondancheng", name: "单程"},
                {icon: "iconfont iconshuangxiang", name: "往返"}
            ],
            currentTab: 0,
            // 表单数据
            form: {
                departCity: "" ,// 出发城市
                departCode: "",
                destCity: "" , // 目标城市
                destCode: "",
                departDate: ""
            }
        }
    },
    methods: {
        // tab切换时触发
        handleSearchTab(item, index){
            
        },
        
        // 出发城市输入框的输入事件，根据输入的关键字请求接口返回相关城市。
        // value: 是输入框的值
        // cb：是回调函数，调用函数时候必须要传入一个数组
        // cb参数的数组的元素 (必须是一个对象，对面里面必须包含value值)
        queryDepartSearch(value, cb){
            // 如果输入框数据为空，返回空列表
            if(!value.trim()){
                return cb([]);
            }

            this.$axios({
                url: "/airs/city",
                params: { 
                    name:value
                }
            }).then(res => {
                // data是城市列表
                const {data} = res.data;

                // map循环数组
                const newData = data.map(v => {
                     v.value = v.name.replace("市", "");
                    return v;
                })

                cb(newData)
            })
        },

        
        queryDestSearch(value, cb){
            cb([
                {value: 1},
                {value: 2},
                {value: 3},
            ]);
        },
       
        // 出发城市下拉选择时触发
        // item: 选中的下拉列表的数据
        handleDepartSelect(item) {
            console.log(item)
        },

        // 目标城市下拉选择时触发
        handleDestSelect(item) {
            
        },

        // 确认选择日期时触发
        handleDate(value){
           
        },

        // 触发和目标城市切换时触发
        handleReverse(){
            
        },

        // 提交表单是触发
        handleSubmit(){
           
        }
    },
    mounted() {
       
    }
}
</script>

<style scoped lang="less">
.search-form{
    border:1px #ddd solid;
    border-top:none;
    width:360px;
    height:350px;
    box-sizing: border-box;
}

.search-tab{
  span{
    display: block;
    flex:1;
    text-align: center;
    height:48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top:3px #eee solid;
    background:#eee;
  }

  .active{
    border-top-color: orange;
    background:#fff;
  }

  i{
    margin-right:5px;
    font-size: 18px;

    &:first-child{
      font-size:16px;
    }
  }
}

.search-form-content{
  padding:15px 50px 15px 15px;
  position: relative;

  .el-autocomplete{
    width: 100%;
  }
}

.reverse{
  position:absolute;
  top: 35px;
  right:15px;

  &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:-35px;
      width:25px;
      height:1px;
      background:#ccc;
  }

  &:after{
      top:0;
    }

    &:before{
      top:60px;
    }

  span{
    display: block;
    position:absolute;
    top: 20px;
    right:0;
    font-size:12px;
    background: #999;
    color:#fff;
    width:20px;
    height:20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:10px;
      width:1px;
      height:20px;
      background:#ccc;
    }

    &:after{
      top:-20px;
    }

    &:before{
      top:20px;
    }
  }
}
</style>
