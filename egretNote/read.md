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
