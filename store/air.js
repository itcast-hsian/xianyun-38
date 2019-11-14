export const state = () => {
    return {
        history: []
    }
}

export const mutations = {
    setHistory(state, data){
        // 把最新的搜索记录添加到第一位
        state.history.unshift(data)
    }
}