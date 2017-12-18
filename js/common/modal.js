/**
 * Created by zh on 2017/5/27.
 */



/*取窗口滚动条高度*/
function getScrollTop(){
    var scrollTop=0;
    if(document.documentElement&&document.documentElement.scrollTop) {
        scrollTop=document.documentElement.scrollTop;
    } else if(document.body) {
        scrollTop=document.body.scrollTop;
    }
    return scrollTop;
}


function openToast(){
  /*  var data={
        title:obj.title?obj.title:"title",
        intro:obj.intro?obj.intro:"intro"
    };*/
    var content="";
    content=' <div class="modal"></div> <div class="pop backfff"> <div class="xiangqing clear"> <div class="pic fl">团 </div> <div class="title fl"> <h3>必胜客圣诞双人餐</h3> <p>有效期: 2016.3.18-2016.5.22</p> </div> </div> <div class="quan pad15  borderTop"> <h3>券详情</h3> <p>内容描述：套餐一可以享受八折优惠</p> <p>有效期: 2016.3.18-2016.5.22</p> <p>使用时段: 周一至周五9:00-21:00</p> <p>商家服务: -</p> <p>使用须知: -</p> </div> <div class="shiyong pad15"> <h3>适用商户</h3> <p>餐饮类</p> <p>服装类</p> </div> <div class="sure colhuang borderTop">知道了</div> </div> </div>';


    $("body").append(content);



    var pop=document.getElementsByClassName("pop")[0];
    var modal=document.getElementsByClassName("modal")[0];
    var $bodyHeight=document.documentElement.clientHeight;
    modal.style.height=$bodyHeight+"px";
    console.log($bodyHeight);

    popShow(pop,modal)
}


//打开模态框
function openModal(modal){
    modal.style.display="block";
}
//关闭模态框
function closeModal(modal){
    modal.style.display="none";
}

//弹出框打开时
function popShow(elm,modal){

    //打开模态框
    openModal(modal);

    //窗口变化时
    window.onresize=function(){
        popShow(elm);
    };
    //定位
    elm.style.display="block";
    var l=(document.documentElement.clientWidth-elm.offsetWidth)/2;
    var t=(document.documentElement.clientHeight-elm.offsetHeight)/2;
    console.log(document.documentElement.clientHeight,elm.offsetHeight);
    elm.style.left=l+'px';
    elm.style.top=t+'px';  //定位高度等于滚轮高度加上可视窗高度

    //投递和取消事件
    //var send=elm.getElementsByTagName("a")[0];
    var sure=elm.getElementsByClassName("sure")[0];
    //点击确认时 模态弹出均消失
    sure.onclick=function(e){
        e.stopPropagation();
        document.body.removeChild(elm);
        document.body.removeChild(modal);
       /* elm.style.display="none";
        closeModal(modal);*/
    };

  /* //除弹出框外文档的任意位置点击时弹出框消失
   document.onclick=function(){
        elm.style.display="none";
        closeModal(modal);
   };*/

    //阻止弹出框冒泡
   elm.onclick=function(event) {
        event = event ? event : window.event;
       // var obj = event.srcElement ? event.srcElement : event.target;
        if (event && event.stopPropagation) {
            // this code is for Mozilla and Opera
            event.stopPropagation();
        } else if (window.event) {
            // this code is for IE
            window.event.cancelBubble = true;
        }
   }
}
