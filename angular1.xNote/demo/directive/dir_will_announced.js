define(['angularAMD'],function(angularAMD){

    angularAMD.directive('will_announcedEvent',['$document',function($document){

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

                var all = 30; // 100001 - 100030
                var myMub = 100006,myBuyTime=201607062034,willChangeMyTime= 0,myBuyTimeString = myBuyTime+'';//随机 第6


                var myTimeYear = myBuyTimeString.substr(0,4);
                var myTimeMonth= myBuyTimeString.substr(4,2);
                var myTimeDate = myBuyTimeString.substr(6,2);
                var myTimeHours = myBuyTimeString.substr(8,2);
                var myTimeMinute = myBuyTimeString.substr(10,2);

                var qian10wei = myBuyTimeString.substr(0,10);

                var dataTime = myTimeYear+'-'+myTimeMonth+"-"+myTimeDate+' '+myTimeHours+':'+myTimeMinute+':00';

                var changeDate = new Date(dataTime);


                console.log('买到的号码 = '+myMub+';在总人数：'+all+'中的第'+(myMub-100000)+'个！');
                console.log('购买号码的时间为 = '+myBuyTimeString);
                console.log('dataTime = '+dataTime);
                console.log('转为时间 = '+changeDate);
                console.log('转为时间戳 = '+changeDate.getTime());
                console.log('--------------------------------------------------------------------------------------');



                var beforLastCreatTimeTotal =  201607061015*(all-2)+myBuyTime;
                console.log('截止最后一个下单前也就是29下单后，时间总和='+beforLastCreatTimeTotal+'（包括自己的）.');

                var LastBuyTime = 201607061511;
                console.log('假如最后一个下单时间为：='+LastBuyTime);

                beforLastCreatTimeTotal = beforLastCreatTimeTotal+LastBuyTime;

                var result = (beforLastCreatTimeTotal)%all;
                console.log('实际开出的结果为：第'+result+'个人买的号码!');
                console.log('------------------开始调节我的时间----------------------------------------------------');

                console.log('实际总和('+beforLastCreatTimeTotal+')-第'+result+'个人基数'+result+'='+(beforLastCreatTimeTotal-201607061015)+'//这时取余数刚刚为0');
                console.log('加上我要买的基数:'+(myMub-100000));
                console.log('实际总和浮动了:'+(myMub-100000)+'-'+result+'='+(myMub-100000-result));

                console.log('-----调节我的时间-----');
                console.log('我的购买时间最后2位（'+myTimeMinute+'分钟是否大于'+Math.abs(myMub-100000-result)+'）');

                var myNEWtime = [];
                if(parseInt(myTimeMinute) >= Math.abs(myMub-100000-result)){
                    console.log('我的购买时间最后2位分钟大于浮动值,这样我购买时间可以直接求差='+(parseInt(myTimeMinute)-Math.abs(myMub-100000-result)));
                    console.log('我要修改购买时间变为='+(qian10wei+(parseInt(myTimeMinute)-Math.abs(myMub-100000-result)))+',就可以了');

                }
                for(var t=5;t>=0;t--){
                    var nv = (parseInt(myTimeMinute)-Math.abs(myMub-100000-result) + all*t );
                    myNEWtime.push( parseInt(qian10wei+'00')+nv  );
                }

                console.log('我可以改变的值有='+myNEWtime.join(','));
                var newALL1 = Math.abs((beforLastCreatTimeTotal - result) + (myMub - 100000) ); // 结果和自己的距离间隔
                var newALL2 = Math.abs((beforLastCreatTimeTotal - result) + all + (myMub - 100000) ); // 结果和自己的距离间隔

               // myBuyTime = beforLastCreatTimeTotal - result + willChangeMyTime; // 2016070604

                result = (willChangeMyTime)%all;
                console.log('影响后开出的结果：'+result);










            }
        }

    }]);




});