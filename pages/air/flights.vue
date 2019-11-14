<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <div>
                    
                </div>
                
                <!-- 航班头部布局 -->
                <FlightsListHead/>
                
                <!-- 航班信息 -->
                <FlightsItem 
                v-for="(item, index) in dataList"
                :key="index"
                :data="item"
                />

                <!-- 分页组件 -->
                <!-- size-change: 切换条数时候触发的事件 -->
                <!-- current-change：页数切换时候触发的事件 -->
                <!-- current-page: 当前页数 -->
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageIndex"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
            </div>
        </el-row>
    </section>
</template>

<script>
import FlightsListHead from "@/components/air/flightsListHead"
import FlightsItem from "@/components/air/flightsItem"

export default {
    data(){
        return {
            // 总数据，包含了 flights， info， options，flights用来渲染航班列表
            flightsData: {
                flights: []
            },
            // 保存当前的分页要渲染的数组,已经在computed里来计算生成
            //dataList: [],

            // 分页的变量
            pageIndex: 1,
            pageSize: 5,
            total: 0
        }
    },

    components: {
        FlightsListHead,
        FlightsItem
    },

    computed:{
        // 保存当前的分页要渲染的数组
        // ！！computed会监听函数引用所有实例下的属性，一旦属性发生了变化就会再次执行函数，返回新的值
        dataList(){
            const arr = this.flightsData.flights.slice(
                (this.pageIndex - 1 ) * this.pageSize,
                this.pageIndex * this.pageSize
            );

            return arr;
        }
    },

    methods: {
        // 分页切换条数时候触发
        handleSizeChange(val){
            // 修改显示的条数
            this.pageSize = val;
        },

        // 切换页数时候触发
        handleCurrentChange(val){
            // 修改当前的页面
            this.pageIndex = val;
        },
    },

    mounted(){
        // 请求机票列表数据
        this.$axios({
            url: "/airs",
            params: this.$route.query
        }).then(res => {
            // 总数据，包含了 flights， info， options，flights用来渲染航班列表
            const {data} = res;
            this.flightsData = data;
            
            // 数据的总条数
            this.total = this.flightsData.total;
        })
    }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>