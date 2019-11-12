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
                @blur="handleDepartBlur"
                ></el-autocomplete>
            </el-form-item>
            
            <el-form-item label="到达城市">
                <el-autocomplete
                v-model="form.destCity"
                :fetch-suggestions="queryDestSearch"
                placeholder="请搜索到达城市"
                @select="handleDestSelect"
                class="el-autocomplete"
                @blur="handleDestBlur"
                ></el-autocomplete>
            </el-form-item>

            <el-form-item label="出发时间">
                <!-- change 用户确认选择日期时触发 -->
                <el-date-picker 
                v-model="form.departDate"
                type="date" 
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
import moment from "moment";

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
            },

            // 出发城市列表
            departCities: [],
            destCities: []
        }
    },
    methods: {
        // tab切换时触发
        handleSearchTab(item, index){
            if(index === 1){
                this.$alert("目前暂时不支持往返", "提示", {
                    type: "warning"
                })
            }
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
                this.departCities = data.map(v => {
                     v.value = v.name.replace("市", "");
                    return v;
                })

                cb(this.departCities)
            })
        },

        // 出发城市输入框失去焦点时候触发
        handleDepartBlur(){
            if(this.departCities.length === 0 ) return;
            // 用于认为输入是正确的，没有选中下拉框，所以需要默认选中第一个
            this.form.departCity = this.departCities[0].value;
            this.form.departCode = this.departCities[0].sort;
        },

        // 到达城市搜索
        queryDestSearch(value, cb){
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
                this.destCities = data.map(v => {
                     v.value = v.name.replace("市", "");
                    return v;
                })

                cb(this.destCities)
            })
        },

        // 出发城市输入框失去焦点时候触发
        handleDestBlur(){
            if(this.destCities.length === 0 ) return;
            // 用于认为输入是正确的，没有选中下拉框，所以需要默认选中第一个
            this.form.destCity = this.destCities[0].value;
            this.form.destCode = this.destCities[0].sort;
        },

       
        // 出发城市下拉选择时触发
        // item: 选中的下拉列表的数据
        handleDepartSelect(item) {
            this.form.departCity = item.value;
            this.form.departCode = item.sort;
        },

        // 目标城市下拉选择时触发
        handleDestSelect(item) {
            this.form.destCity = item.value;
            this.form.destCode = item.sort;
        },

        // 确认选择日期时触发
        handleDate(value){
            // moment是一个方法，可以传递时间Date对象。如果不传递参数就会获取当前的时间
            this.form.departDate = moment(value).format("YYYY-MM-DD")
        },

        // 触发和目标城市切换时触发
        handleReverse(){
            // 把form的出发城市和到达城市交叉赋值
            const {departCity, departCode, destCity, destCode} = this.form;

            this.form.departCity = destCity;
            this.form.departCode = destCode;

            this.form.destCity = departCity;
            this.form.destCode = departCode;
        },

        // 提交表单是触发
        handleSubmit(){
            // 需要验证的表单字段
            const rules = [
                { value: this.form.departCity, message: "请输入出发城市" },
                { value: this.form.destCity, message: "请输入到达城市" },
                { value: this.form.departDate, message: "请选择出发时间" },
            ]

            let valid = true;
            rules.forEach(v => {
                // 只要有一个条件不满足，终止循环
                if(!valid) return;
                // 如果有一个输入框的值是空的
                if(!v.value){
                    // 提示错误
                    this.$alert(v.message, "提示")
                    valid = false;
                }
            })

            // 只要有一个条件不满足，禁止跳转
            if(!valid) return;

            // 跳转到机票列表页
            this.$router.push({
                path: "/air/flights",
                query: this.form
            })
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
