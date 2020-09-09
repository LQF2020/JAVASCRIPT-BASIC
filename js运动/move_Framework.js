//获取指定物体的样式，包含行间样式和非行间样式
       function getStyle(obj,name){
           if(obj.currentStyle){
               return obj.currentStyle.name;
           }else{
               return getComputedStyle(obj,null)[name];
           }
       }
       //由于多物体运动，因此为每个物体设置定时器属性，用以独立控制单个物体的运动快慢
        function startMove(obj,json,callback){

            clearInterval(obj.timer);
            var curAttr;
            obj.timer = setInterval(function(){
                var stop_timer = true;
                //依次改变物体属性
                for(var attr in json){
                    if(attr == 'opacity'){
                    //处理透明度时，为了应对float浮点数
                    curAttr = Math.round(parseFloat(getStyle(obj,attr))*100);
                    }else{
                        //处理长宽高整数型改变
                        curAttr = parseInt(getStyle(obj,attr));
                    }
                    // 定时器仍在继续，一直改变物体属性知道达到target值
                    if(curAttr != json[attr]){
                         stop_timer = false;
                         var speed = (json[attr]-curAttr)/5;
                         speed = speed>0?Math.ceil(speed):Math.floor(speed);
                         if(attr == 'opacity'){
                            //处理透明度时，改变float浮点数
                             //兼容IE和Chrome, FireFox浏览器
                             obj.style.filter = "alpha(opacity=" +(curAttr+speed)+")";
                             obj.style.opacity = (curAttr+speed)/100;
                         }else{
                            //改变整数型属性的值
                            obj.style[attr] = curAttr+speed+'px';
                         }

                    }
                }
                // 物体所有属性达到target目标，停止定时器，返回callback函数
                if(stop_timer){
                    clearInterval(obj.timer);
                    if(callback){
                        callback();
                    }
                }


            },30);

        }