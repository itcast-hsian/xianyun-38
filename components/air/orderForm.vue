<template>
    <div class="main">
        <div class="air-column">
            <h2>剩机人</h2>
            <el-form class="member-info">

                <!-- 乘机人信息列表，根据人数循环这个div -->
                <div class="member-info-item" 
                v-for="(item, index) in form.users"
                :key="index">
                    <el-form-item label="乘机人类型">
                        <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
                            <el-select 
                            slot="prepend" 
                            value="1" 
                            placeholder="请选择">
                                <el-option label="成人" value="1"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="证件类型">
                        <el-input 
                        placeholder="证件号码"  class="input-with-select" v-model="item.id">
                            <el-select 
                            slot="prepend" 
                            value="1"           
                            placeholder="请选择">
                                <el-option label="身份证" value="1" :checked="true"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>
                    
                    <!-- 删除乘机人，第一个乘机人不显示该按钮 -->
                    <span class="delete-user" @click="handleDeleteUser(index)">-</span>
                </div>
            </el-form>

            <!-- 添加乘机人 -->
            <el-button class="add-member" type='primary' @click="handleAddUsers">添加乘机人</el-button>
        </div>

        <div class="air-column">
            <h2>保险</h2>
            <div>
                <!-- 循环渲染保险的数据，数据来源于后台 -->
                <div 
                class="insurance-item"
                 v-for="(item, index) in infoData.insurances"
                :key="index">
                    <el-checkbox 
                    @change="handleInsurance(item.id)"
                    :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`" 
                    border>
                    </el-checkbox> 
                </div>
            </div>
        </div>

        <div class="air-column">
            <h2>联系人</h2>
            <!-- 联系人信息 -->
            <div class="contact">
                <el-form label-width="60px">
                    <el-form-item label="姓名">
                        <el-input v-model="form.contactName"></el-input>
                    </el-form-item>

                    <el-form-item label="手机">
                        <el-input placeholder="请输入内容" v-model="form.contactPhone">
                            <template slot="append">
                            <el-button @click="handleSendCaptcha">发送验证码</el-button>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="验证码">
                        <el-input v-model="form.captcha"></el-input>
                    </el-form-item>
                </el-form>   
                <!-- 提交订单 -->
                <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
            </div>
        </div>

        <span v-show="false">{{allPrice}}</span>
    </div>
</template>

<script>
export default {
    data(){
        return {
            form: {
                // 用户列表，至少有一项
                users: [
                    { 
                        username: "",
                        id: ""
                    }
                ],
                // 保险id集合
                insurances: [],
                contactName: "",    // 联系人姓名
                contactPhone: "",   // 联系人电话
                captcha: "",        // 手机验证码
                invoice: true,      // 发票，默认false
                seat_xid: "",       // 座位id
                air: ""             // 航班id
            },

            // 当前机票的信息
            infoData: {}
        }
    },

    computed: {
        // 计算总金额
        allPrice(){
            if(!this.infoData.seat_infos) return;
            // 总金额
            let price = 0;
            // 单价
            price += this.infoData.seat_infos.org_settle_price;
            // 基建燃油费
            price += this.infoData.airport_tax_audlet;
            // 保险
            price += this.form.insurances.length * 30;
            // 乘以人数
            price *= this.form.users.length;
            // 保存到store对的allPrice
            this.$store.commit("air/setAllPrice", price)

            return "";
        }
    },

    methods: {
        // 添加乘机人
        handleAddUsers(){
            this.form.users.push({
                username: "",
                id: ""
            })
        },
        
        // 移除乘机人
        handleDeleteUser(index){
            // slice,splice,split 要区分好
            this.form.users.splice(index, 1);
        },

        // 选中保险选项时候触发
        handleInsurance(id){
            // 先判断是否已经选中过该保险
            const index = this.form.insurances.indexOf(id);

            if(index > -1){
                //如果已经选中了，就要删除该保险
                 this.form.insurances.splice(index, 1);
            }else{
                // 如果没有选中就添加该保险id
                this.form.insurances.push(id);
            }
        },
        
        // 发送手机验证码
        async handleSendCaptcha(){
            // 判断是否有手机号码
            if(!this.form.contactPhone){
                this.$message.error("请输入手机号码")
                return;
            }

            // 调用store下actions的发送手机验证码的方法
            const code = await this.$store.dispatch("user/sendCaptcha", this.form.contactPhone);
            this.$message.success("模拟的手机验证码是：" + code)
        },

        // 提交订单
        handleSubmit(){
            // 修改座位id和航班的id, id:air是声明了别名
            const {id: air, seat_xid} = this.$route.query;

            this.form = {
                ...this.form,
                air,
                seat_xid
            }

            // 可以自己添加表单验证，如果验证不通过的话不提交

            // 提交订单
            this.$axios({
                url: "/airorders",
                method: "POST",
                data: this.form,
                headers: {
                    // Bearer属于jwt的token标准
                   Authorization: "Bearer " + this.$store.state.user.userInfo.token
                }
            }).then(res => {
                this.$message.success("订单提交成功， 跳转到付款页")

                console.log(res.data)

                // 跳转到付款页
                this.$router.push({
                    path: "/air/pay",
                    query: {
                        // 付款页需要id获取订单详情
                        id: res.data.data.id
                    }
                })
            })
        }
    },

    mounted(){
        const {id, seat_xid} = this.$route.query;

        // 请求当前的机票的信息
        this.$axios({
            url: "/airs/" + id,
            params: {
                seat_xid
            }
        }).then(res => {
            // 保存当前机票信息数据
            this.infoData = res.data;
            // 保存到store
            this.$store.commit("air/setInfoData", res.data);
        })
    }
}
</script>

<style scoped lang="less">
    .air-column{
        border-bottom:1px #ddd dashed;
        padding-bottom: 20px;   
        margin-bottom: 20px;
    }

    .air-column h2{
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: normal;
    }

    /deep/ .el-select .el-input {
        width: 130px;
    }

    .input-with-select{
        width:590px;
    }

    .input-with-select /deep/  .el-input-group__prepend {
        background-color: #fff;
    }
    .member-info /deep/ .el-form-item{
        margin-bottom:0;
    }

    .member-info-item{
        border-bottom:1px #eee dashed;
        padding-bottom: 20px;
        position: relative;

        &:first-child{
            .delete-user{
                display: none;
            }
        }
    }

    .add-member{
        margin-top:20px;
    }

    .delete-user{
        display: block;
        background:#ddd;
        width:16px;
        height:16px;
        font-size:14px;
        text-align: center;
        line-height: 16px;
        color:#fff;
        cursor: pointer;
        border-radius: 50px;
        position:absolute;
        right:-30px;
        top:50%;
    }

    .insurance{
        > div{
            margin-top:10px;
        }
    }

    .insurance-item{
        margin-bottom: 20px;
    }

    .contact{
        /deep/ .el-input{
            width:50%;
        }
    }

    .submit{
        margin: 50px auto;
        display: block;
        width:250px;
        height:50px;
    }
</style>