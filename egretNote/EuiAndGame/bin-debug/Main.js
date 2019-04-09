//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //换装
        /**
             * 换装
             * @type {egret.Sprite}
             *
             * @1 armature.replaceTexture(RES.getRes("new_db_texture_png")); //全局换装
             *
             * @2 factory.replaceSlotDisplay ( dragonBonesName :string, armatureName :string, slotName :string, displayName :string, slot :dragonBones.Slot, displayIndex :number ):void
             *
             dragonBonesName:string — 指定的龙骨数据名称。
    
             armatureName:string — 指定的骨架名称。
    
             slotName:string — 指定的插槽名称。
    
             displayName:string — 指定的显示对象名称。
    
             slot:dragonBones.Slot — 指定的插槽实例。
    
             displayIndex:number — 要替换的显示对象的索引，如果未设置，则替换当前正在显示的显示对象。
    
             实例 this.firstPage.factory.replaceSlotDisplay("changeSkin", "Armature", "body", 'skin_body_png', this.firstPage.armature.getSlot("body") ,1);
             *
             * @3 动态局部换装
             *  var Slot=this.armature.getSlot(glotName);
                var b:egret.Bitmap = new egret.Bitmap();
                b.texture = RES.getRes( ResName );
                 b.x = Slot.display.x;
                 b.y = Slot.display.y;
                 b.anchorOffsetX = b.width/2;
                 b.anchorOffsetY = b.height/2;
                Slot.setDisplay( b );
             */
        _this.isChanged = false;
        return _this;
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        egret.lifecycle.addLifecycleListener(function (context) {
            // custom lifecycle plugin
        });
        egret.lifecycle.onPause = function () {
            egret.ticker.pause();
        };
        egret.lifecycle.onResume = function () {
            egret.ticker.resume();
        };
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        this.runGame().catch(function (e) {
            console.log(e);
        });
    };
    Main.prototype.runGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadResource()];
                    case 1:
                        _a.sent();
                        this.createGameScene();
                        // const result = await RES.getResAsync("description_json")
                        // this.startAnimation(result);
                        return [4 /*yield*/, platform.login()];
                    case 2:
                        // const result = await RES.getResAsync("description_json")
                        // this.startAnimation(result);
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadResource = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loadingView, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        loadingView = new LoadingUI();
                        this.stage.addChild(loadingView);
                        return [4 /*yield*/, RES.loadConfig("resource/default.res.json", "resource/")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.loadTheme()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, RES.loadGroup("preload", 0, loadingView)];
                    case 3:
                        _a.sent();
                        this.stage.removeChild(loadingView);
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        console.error(e_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Main.prototype.loadTheme = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            var theme = new eui.Theme("resource/default.thm.json", _this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, function () {
                resolve();
            }, _this);
        });
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.createGameScene = function () {
        var sky = this.createBitmapByName("bg_jpg");
        //this.addChild(sky);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);
        var icon = this.createBitmapByName("egret_icon_png");
        this.addChild(icon);
        icon.x = 26;
        icon.y = 33;
        var line = new egret.Shape();
        line.graphics.lineStyle(2, 0xffffff);
        line.graphics.moveTo(0, 0);
        line.graphics.lineTo(0, 117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        this.addChild(line);
        var colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "DragonBones and EUI Demo!!";
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);
        var textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;
        this.drawDragonBones('changeSkin_ske_json', 'changeSkin_tex_json', 'changeSkin_tex_png');
        var testimg = new itemTool();
        var testimg2 = new itemTool();
        this.addChild(testimg);
        this.addChild(testimg2);
        testimg.setItemGrerger('======', '***************');
        testimg2.setItemGrerger('=测试第二个==', '------内容----');
        testimg.y = 250;
        testimg2.y = 450;
        var button = new eui.Button();
        button.label = "Click!";
        button.horizontalCenter = 0;
        button.verticalCenter = 0;
        this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.testPoint, this);
    };
    Main.prototype.testPoint = function (e) {
        this.touchPoint = new egret.Point();
        this.touchPoint.x = e.stageX;
        this.touchPoint.y = e.stageY;
        this.touchPoint['has'] = true;
        var _target = new egret.Point();
        this.demoDragonBonesArmaturedisplay.globalToLocal(this.touchPoint.x, this.touchPoint.y, _target);
        //todo boundingBox 插槽有效,,,,
        // console.log('this.slotHead',this.slotHead);
        var r = this.slotHead.containsPoint(_target.x, _target.y);
        // console.log(r,_target);
        return;
    };
    Main.prototype.drawDragonBones = function (ske_json, tex_json, tex_png) {
        var dragonbonesData = RES.getRes(ske_json);
        var textureData = RES.getRes(tex_json);
        var texture2 = RES.getRes(tex_png);
        this.demoDragonBonesFactory = new dragonBones.EgretFactory(); //创建一个龙骨工厂
        this.demoDragonBonesFactory.parseDragonBonesData(dragonbonesData);
        this.demoDragonBonesFactory.parseTextureAtlasData(textureData, texture2);
        this.demoDragonBonesArmaturedisplay = this.demoDragonBonesFactory.buildArmatureDisplay("Armature");
        this.slotHead = this.demoDragonBonesArmaturedisplay.armature.getSlot('head_boundingBox');
        this.demoDragonBonesArmaturedisplay.debugDraw = true;
        var slotbody = this.demoDragonBonesArmaturedisplay.armature.getSlot("body");
        this.slotBodyDefaultDisplay = slotbody.rawDisplay; //缓存默认皮肤
        this.addChild(this.demoDragonBonesArmaturedisplay);
        this.demoDragonBonesArmaturedisplay.y = 575;
        this.demoDragonBonesArmaturedisplay.animation.play('jump'); //播放龙骨动画
        this.demoDragonBonesArmaturedisplay.animation.timeScale = 0.5;
        // this.demoDragonBonesArmaturedisplay.armature.inheritAnimation = false;
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    Main.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    Main.prototype.startAnimation = function (result) {
        var _this = this;
        var parser = new egret.HtmlTextParser();
        var textflowArr = result.map(function (text) { return parser.parse(text); });
        var textfield = this.textfield;
        var count = -1;
        var change = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var textFlow = textflowArr[count];
            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            var tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, _this);
        };
        // change();
    };
    Main.prototype.changeSlotSkin = function () {
        if (this.isChanged) {
            this.isChanged = false;
            var slotbody = this.demoDragonBonesArmaturedisplay.armature.getSlot("body");
            slotbody.setDisplay(this.slotBodyDefaultDisplay); //还原默认皮肤
            return;
        }
        this.isChanged = true;
        this.replaceSlotBitmap('body', 'skin_body_png');
        this.replaceSlotBitmap('left-handl', 'skin_left_handl_png'); //skin_left_handl_png ,skin_right_handl_png
        this.replaceSlotBitmap('right-handl', 'skin_right_handl_png');
    };
    //todo @换装======================== @@@@@实例@@@@
    Main.prototype.replaceSlotBitmap = function (scureName, tagertName) {
        var Slot_body = this.demoDragonBonesArmaturedisplay.armature.getSlot(scureName);
        var b = new egret.Bitmap();
        b.texture = RES.getRes(tagertName);
        b.x = Slot_body.display.x;
        b.y = Slot_body.display.y;
        b.anchorOffsetX = b.width / 2;
        b.anchorOffsetY = b.height / 2;
        Slot_body.setDisplay(b);
    };
    /**
     * 点击按钮
     * Click the button
     */
    Main.prototype.onButtonClick = function (e) {
        this.changeSlotSkin();
        return;
        var panel = new eui.Panel();
        panel.title = "Title";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
    };
    return Main;
}(eui.UILayer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map