var __reflect=this&&this.__reflect||function(e,t,n){e.__class__=t,n?n.push(t):n=[t],e.__types__=e.__types__?n.concat(e.__types__):n},__extends=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);n.prototype=t.prototype,e.prototype=new n},__awaiter=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(o,i){function a(e){try{l(r.next(e))}catch(t){i(t)}}function s(e){try{l(r["throw"](e))}catch(t){i(t)}}function l(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(a,s)}l((r=r.apply(e,t||[])).next())})},__generator=this&&this.__generator||function(e,t){function n(e){return function(t){return r([e,t])}}function r(n){if(o)throw new TypeError("Generator is already executing.");for(;l;)try{if(o=1,i&&(a=i[2&n[0]?"return":n[0]?"throw":"next"])&&!(a=a.call(i,n[1])).done)return a;switch(i=0,a&&(n=[0,a.value]),n[0]){case 0:case 1:a=n;break;case 4:return l.label++,{value:n[1],done:!1};case 5:l.label++,i=n[1],n=[0];continue;case 7:n=l.ops.pop(),l.trys.pop();continue;default:if(a=l.trys,!(a=a.length>0&&a[a.length-1])&&(6===n[0]||2===n[0])){l=0;continue}if(3===n[0]&&(!a||n[1]>a[0]&&n[1]<a[3])){l.label=n[1];break}if(6===n[0]&&l.label<a[1]){l.label=a[1],a=n;break}if(a&&l.label<a[2]){l.label=a[2],l.ops.push(n);break}a[2]&&l.ops.pop(),l.trys.pop();continue}n=t.call(e,l)}catch(r){n=[6,r],i=0}finally{o=a=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var o,i,a,s,l={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:n(0),"throw":n(1),"return":n(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s},AssetAdapter=function(){function e(){}return e.prototype.getAsset=function(e,t,n){function r(r){t.call(n,r,e)}if(RES.hasRes(e)){var o=RES.getRes(e);o?r(o):RES.getResAsync(e,r,this)}else RES.getResByUrl(e,r,this,RES.ResourceItem.TYPE_IMAGE)},e}();__reflect(AssetAdapter.prototype,"AssetAdapter",["eui.IAssetAdapter"]);var dragoneAndEuiDemo=function(e){function t(){var t=e.call(this)||this;return t.isChanged=!1,t.addEventListener(egret.Event.ADDED_TO_STAGE,t.oncomplect,t),t}return __extends(t,e),t.prototype.createBitmapByName=function(e){var t=new egret.Bitmap,n=RES.getRes(e);return t.texture=n,t},t.prototype.oncomplect=function(){var e=this.createBitmapByName("bg_jpg");this.addChild(e);var t=this.stage.stageWidth,n=this.stage.stageHeight;e.width=t,e.height=n,this.width=t,this.height=n;var r=new egret.TextField;r.textColor=16777215,r.width=t-172,r.textAlign="center",r.text="DragonBones and EUI Demo!!",r.size=24,r.x=172,r.y=80,this.addChild(r),this.drawDragonBones("changeSkin_ske_json","changeSkin_tex_json","changeSkin_tex_png");var o=new itemTool,i=new itemTool;this.addChild(o),this.addChild(i),o.setItemGrerger("======","***************"),i.setItemGrerger("=测试第二个==","------内容----"),o.y=250,i.y=450;var a=new eui.Button;a.label="Click!",a.horizontalCenter=0,a.verticalCenter=0,this.addChild(a),a.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onButtonClick,this),this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.testPoint,this)},t.prototype.onButtonClick=function(e){return void this.changeSlotSkin()},t.prototype.testPoint=function(e){this.touchPoint=new egret.Point,this.touchPoint.x=e.stageX,this.touchPoint.y=e.stageY,this.touchPoint.has=!0;var t=new egret.Point;this.demoDragonBonesArmaturedisplay.globalToLocal(this.touchPoint.x,this.touchPoint.y,t);this.slotHead.containsPoint(t.x,t.y)},t.prototype.changeSlotSkin=function(){if(this.isChanged){this.isChanged=!1;var e=this.demoDragonBonesArmaturedisplay.armature.getSlot("body");return void e.setDisplay(this.slotBodyDefaultDisplay)}this.isChanged=!0,this.replaceSlotBitmap("body","skin_body_png"),this.replaceSlotBitmap("left-handl","skin_left_handl_png"),this.replaceSlotBitmap("right-handl","skin_right_handl_png")},t.prototype.replaceSlotBitmap=function(e,t){var n=this.demoDragonBonesArmaturedisplay.armature.getSlot(e),r=new egret.Bitmap;r.texture=RES.getRes(t),r.x=n.display.x,r.y=n.display.y,r.anchorOffsetX=r.width/2,r.anchorOffsetY=r.height/2,n.setDisplay(r)},t.prototype.drawDragonBones=function(e,t,n){var r=RES.getRes(e),o=RES.getRes(t),i=RES.getRes(n);this.demoDragonBonesFactory=new dragonBones.EgretFactory,this.demoDragonBonesFactory.parseDragonBonesData(r),this.demoDragonBonesFactory.parseTextureAtlasData(o,i),this.demoDragonBonesArmaturedisplay=this.demoDragonBonesFactory.buildArmatureDisplay("Armature"),this.slotHead=this.demoDragonBonesArmaturedisplay.armature.getSlot("head_boundingBox"),this.demoDragonBonesArmaturedisplay.debugDraw=!0;var a=this.demoDragonBonesArmaturedisplay.armature.getSlot("body");this.slotBodyDefaultDisplay=a.rawDisplay,this.addChild(this.demoDragonBonesArmaturedisplay),this.demoDragonBonesArmaturedisplay.y=575,this.demoDragonBonesArmaturedisplay.animation.play("jump"),this.demoDragonBonesArmaturedisplay.animation.timeScale=.5},t}(eui.Group);__reflect(dragoneAndEuiDemo.prototype,"dragoneAndEuiDemo");var itemTool=function(e){function t(){return e.call(this)||this}return __extends(t,e),t.prototype.partAdded=function(t,n){e.prototype.partAdded.call(this,t,n)},t.prototype.childrenCreated=function(){e.prototype.childrenCreated.call(this)},t.prototype.setItemGrerger=function(e,t){this.title.text=e,this.content.text=t,this.pic.source="bg_jpg",this.g.play()},t}(eui.Component);__reflect(itemTool.prototype,"itemTool",["eui.UIComponent","egret.DisplayObject"]);var LoadingUI=function(e){function t(){var t=e.call(this)||this;return t.createView(),t}return __extends(t,e),t.prototype.createView=function(){this.textField=new egret.TextField,this.addChild(this.textField),this.textField.y=300,this.textField.width=480,this.textField.height=100,this.textField.textAlign="center"},t.prototype.onProgress=function(e,t){this.textField.text="Loading..."+e+"/"+t},t}(egret.Sprite);__reflect(LoadingUI.prototype,"LoadingUI",["RES.PromiseTaskReporter"]);var Main=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.createChildren=function(){e.prototype.createChildren.call(this),egret.lifecycle.addLifecycleListener(function(e){}),egret.lifecycle.onPause=function(){egret.ticker.pause()},egret.lifecycle.onResume=function(){egret.ticker.resume()};var t=new AssetAdapter;egret.registerImplementation("eui.IAssetAdapter",t),egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter),this.runGame()["catch"](function(e){console.log(e)})},t.prototype.runGame=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){switch(e.label){case 0:return[4,this.loadResource()];case 1:return e.sent(),this.createGameScene(),[4,platform.login()];case 2:return e.sent(),[2]}})})},t.prototype.loadResource=function(){return __awaiter(this,void 0,void 0,function(){var e,t;return __generator(this,function(n){switch(n.label){case 0:return n.trys.push([0,4,,5]),e=new LoadingUI,this.stage.addChild(e),[4,RES.loadConfig("resource/default.res.json","resource/")];case 1:return n.sent(),[4,this.loadTheme()];case 2:return n.sent(),[4,RES.loadGroup("preload",0,e)];case 3:return n.sent(),this.stage.removeChild(e),[3,5];case 4:return t=n.sent(),console.error(t),[3,5];case 5:return[2]}})})},t.prototype.loadTheme=function(){var e=this;return new Promise(function(t,n){var r=new eui.Theme("resource/default.thm.json",e.stage);r.addEventListener(eui.UIEvent.COMPLETE,function(){t()},e)})},t.prototype.createGameScene=function(){console.log(JSZip),this.addChild(new dragoneAndEuiDemo)},t}(eui.UILayer);__reflect(Main.prototype,"Main");var DebugPlatform=function(){function e(){}return e.prototype.getUserInfo=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2,{nickName:"username"}]})})},e.prototype.login=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2]})})},e}();__reflect(DebugPlatform.prototype,"DebugPlatform",["Platform"]),window.platform||(window.platform=new DebugPlatform);var ThemeAdapter=function(){function e(){}return e.prototype.getTheme=function(e,t,n,r){function o(e){t.call(r,e)}function i(t){t.resItem.url==e&&(RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,i,null),n.call(r))}var a=this;if("undefined"!=typeof generateEUI)egret.callLater(function(){t.call(r,generateEUI)},this);else if("undefined"!=typeof generateEUI2)RES.getResByUrl("resource/gameEui.json",function(e,n){window.JSONParseClass.setData(e),egret.callLater(function(){t.call(r,generateEUI2)},a)},this,RES.ResourceItem.TYPE_JSON);else if("undefined"!=typeof generateJSON)if(e.indexOf(".exml")>-1){var s=e.split("/");s.pop();var l=s.join("/")+"_EUI.json";generateJSON.paths[e]?egret.callLater(function(){t.call(r,generateJSON.paths[e])},this):RES.getResByUrl(l,function(n){window.JSONParseClass.setData(n),egret.callLater(function(){t.call(r,generateJSON.paths[e])},a)},this,RES.ResourceItem.TYPE_JSON)}else egret.callLater(function(){t.call(r,generateJSON)},this);else RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,i,null),RES.getResByUrl(e,o,this,RES.ResourceItem.TYPE_TEXT)},e}();__reflect(ThemeAdapter.prototype,"ThemeAdapter",["eui.IThemeAdapter"]);