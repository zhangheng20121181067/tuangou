$(function(){
   // console.log("PostbirdAlertBox:"+JSON.stringify(PostbirdAlertBox));

    var $code= GetQueryString("code");
    //console.log($code);
    ajax({
        type: "post",
        url:"/apimall/login/weixin_code_login",
        contentType:"application/x-www-form-urlencoded",
        data:{
            "codes":$code
        },
        success:function(res){
            var api_token=res.data.api_token;
            setLocVal("apiToken",api_token);
        }
    });


   // var $apiToken=getLocVal("apiToken");
    //console.log($apiToken);

//一级 获取用户收货地址列表
    ajax({
        type: "post",
        url:"/apimall/useraddress/get_list",
        contentType:"application/x-www-form-urlencoded",
        data:{
            "api_token":getLocVal("apiToken")
        },
        success:function(res){
            var addressGuid=res.data[0].address_guid;
            console.log("addressGuid:"+addressGuid);

            setLocVal("addressGuid",addressGuid);
        }
    });


//二级 获取商品列表
    ajax({
        type: "post",
        url: "/apimall/productscrowdfunding/get_list",
        contentType: "application/x-www-form-urlencoded",
        data: {
            "page": 1,
            "pagecut": 5
        },
        success: function (res) {
            var productGuid = res.data.data[0].product_guid;
            console.log("productGuid:" + productGuid);

            setLocVal("productGuid",productGuid);

            //创建订单
            create()
        }
    });



//三级 创建订单
    function create(){
        ajax({
            type: "post",
            url: "/apimall/ordercrowdfunding/creates",
            contentType: "application/x-www-form-urlencoded",
            data: {
                "api_token": getLocVal("apiToken"),
                "address_guid": getLocVal("addressGuid"),
                "product_guid": getLocVal("productGuid"),
                "product_nums": 1
            },
            success: function (res) {
                var orderNum = res.data.order_num;
                console.log("orderNum:" + orderNum);

                setLocVal("orderNum",orderNum);

                //四级 获取微信jsapi支付参数
                getWxPayParams();
            }
        });
    }

    function getWxPayParams(){
        ajax({
            type: "post",
            url:"/apimall/payweixin/jsapi",
            contentType:"application/x-www-form-urlencoded",
            data:{
                "api_token":getLocVal("apiToken"),
                "order_num":getLocVal("orderNum"),
                "url":window.location.href.split('?')[0]
            },
            success:function(resdata){
                //立即支付
                $(".lijizhifu").on("click",function(){
                    if (typeof WeixinJSBridge == "undefined"){
                        if( document.addEventListener ){
                            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                        }else if (document.attachEvent){
                            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                        }
                    }else{
                        onBridgeReady(resdata);
                    }
                    /* wx.chooseWXPay({
                     appId:res.data.appId,
                     timestamp: res.data.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                     nonceStr: res.data.nonceStr, // 支付签名随机串，不长于 32 位
                     package:  res.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                     signType: res.data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                     paySign: res.data.paySign, // 支付签名
                     success: function (res) {
                     // 支付成功后的回调函数
                     }
                     });*/
                });
            }
        });


        //立即支付
        function onBridgeReady(resdata){
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId":resdata.data.appId,
                    "timeStamp":resdata.data.timeStamp,         //时间戳，自1970年以来的秒数
                    "nonceStr":resdata.data.nonceStr, //随机串
                    "package":resdata.data.package,
                    "signType":resdata.data.signType,         //微信签名方式：
                    "paySign":resdata.data.paySign //微信签名
                },
                function(res){
                    if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                       /* PostbirdAlertBox.alert({
                            'title': ' ',
                            'content': '支付成功',
                            'okBtn': ' ',
                             cancelBtn: ' ',
                            'contentColor': '#eee'
                        });

                        setTimeout(function(){
                            window.location.href="./zhifuStatus.html?zhifuStatus=1";
                        },800);*/
                        window.location.href="./zhifuStatus.html";
                        setLocVal("zhifuStatus",1)
                    }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                    else{
                      /*  PostbirdAlertBox.alert({
                            'title': ' ',
                            'content': '支付取消或失败',
                            'okBtn': ' ',
                            cancelBtn: ' ',
                            'contentColor': '#eee'
                        });
                        setTimeout(function(){
                            window.location.href="./zhifuStatus.html?zhifuStatus=2";
                        },800);*/
                        window.location.href="./zhifuStatus.html";
                        setLocVal("zhifuStatus",2)
                    }
                }
            );
        }

    }






});