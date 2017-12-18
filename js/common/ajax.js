/**
 * Created by zh on 2017/10/10.
 */


function ajax(obj){
    var baseUrl = 'http://tuangou.ufunet.cn';
    $.ajax({
        url : (baseUrl+obj.url),
        data : (obj.data?obj.data:''),
        type : (obj.type?obj.type:'GET'),
        contentType: (obj.contentType?obj.contentType:false),
        dataType : 'json',
        success : function(data, status, requestCode, response, xhr){
            console.log(JSON.stringify(data));
            if(obj.success) {      //存在成功回调则执行成功回调
                obj.success(data, status, requestCode, response, xhr);
            }
        },
        error : function(xhr,erroType,error,msg) {
            if(obj.error){
                obj.error(xhr,erroType,error,msg);
            }
        }
    })
}