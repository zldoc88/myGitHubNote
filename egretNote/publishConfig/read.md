# 发布动态配置

### 目录
[versionNumber ... ] publish 目标迭代版本目录

[resource] 初始版本资源

[js] 初始版本egret编译文件

config.version.min.js

index.html

manifest.json

 @1 url : host..... ?v=versionNumber

 @2 js : scr="xxx/config.version.min.js?v=versionNumber"


 ###code:


 //todo @1在egret Main入口文件里面声明 ============================

  try {this.EgretConfig = window['EgretConfig']}catch (e){};

  EgretConfig.path + "resource/default.res.json" 路径修改

  EgretConfig.path + "resource/default.thm.json" 路径修改


 #### 修改EXML地址前缀 prefixURL
 try {

     if(this.EgretConfig['needToUpdata']&&this.EgretConfig['needToUpdata'] == true)  EXML.prefixURL =this.EgretConfig['path'];

 }catch (e){}

 #### //todo @1在egret index.html入口文件 判断是否更新============================

      var isHasConfig = typeof EgretConfig['needToUpdata'] !== 'undefined' ? true : false;

      var needToUpdata =isHasConfig ?  EgretConfig.needToUpdata : false;

      var manifestUrl = isHasConfig&&EgretConfig.needToUpdata===true ? EgretConfig.resource : './manifest.json?v=' + Math.random();

     //更新js路径

     var url =isHasConfig&&EgretConfig.needToUpdata===true ? EgretConfig.path +list[loaded] : list[loaded] ;

  #### //todo 注意，如果是检测404，则默认访问根目录的资源


# 压缩合并配置
config.ts  合并配置
myplugin.ts   重新排序 manifest.json 配置