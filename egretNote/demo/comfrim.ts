class comfrim extends  egret.Sprite {

    public static CLASSNAME:string = "comfrim";

    public contentWidth;
    public contentHeight;
    public constructor() {
        super();
    }
    private textField;
    private textWidth;
    private img;

    public init(w,h,text){
        this.contentWidth =w;
        this.contentHeight =h;


        var icon:egret.Texture = RES.getRes( "icon_record_png" );
        this.img= new egret.Bitmap( icon );

        this.addChild(this.img);

        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.y = 250;
        this.textField.width = this.contentWidth;
        this.textField.height =  this.contentHeight;
        this.textField.textAlign ='center';
        this.textField.lineSpacing  = 5;
        this.textField.textColor  = '0xffffff';
        this.textField.textFlow = (new egret.HtmlTextParser).parser(text);
        this.addChild(this.textField);


        //画一个蓝色的圆形
        /*this.rct = new egret.Shape();
        this.rct.graphics.beginFill(0x000000);
        this.rct.graphics.drawCircle(imgWidth/2,imgHeight/2,imgWidth/2);
        this.rct.graphics.endFill();
        this.addChild(this.rct);*/


    }


}
