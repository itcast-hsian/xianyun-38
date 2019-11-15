export const state = () => {
    return {
        // 历史搜素记录
        history: [],
        // 选中机票信息
        infoData: {
            // 防止页面报错
            seat_infos: {}
        }
    }
}

export const mutations = {
    // 设置历史搜素记录
    setHistory(state, data){
        // 把最新的搜索记录添加到第一位
        state.history.unshift(data)
    },

    // 设置选中机票信息
    setInfoData(state, data){
        state.infoData = data;
    }
}