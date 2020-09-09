function Ajax(url,succFunc,failFunc){

        // Step1 获取Ajax对象
        if(window.XMLHttpRequest){
            //兼容IE7-10, FF, CHORME
            var oAjax = new XMLHttpRequest();
        }else{
            //兼容IE6
            var oAjax = new ActiveXObject("Microsoft.XMLHTTP");
        }

        var bustCache = '?' + new Date().getTime();

        // Step2 连接服务器
        // open(方法，url，异步传输)
        oAjax.open('GET',url+bustCache,true);

        // Step3 发送请求
        oAjax.send();

        // Step4 接受返回数据
        oAjax.onreadystatechange = function () {
            //读取完成
            if(oAjax.readyState == 4){


                if(oAjax.status == 200){
                    //返回成功函数
                    succFunc(oAjax.responseText);
                }else{
                    //返回失败函数
                    if(failFunc){
                         failFunc();
                    }
                }
            }

        }
}