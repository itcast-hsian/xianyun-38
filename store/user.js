// store中的state必须要暴露出去，state表单存放数据的对象（state属性名是固定）
export const state = {
    // nickname: "刘德华"
    userInfo: {}
}

// mutations是用于同步修改state的数据
export const mutations = {
    // getUserInfo是用来修改state.userInfo的值，函数名可以修改的
    // 参数state是必须要添加的，可以通过state修改数据
    getUserInfo(state, data){
        state.userInfo = data;
    }
}

// 异步修改state的数据
// export const actions = {}