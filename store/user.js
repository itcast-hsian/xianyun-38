// store中的state必须要暴露出去，state表单存放数据的对象（state属性名是固定）
export const state = () => {
    return {
        // nickname: "刘德华"
        userInfo: {
            token: "",
            user: {}
        }
    }
}

// mutations是用于同步修改state的数据
export const mutations = {
    // getUserInfo是用来修改state.userInfo的值，函数名可以修改的
    // 参数state是必须要添加的，可以通过state修改数据
    setUserInfo(state, data){
        state.userInfo = data;
    }
}

// 异步修改state的数据, 组件的方法共享
export const actions = {
    // actions的函数第一个参数是store对象,store这个参数是必须的，
    // 第二个参数是传入的参数
    login(store, data){
        return this.$axios({
            url: "/accounts/login",
            method: "POST",
            data,
        }).then(res => {
        
            // 调用mutations下的方法修改userInfo,调用时候传入res.data
            // store.commit("user/setUserInfo", res.data);

            // 调用当前模块下的mutations是不需要加上模块名字的
            store.commit("setUserInfo", res.data);
        })
    },

    // 发送验证码, tel是手机号码
    sendCaptcha(store, tel){
        // 请求手机验证码接口
        return this.$axios({
            url: "/captchas",
            method: "POST",
            data: {
                tel
            }
        }).then(res => {
            // code是验证码
            const {code} = res.data;
            return code;
        })
    },

    // 注册方法
    register(store, data){
        return this.$axios({
            url: "/accounts/register",
            method: "POST",
            data
        }).then(res => {
            // 注册完毕之后立即登录
            store.commit("setUserInfo", res.data);
        })
    }
}