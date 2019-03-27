
class dragonBonesOutput extends egret.Sprite{

    public constructor() {
        super();
    }

    public factory=null;
    public armature=null;
    public armaturedisplay=null;

    public init( ske,map , res ,timeScale){

        var dragonbonesData = RES.getRes( ske ); //stage_ske_json,stage_tex_json,stage_tex_png
        var textureData = RES.getRes( map ); //man2_texture_json
        var texture2 = RES.getRes( res );

        this.factory =new dragonBones.EgretFactory(); //创建一个龙骨工厂
        this.factory.parseDragonBonesData(dragonbonesData);
        this.factory.parseTextureAtlasData(textureData,texture2);


        this.armature = this.factory.buildArmature("Armature");
        this.armaturedisplay = this.armature.getDisplay();

        this.addChild(this.armaturedisplay);
        this.armaturedisplay.x=0;
        this.armaturedisplay.y=0;

        this.armature.animation.timeScale = timeScale || 1.5;
        dragonBones.WorldClock.clock.add(this.armature);
        return this;
    }

    public clear(){
        dragonBones.WorldClock.clock.remove(this.armature);
    }

    public ativePlayName = '';
    public play(name){
        this.ativePlayName =name;
        this.armature.animation.gotoAndPlay(name,-1,-1);

    }
    public gotoAndStop(a,b){
        this.armature.animation.gotoAndStop(a,b);

    }
    public gotoAndStopByFrame(a,b){
        this.armature.animation.gotoAndStopByFrame(a,b);

    }







}
