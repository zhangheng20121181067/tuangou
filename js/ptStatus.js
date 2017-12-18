
   // var ptStatus=GetQueryString("ptStatus");
   var ptStatus=getLocVal("ptStatus");
    switch (ptStatus){
        case "1":
            console.log("1");
            $(".status1").removeClass("hide");
            break;
        case "2":
            console.log("2");
            $(".status2").removeClass("hide");
            break;
    }


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

