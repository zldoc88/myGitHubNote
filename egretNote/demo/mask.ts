class mask extends  egret.Sprite {

    public static CLASSNAME:string = "mask";

    public constructor() {
        super();
    }

    private imgWidth;
    private imgHeight;
    private circle;

    public init(imgWidth,imgHeight,url){

        this.imgWidth = imgWidth;
        this.imgHeight = imgHeight;
        //empty_png
        var empty_png:egret.Texture = RES.getRes( "empty_png" );
        this.img= new egret.Bitmap( empty_png );
        this.addChild(this.img);

        //画一个蓝色的圆形
        this.circle = new egret.Shape();
        this.circle.graphics.beginFill(0x000000);
        this.circle.graphics.drawCircle(this.imgWidth/2,this.imgHeight/2,this.imgWidth/2);
        this.circle.graphics.endFill();
        this.addChild(this.circle);
        this.img.mask = this.circle;

        RES.getResByUrl(url,this.onComplect,this);

    }
    private img;
    private onComplect(texture:egret.Texture){

        this.img.texture=texture;




    }

}
