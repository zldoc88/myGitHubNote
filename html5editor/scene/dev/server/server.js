define(['angularAMD'],function(angularAMD){

    angularAMD.service('dataService', ['$http','$animate', function($http,$animate) {
        var pageMaps = []; //此数组存储了当前活动所有的页面模板,[pageObj0, pageObj1, pageObj2 ...],每个页面.下面会从服务端读取当前活动在服务端存储的数据,然后对pageMaps做数据初始化.
        var systemResure = {}; //资源
        var htmlResure = {};

        function getValue(longstring,name){
            eval('var reg=/'+name + '\=[^#|^&]+/g;');
            var res = longstring.match(reg);
            if(res !=null){
                res = res[0];
                res = res.split('=');
                res = res[1];
                res = decodeURI(res);
            }else{ res = null}
            return res;
        };
        //取数据----------------------------------------------

        var lacolhref =window.location.href,
            sence_id = getValue(window.location.href,'sence_id')
            ,page_id=getValue(window.location.href,'page_id')
            ,apiKey=getValue(window.location.href,'apiKey')
            ,isAddSence=false,isErrorRequ=false,copy_id=sence_id; // null 新增，存在 =》? 编辑

        //同步请求===========================================
        if(apiKey==null) return;
        if(sence_id==null){
            var xhrCreat = new XMLHttpRequest();
            xhrCreat.open('post','/index.php?a=Diy&m=create&ajax=1',false);
            xhrCreat.onreadystatechange=function(e){
                if(xhrCreat.readyState==4 &&xhrCreat.status==200){
                    var res =  xhrCreat.responseText;
                    res = JSON.parse(res);
                    sence_id =  res.data.senceId;
                    copy_id = sence_id;
                    window.history.replaceState({},document.title,lacolhref+'&sence_id='+sence_id);
                }
                if(xhrCreat.readyState==4) return;
            }
            xhrCreat.send();

        };

        //拉取场景数据=====================================================同步请求
        var xhrGetData = new XMLHttpRequest();
        xhrGetData.open('get','/index.php?a=Diy&m=get&ajax=1&sence_id='+sence_id,false);
        xhrGetData.onreadystatechange=function(e){
            if(xhrGetData.readyState==4 &&xhrGetData.status==200){
                var res =  xhrGetData.responseText;
                res = JSON.parse(res);
                //console.log(res);
                //todo 假如返回 sence_page_id 不存在 isAddSence=true ,否则 isAddSence=false ,并且此时  page_id == null ,则非法访问
                //todo code = -1 表示此场景不存在 isErrorRequ=true;
                //是否存在此id场景-----------------------
                if(res.code == -1){
                    isErrorRequ=true;
                    return;
                }
                //新建场景-----------------------
                if(res.code == 0 && res.data.sence_page_id==null){
                    isAddSence = true;
                    htmlResure.sence_id = res.data.sence_id;
                    return;
                }
                //编辑场景-----------------------
                if(res.code == 0 && res.data.sence_page_id!=null){

                    //是否是复制----------------
                    if(copy_id != res.data.sence_id){
                        lacolhref = lacolhref.replace(copy_id,res.data.sence_id);
                        window.history.replaceState({},document.title,lacolhref);
                    }

                    //sence_id: "14"sence_info: "[]"sence_name: "",sence_page_global_info: null ,sence_page_id: null, sence_page_info: null
                    var global_info = res.data.sence_page_global_info; //场景全局信息
                    var sence_id = res.data.sence_id;// 页面id
                    var sence_page_id = res.data.sence_page_id;// 页面id
                    var sence_page_info = res.data.sence_page_info;//页面数据信息

                    global_info = JSON.parse(global_info);
                    sence_page_info = JSON.parse(sence_page_info);

                    htmlResure={
                        MaxAnimationsOrder: global_info.MaxAnimationsOrder,
                        MaxPageId: global_info.MaxPageId,
                        page_id:sence_page_id,
                        sence_id:sence_id,
                        apiKey:apiKey,
                        backgroundSounds:global_info.backgroundSounds,
                        isWhowSoundsIcon:global_info.isWhowSoundsIcon,
                        nextPageEvent:global_info.nextPageEvent,
                        prevPageEvent:global_info.prevPageEvent,
                        animationForOut:global_info.animationForOut,
                        animationForIn:global_info.animationForIn
                        ,pageMaps:sence_page_info
                    }
                }
                return;
            }
            if(xhrGetData.readyState==4) return;

        };
        xhrGetData.send();

        if(isErrorRequ) return; //非法访问
        //音频
        systemResure.voices={
            system : {},
            user :{}
        };
        systemResure.videos={
            system : {},
            user :{}
        };  //视频
        systemResure.images={
            system : {},
            user :{}
        }; //图片
        //todo =====================读取图片====================系统图片==初始化一次============

        //拉取资源====================================
        var xhrGetRes = new XMLHttpRequest();
        xhrGetRes.open('post','/index.php?a=User&m=getResourceList&ajax=1',false);
        xhrGetRes.onreadystatechange=function(e){
            if(xhrGetRes.readyState==4 &&xhrGetRes.status==200){
                var data =  xhrGetRes.responseText;
                data = JSON.parse(data);
                if(data.code==0){
                    data= data.data.data;
                    //系统
                    systemResure.images.system.background = data['system']['background'];
                    systemResure.images.system.ico = data['system']['ico'];
                    systemResure.voices.system.voice = data['system']['voice'];
                    systemResure.videos.system.video = data['system']['video'];

                    systemResure.images.accessUrl = data['accessUrl'];
                    systemResure.voices.accessUrl = data['accessUrl'];
                    systemResure.videos.accessUrl = data['accessUrl'];

                    //用户
                    systemResure.images.user.image = data['user']['image'];
                    systemResure.voices.user.voice = data['user']['voice'];
                    systemResure.videos.user.video = data['user']['video'];
                }

            }
            if(xhrGetRes.readyState==4) return;
        };
        xhrGetRes.send();

        return (isAddSence)?{
            systemResure:systemResure
            ,htmlResure :{
                MaxAnimationsOrder: 1,
                MaxPageId: 1,
                apiKey: apiKey,
                backgroundSounds:null,
                isWhowSoundsIcon:'yes',
                page_id:'',
                sence_id:htmlResure.sence_id,
                nextPageEvent:"none",
                prevPageEvent:"none",
                animationForOut:"none",
                animationForIn:"none",
                pageMaps: [{
                    cansee:true,
                    id:1,
                    maxId: 0,
                    maxIndex: 0,
                    backgroundColor:'rgba(255,255,255,1)',
                    backgroundImg:'none',
                    backgroundGradient:{
                        rotate :0,
                        color :[{color:'rgba(255,255,255,1)'},{color:'rgba(0,0,0,1)'}]
                    },
                    backgroundType:'color',
                    prevPageEvent:'none',
                    nextPageEvent:'none',
                    animationForIn:'none',
                    animationForOut:'none'
                }]
            }

        }:{
            systemResure:systemResure
            ,htmlResure:htmlResure
        };

    }]);

});

