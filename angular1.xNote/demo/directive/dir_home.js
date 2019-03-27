define(['angularAMD'],function(angularAMD){

    angularAMD.directive('homeEvent',['$document',function($document){

        return {
            link:function(scope,element,attr){

                /*var source = new EventSource("test.php?id=111");

                scope.$on('$stateChangeStart', function(e, to, toP, from, fromP) {
                    source.close();
                });

                source.addEventListener('message', function(event){

                    var data = event.data;
                    console.log(data);
                    //
                });*/
                //刷新
                scope.$on('window.onscroll.top.$broadcast',function(evt,data){
                    setTimeout(function(){
                        console.log('触发了刷新页面.$emit');
                        scope.$emit('dataLoaded.$emit',{});
                    },3000);
                });

                //加载更多
                scope.$on('window.onscroll.bottom.$broadcast',function(evt,data){
                    setTimeout(function(){
                        console.log('触发加载更多数据.$emit');
                        scope.$emit('dataLoaded.$emit',{});
                    },3000);
                });













            }
        }

    }]);




});