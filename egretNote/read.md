Exml EgretWing 可视编辑模式

* Draw DragonBones to stage

code：
        var dragonbonesData = RES.getRes('ske_json');
        var textureData = RES.getRes( 'tex_json');
        var texture2 = RES.getRes('tex_png');

        this.factory =new dragonBones.EgretFactory();
        this.factory.parseDragonBonesData(dragonbonesData);
        this.factory.parseTextureAtlasData(textureData,texture2);

        this.armature = this.factory.buildArmature("Armature");
        this.armaturedisplay =  this.armature.getDisplay();

        this.addChild(this.armaturedisplay);
        this.armaturedisplay.x=0;
        this.armaturedisplay.y=0;

        this.armature.animation.timeScale = 2.5;
        dragonBones.WorldClock.clock.add( this.armature);




         * 换装 ====================================
         * @type {egret.Sprite}
         *
         * @1:: armature.replaceTexture(RES.getRes("new_db_texture_png")); //全局换装
         *
         * @2:: factory.replaceSlotDisplay ( dragonBonesName :string, armatureName :string, slotName :string, displayName :string, slot :dragonBones.Slot, displayIndex :number ):void
         *
         dragonBonesName:string — 指定的龙骨数据名称。

         armatureName:string — 指定的骨架名称。

         slotName:string — 指定的插槽名称。

         displayName:string — 指定的显示对象名称。

         slot:dragonBones.Slot — 指定的插槽实例。

         displayIndex:number — 要替换的显示对象的索引，如果未设置，则替换当前正在显示的显示对象。

         实例 this.firstPage.factory.replaceSlotDisplay("changeSkin", "Armature", "body", 'skin_body_png', this.firstPage.armature.getSlot("body") ,1);
         *
         * @3:: 动态局部换装 -------------------
         var Slot=this.armature.getSlot(slotName);
         var b:egret.Bitmap = new egret.Bitmap();
         b.texture = RES.getRes( ResName );
         b.x = Slot.display.x;
         b.y = Slot.display.y;
         b.anchorOffsetX = b.width/2;
         b.anchorOffsetY = b.height/2;
         Slot.setDisplay( b );
