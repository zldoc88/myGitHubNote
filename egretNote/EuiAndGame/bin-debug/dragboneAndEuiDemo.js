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
var dragoneAndEuiDemo = (function (_super) {
    __extends(dragoneAndEuiDemo, _super);
    function dragoneAndEuiDemo() {
        var _this = _super.call(this) || this;
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
        //监听 Group 显示对象直接添加到舞台显示列表 , 未完成调用  this.stage.stageWidth === undefined
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.oncomplect, _this);
        return _this;
    }
    dragoneAndEuiDemo.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    dragoneAndEuiDemo.prototype.oncomplect = function () {
        var sky = this.createBitmapByName("bg_jpg");
        //this.addChild(sky);
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;
        this.width = stageW;
        this.height = stageH;
        //文本--------------------------------------------------------------------------
        var colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "DragonBones and EUI Demo!!";
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);
        //龙骨---------------------------------------------------------------------------
        this.drawDragonBones('changeSkin_ske_json', 'changeSkin_tex_json', 'changeSkin_tex_png');
        //eui布局------------------------------------------------------------------------
        var testimg = new itemTool();
        var testimg2 = new itemTool();
        this.addChild(testimg);
        this.addChild(testimg2);
        testimg.setItemGrerger('======', '***************');
        testimg2.setItemGrerger('=测试第二个==', '------内容----');
        testimg.y = 250;
        testimg2.y = 450;
        //按钮以及事件--------------------------------------------------------------------
        var button = new eui.Button();
        button.label = "Click!";
        button.horizontalCenter = 0;
        button.verticalCenter = 0;
        this.addChild(button);
        button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.testPoint, this);
    };
    /**
     * 点击按钮
     * Click the button
     */
    dragoneAndEuiDemo.prototype.onButtonClick = function (e) {
        this.changeSlotSkin();
        return;
        var panel = new eui.Panel();
        panel.title = "Title";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
    };
    dragoneAndEuiDemo.prototype.testPoint = function (e) {
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
    dragoneAndEuiDemo.prototype.changeSlotSkin = function () {
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
    dragoneAndEuiDemo.prototype.replaceSlotBitmap = function (scureName, tagertName) {
        var Slot_body = this.demoDragonBonesArmaturedisplay.armature.getSlot(scureName);
        var b = new egret.Bitmap();
        b.texture = RES.getRes(tagertName);
        b.x = Slot_body.display.x;
        b.y = Slot_body.display.y;
        b.anchorOffsetX = b.width / 2;
        b.anchorOffsetY = b.height / 2;
        Slot_body.setDisplay(b);
    };
    dragoneAndEuiDemo.prototype.drawDragonBones = function (ske_json, tex_json, tex_png) {
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
    return dragoneAndEuiDemo;
}(eui.Group));
__reflect(dragoneAndEuiDemo.prototype, "dragoneAndEuiDemo");
//# sourceMappingURL=dragboneAndEuiDemo.js.map