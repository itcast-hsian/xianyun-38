<template>
    <el-form 
        :model="form" 
        ref="form" 
        :rules="rules" 
        class="form">
            <el-form-item class="form-item" prop="username">
                <el-input 
                v-model="form.username"
                placeholder="用户名手机">
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="captcha">
                <el-input 
                v-model="form.captcha"
                placeholder="验证码" >
                    <template slot="append">
                        <el-button @click="handleSendCaptcha">
                            发送验证码
                        </el-button>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="nickname">
                <el-input 
                 v-model="form.nickname"
                placeholder="你的名字">
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="password">
                <el-input 
                 v-model="form.password"
                placeholder="密码" 
                type="password"
                ></el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="checkPassword">
                <el-input 
                 v-model="form.checkPassword"
                placeholder="确认密码" 
                type="password">
                </el-input>
            </el-form-item>

            <el-button 
            class="submit" 
            type="primary" 
            @click="handleRegSubmit">
                注册
            </el-button>
        </el-form>
</template>

<script>

export default {
    data(){
        // 自定义校验函数
        // rule这个参数用户上。返回校验规则
        // value 返回输入框的值
        // callback 是回调函数 ，callback是必须要调用的
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.form.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };

        // 校验手机号码
        const validateUsername = (rule, value, callback) => {
            // 正常调用（先掌握这个判断）
            if (value === '') {
                callback(new Error('请输入用户名'));
            }else if( !(/^1[3|5|7|8][0-9]{9}/.test(value)) ){
                callback(new Error('手机号码格式错误'));
            }else{
                callback();
            }

            // 手机号码校验的封装
            //callback(value(value))
        }

        // function abc(value){
        //     if (value === '') {
        //         return new Error('请输入用户名');
        //     }else if( !(/^1[3|5|7|8][0-9]{9}/.test(value)) ){
        //         return new Error('手机号码格式错误');
        //     }
        // }

        return {
            // 表单数据
            form: {
                username: "",
                captcha: "", // 手机验证码
                nickname: "", // 昵称
                password: "",
                checkPassword: "" // 确认密码
            },
            // 表单规则
            rules: {
                username: [
                    // { required: true, message: "请输入用户名", trigger: "blur" },
                    // 自定义验证手机号码
                    { validator: validateUsername, trigger: 'blur' }
                ],
                captcha: [
                    { required: true, message: "请输入手机验证码", trigger: "blur" }
                ],
                nickname: [
                    { required: true, message: "请输入昵称", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" }
                ],
                checkPassword: [
                    // validator是用来指定自定义的验证函数
                    { validator: validatePass, trigger: 'blur' }
                ]
            },
        }
    },
    methods: {
        // 发送验证码
        async handleSendCaptcha(){
            // 判断手机号码是否为空
            if(!this.form.username){
                this.$message.error("手机号码不能为空");
                return;
            }

            // 调用user下的actions发送验证码的方法
            // this.$store.dispatch("user/sendCaptcha", this.form.username).then(code => {
            //     // 验证码弹窗
            //     this.$message.success("模拟手机返回的验证码：" + code);
            // });

            // await可以接受promise的返回值
            const code = await this.$store.dispatch("user/sendCaptcha", this.form.username);
            // 验证码弹窗
            this.$message.success("模拟手机返回的验证码：" + code);
        },

        // 注册
        handleRegSubmit(){
            // 验证通过
            this.$refs.form.validate(async valid => {
                if(valid){

                    // 解构, props是除了checkPassword之外剩下的属性
                    const {checkPassword, ...props} = this.form;
                    
                    // 请求注册的接口
                    await this.$store.dispatch("user/register",props);

                    // 跳转到首页
                    this.$router.replace("/");

                    // 弹窗提示
                    this.$message.success('注册成功');
                }
            })
           
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