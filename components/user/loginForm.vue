<template>

    <!-- model: 指定表单数据对象（不是必须要设置）
    ref: 获取dom元素（this.$refs.form）
    rules: 校验规则 -->
    <el-form 
        :model="form" 
        ref="form"
        :rules="rules" 
        class="form">

        <!-- prop是rule是对象校验字段 -->
        <el-form-item class="form-item" prop="username">
            <el-input 
            v-model="form.username"
            placeholder="用户名/手机"
            >
            </el-input>
        </el-form-item>

        <el-form-item class="form-item" prop="password">
            <el-input 
            v-model="form.password"
            placeholder="密码" 
            type="password">
            </el-input>
        </el-form-item>

        <p class="form-text" ref="p">
            <nuxt-link to="#">忘记密码</nuxt-link>
        </p>

        <el-button 
        class="submit"
        type="primary"
        @click="handleLoginSubmit">
            登录
        </el-button>
    </el-form>

</template>

<script>
export default {
    mounted(){
        // ref用来查找dom的元素
        // document.querySelector(".form-text").style.background = 'gray'
        // this.$refs.p.style.background = "blue"
    },
    data(){
        return {
            // 表单数据
            form: {
                username: "", // 用户名
                password: ""  // 密码
            },
            // 表单规则
            rules: {
                // required必填， message验证不通过时候错误提示，trigger是触发验证的时间
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
            },
        }
    },
    methods: {
        // 提交登录
        async handleLoginSubmit(){
            // try/catch里面的代码如果发生了错误，不会影响try/catch后面代码的执行
            try{
                // 调用actions的方法,this.$store.dispatch
                await this.$store.dispatch("user/login", this.form);
                // 跳转到首页
                // this.$router.replace("/");
                this.$router.back();

                // 弹窗提示
                this.$message.success('登录成功');
            }catch(err){}
        }
    }
}
</script>

<style scoped lang="less">
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>
