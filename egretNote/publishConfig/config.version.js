//todo @1在egret Main入口文件里面声明 ============================
//try {this.EgretConfig = window['EgretConfig']}catch (e){};
//todo @1在egret index.html入口文件 判断是否更新============================
/*
     var isHasConfig = typeof EgretConfig['needToUpdata'] !== 'undefined' ? true : false;
     var needToUpdata =isHasConfig ?  EgretConfig.needToUpdata : false;
     var manifestUrl = isHasConfig&&EgretConfig.needToUpdata===true ? EgretConfig.resource : './manifest.json?v=' + Math.random();

    //更新js路径
    var url =isHasConfig&&EgretConfig.needToUpdata===true ? EgretConfig.path +list[loaded] : list[loaded] ;
*/
//todo 注意，如果是检测404，则默认访问根目录的资源

var EgretConfig={};
;!(function(){

    function getItem(url ,name)
    {
        url=url||'';
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r =url.match(reg);
        if(r!=null) return  unescape(r[2]); return null;
    }

    function getCurrentParam(){
        var scripts = document.getElementsByTagName('script');
        var activeUrl = scripts[scripts.length -1];
        var uri = activeUrl.src;
        return uri.split("?")[1];
    }

    //优先去url 参数，再取js 地址参数
    var path = getItem(window.location.search.substr(1) ,'v');
    var scriptpath = getItem( getCurrentParam() ,'v');
    path = path == null? (scriptpath ==null ? '' : scriptpath +'/'): path+'/';

    EgretConfig.PojectHost = window.location.host;
    EgretConfig.pathname = window.location.pathname;
    EgretConfig.version = getItem('v') || '1.0.1';
    EgretConfig.path = path; //路径
    EgretConfig.ScriptParam = getCurrentParam();
    EgretConfig.TestFile ='manifest.json';
    EgretConfig.protocol =window.location.protocol + '//';
    EgretConfig.needToUpdata=false;
    EgretConfig.resource =EgretConfig.protocol
        + EgretConfig.PojectHost
        + EgretConfig.pathname
        + EgretConfig.path
        + EgretConfig.TestFile
        + '?'+EgretConfig.version;

   // Error.stack
    //测试能否取到目标地址文件
    function testRequest(){

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange =function(e){
            if(xhr.readyState == 4) {
                if(xhr.status == 404)  return;
                EgretConfig.needToUpdata=true;
            }
        };
        xhr.open('GET', EgretConfig.resource ,false);
        xhr.send();
    }
    testRequest();
})();