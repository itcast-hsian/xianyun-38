import { Message } from "element-ui"

// nuxtjs的插件就是简单的暴露出一个函数
// 插件会返回一个nuxt对象
export default ({$axios}) => {
    // axios每次请求结果返回是错误（状态码是400、 401、403），就会触发onError拦截器
    $axios.onError(res => {
        const {statusCode, message} = res.response.data;

        if(statusCode === 400){
            Message.error(message);
        }
    })
}