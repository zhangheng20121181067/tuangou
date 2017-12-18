/**
 * Created by zh on 2017/10/12.
 */

//为了展示同一页面的不同状态
//var zhifuStatus=GetQueryString("zhifuStatus");
var zhifuStatus=getLocVal("zhifuStatus");
console.log(zhifuStatus);
switch (zhifuStatus){
    case "1":
        console.log("1");
        $(".status1").removeClass("hide");
        break;
    case "2":
        console.log("2");
        $(".status2").removeClass("hide");
        break;
}


//立即分享到微信朋友圈点击事件
$(".share").on("click", function() {
    $(".main").append('<div id="shareit">' +
        '<img class="arrow" src="images/share-img.png"> ' +
        '<p id="share-text" class="textCenter colfff fon18">点击<span class="colhuang">“右上角”</span>' +
        '，分享给其他好友吧~ </p> </div>');

    $("#shareit").on("click", function(){
        $(this).remove();
    });

});
