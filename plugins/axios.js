
// nuxtjs的插件就是简单的暴露出一个函数
// 插件会返回一个nuxt对象
export default (nuxt) => {
    // axios每次请求结果返回是错误（状态码是400、 401、403），就会触发onError拦截器
    nuxt.$axios.onError()
}