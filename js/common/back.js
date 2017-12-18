/**
 * Created by zh on 2017/10/13.
 */
$(function(){
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        return r != null ? unescape(r[2]) : null;
    }

    //监听返回
    pushHistory();
    window.addEventListener("popstate", function(e) {
       // console.log("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
      //  if(!GetQueryString('code')){
            window.history.go(-2);
       // }
    }, false);
    function pushHistory() {
        var state = {
            title: "title",
            url: "#"
        };
        window.history.pushState(state, "title", "#");
    }

});
