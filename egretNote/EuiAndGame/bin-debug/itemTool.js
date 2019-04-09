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
var itemTool = (function (_super) {
    __extends(itemTool, _super);
    function itemTool() {
        return _super.call(this) || this;
    }
    itemTool.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    itemTool.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    itemTool.prototype.setItemGrerger = function (strname, strvalue) {
        this.title.text = strname;
        this.content.text = strvalue;
        this.pic.source = 'bg_jpg';
        //console.log(this.pic);
        //todo @1变量设置循环 ==========================
        //this.btnTween['props'] = {loop:true}; 
        //todo @2 emxl 添加循环属性=====================
        //tween:TweenItem 节点添加下面标签设置是否循环
        // <tween:props>
        // 		<e:Object loop="{true}" />
        // </tween:props>
        //console.log('this.g',this.g);
        this.g.play(); //播放动画组
    };
    return itemTool;
}(eui.Component));
__reflect(itemTool.prototype, "itemTool", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=itemTool.js.map