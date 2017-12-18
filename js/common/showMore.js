/**
 * Created by zh on 2017/9/11.
 */
$(function(){
    var expandFlag=false;
    $(".expandMore").hide();
   $(".expand").on("click",function(){
       $(this).find(".rightArrow").toggleClass("rotate90");
       if(!expandFlag){
           $(".expandMore").slideDown();
           expandFlag=true;
       }else{
           $(".expandMore").slideUp();
           expandFlag=false;
       }
   })
});