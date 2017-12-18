
checkCode();
function checkCode(){
    var code = GetQueryString('code');
    var location=window.location.href.split('?')[0];
    console.log("weixincode1:"+code);
    console.log("location:"+location);
    if(!code){
        //window.location.replace(location+"?status=111");
        //openToast('微信授权失败，请重新进入',2000);
        //window.location.href =shareLink;

        // window.location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb49f0a0ee3b7b621&redirect_uri="+location+"&response_type=code&scope=snsapi_base&state=123#wechat_redirect");  //
        // console.log("weixincode2"+code);
        // return false;
    }
}



/* 返回按钮
$(function(){
    pushHistory();
    window.addEventListener("popstate", function(e) {
        console.log("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
        window.history.go(-2);
    }, false);
    function pushHistory() {
        var state = {
            title: "title",
            url: "#"
        };
        window.history.pushState(state, "title", "#");
    }
});*/

function initSDK () {

    // xb49f0a0ee3b7b621
     //http://open1.ufunet.cn/pages/redirect/dist/index.html?appid=wxb49f0a0ee3b7b621&source=1&redirect_uri=/pages/h5/2017/0815
     //https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb49f0a0ee3b7b621&redirect_uri=http://wx.ufunet.cn/pages/h5/2017/threePt/index.html&response_type=code&scope=snsapi_base&state=123#wechat_redirect
    //删除参数值
    var isWXConfig = false;
   // var shareLink = 'http://wx.ufunet.cn/pages/h5/2017/threePt';
    var shareLink=window.location.href.split('?')[0];


    var from=shareLink.lastIndexOf('/');
    var to=shareLink.lastIndexOf('.');
    var fileName=shareLink.substring(from+1,to);
    if(fileName=="zhifuStatus"||fileName=="ptStatus"){
        shareLink="http://wx.ufunet.cn/pages/h5/2017/threePt/surekaituan.html";
    }
    var shareData = {
        imgUrl: 'http://open1.ufunet.cn/pages/h5/2017/0815/newShare.jpg', // 分享图标
        title:'拼团',   // 分享标题 $('title').html()+''
        desc:shareLink,               //$('meta[name=description]').attr('content')+$('title').html(),   // 分享内容                                                                         // 分享描述
        link: shareLink,   // 分享链接
        type: '',
        dataUrl: '',
        success: function (res) {
            console.log(JSON.stringify(res));
            console.log(shareLink);
            console.log(shareData.link);
            console.log(shareData.imgUrl);
            //openToast('分享成功',3000);
        },
        cancel: function (res) {

        }
    };

    window.WXENV = new (function (ticketUrl) {
        var self = this;
        self.ticketUrl = ticketUrl;
        self.nonceStr = new Date().getTime()+'x';
        self.timestamp = new Date().getTime()+'';
        self.readyHandlers = [];
        self.shareData = shareData;
        self.debug = false;
        self.jsApiList =
            [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                // 'stopRecord',
                // 'onVoiceRecordEnd',
                // 'playVoice',
                // 'onVoicePlayEnd',
                // 'pauseVoice',
                // 'stopVoice',
                // 'uploadVoice',
                // 'downloadVoice',
                // 'hideOptionMenu',
                // 'showOptionMenu',
                // 'hideMenuItems',
                // 'showMenuItems',
                // 'hideAllNonBaseMenuItem',
                // 'showAllNonBaseMenuItem',
                // 'closeWindow',
                // 'scanQRCode',
                //'chooseImage',
                // 'previewImage',
                // 'uploadImage',
                'chooseWXPay'
            ];
        self._updateShareData = function (data) {
            wx.onMenuShareTimeline({
                title: data.title,
                link: data.link,
                imgUrl: data.imgUrl,
                success: data.success,
                cancel: data.cancel
            });

            wx.onMenuShareAppMessage({
                title: data.title,
                desc: data.desc,
                link: data.link,
                imgUrl: data.imgUrl,
                type: data.type,
                dataUrl: data.dataUrl,
                success: data.success,
                cancel: data.cancel
            });

            wx.onMenuShareQQ({
                title: data.title,
                desc: data.desc,
                link: data.link,
                imgUrl: data.imgUrl,
                success: data.success,
                cancel: data.cancel
            });

            wx.onMenuShareWeibo({
                title: data.title,
                desc: data.desc,
                link: data.link,
                imgUrl: data.imgUrl,
                success: data.success,
                cancel: data.cancel
            });
            //alert(JSON.stringify(data));
        };

        var js = document.getElementsByTagName('script')[0];
        self.onEnvReady = function () {
            var url = self.ticketUrl;
            $.ajax({
                type: 'get',   //get
                url: url,
                dataType: 'json',
                timeout: 10000,
                data:{
                    appid:'wxb49f0a0ee3b7b621',
                    timestamp: self.timestamp,
                    nonceStr: self.nonceStr,
                    url:location.href.split('#')[0]
                },
                success: function(data){
                   // console.log("微信分享："+JSON.stringify(data));
                if(data.status == 1){
                    var data = data.data;
                    var config = {
                        debug: self.debug,
                        appId: data.appId,
                        timestamp: data.timestamp,
                        nonceStr: data.nonceStr,
                        signature: data.signature,
                        jsApiList: self.jsApiList
                    };
                    wx.config(config);
                }else{
                    alert(data.message);
                }
                },
                error: function(xhr, type){
                    alert('获取coonfig失败');
                }
            })
        };

      //  var wxjs = document.getElementsByTagName('script')[1];
        var wxjs = document.createElement('script');
        wxjs.addEventListener('load', function () {
            wx.ready(function () {
            
                //alert('js ready is ok');
                //setTimeout(function(){
                    isWXConfig = true;
                    self._updateShareData(shareData);
                //},1)
            });
            self.onEnvReady();
        });
        wxjs.src = 'http://res.wx.qq.com/open/js/jweixin-1.0.0.js';
        js.parentNode.insertBefore(wxjs, js.nextSibling);
    })('/com/get_ticket_getticket'); //  /com/get_ticket_getticket
}
initSDK ();
