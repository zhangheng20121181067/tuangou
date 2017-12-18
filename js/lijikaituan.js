/**
 * Created by zh on 2017/10/11.
 */


    //优惠券
$(".shopList .shop-item:gt(1)").hide();
var toggleFlag=false;
$(".showMore").on("click",function(){
    if(!toggleFlag){
        $(".shopList .shop-item:gt(1)").slideDown();
        $(this).text("收缩所有项");
        toggleFlag=true;
    }else{
        $(".shopList .shop-item:gt(1)").slideUp();
        toggleFlag=false;
        $(this).text("查看更多");
    }
});