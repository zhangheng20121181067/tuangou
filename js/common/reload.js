/**
 * Created by zh on 2017/10/13.
 */
$(function(){

    var code = GetQueryString('code');
    console.log("code"+code);
    var location=window.location.href.split('?')[0];
    console.log("location"+location);
   /* if(!code){
        //openToast('微信授权失败，请重新进入',2000);
        //window.location.href =shareLink;
        window.location.replace("https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb49f0a0ee3b7b621&redirect_uri="+location+"&response_type=code&scope=snsapi_base&state=123#wechat_redirect");  //
        return false;
    }*/

});