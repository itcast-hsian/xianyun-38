export const state = () => {
    return {
        // 历史搜素记录
        history: []
    }
}

export const mutations = {
    setHistory(state, data){
        // 把最新的搜索记录添加到第一位
        state.history.unshift(data)
    }
}