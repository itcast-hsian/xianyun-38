<template>
    <div class="container">
        <div class="main">
            <div class="pay-title">
                    支付总金额 <span class="pay-price">￥ {{order.price | tofixed}}</span>
            </div>
            <div class="pay-main">
                <h4>微信支付</h4>
                <el-row type="flex" 
                justify="space-between" 
                align="middle"
                class="pay-qrcode">
                    <div class="qrcode">
                        <!-- 二维码 -->
                        <canvas id="qrcode-stage"></canvas>

                        <p>请使用微信扫一扫</p>
                        <p>扫描二维码支付</p>
                    </div>
                    <div class="pay-example">
                        <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt="">
                    </div>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
import QRCode from "qrcode";

export default {
    data(){
        return {
            order: {},
            // 定时器
            timer: null
        }
    },

    methods: {
        // 查询付款状态
        async checkPay(data){
            const res = await this.$axios({
                url:"/airorders/checkpay",
                method: "POST",
                data: {
                    id: data.id,
                    nonce_str: data.price, // 订单金额
                    out_trade_no: data.orderNo// 订单编码
                },
                headers: {
                    // Bearer属于jwt的token标准
                    Authorization: "Bearer " + this.$store.state.user.userInfo.token
                }
            })
            const {statusTxt} = res.data;

            if(statusTxt == "支付完成"){
                this.$alert(statusTxt, "提示", {
                    type: 'success'
                });
                clearInterval(this.timer);
                this.timer = null;
            }

        }
    },
    mounted(){
        // 获取订单id
        const {id} = this.$route.query;

        // 定时器主要为了等待本地存储把值返回给store，才可以获取到token
        setTimeout(() => {
            // 请求订单详情
            this.$axios({
                url: "/airorders/" + id,
                headers: {
                    // Bearer属于jwt的token标准
                    Authorization: "Bearer " + this.$store.state.user.userInfo.token
                }
            }).then(res => {
                // 赋值给订单详情
                this.order = res.data;
                // 生成二维码
                const canvas = document.querySelector("#qrcode-stage");
                // 第一个参数是canvas dom元素, 要生成二位的连接
                QRCode.toCanvas(canvas, this.order.payInfo.code_url, {
                    width: 200
                });

                // 支付结果轮询
                this.timer = setInterval(() => {
                    this.checkPay(this.order);
                }, 3000);
            })
        }, 1)  
    },

    filters: {
        tofixed(value){
            return Number(value || 0).toFixed(2);
        }
    }
}
</script>

<style scoped lang="less">
.container{
    background:#f5f5f5;
    padding: 30px 0;

    .main{
        width:1000px;
        margin:0 auto;

        .pay-title{
            text-align: right;
            span{
                font-size:28px;
                color:orangered;
            }
        }

        .pay-main{
            background:#fff;
            margin-top:10px;
            border-top: 5px orange solid;
            padding:30px;

            h4{
                font-size: 28px;
                font-weight: normal;
                margin-bottom: 10px;
            }

            .pay-qrcode{
                padding:0 80px;
            }

            .qrcode{
                border:1px #ddd solid;
                padding:15px;
                height: fit-content;

                #qrcode-stage{
                    width:200px;
                    height:200px;
                    margin-bottom: 10px;
                }

                p{
                    line-height: 2;
                    text-align: center;
                }
            }
        }
    }
}
</style>