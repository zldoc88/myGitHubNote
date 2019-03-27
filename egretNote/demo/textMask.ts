class textMask extends  egret.Sprite {

    public static CLASSNAME:string = "textMask";

    public constructor() {
        super();
    }

    private textWidth=654;
    private textHeight=320;
    private Rect;
    private textField;
    private textField2;

    public init(textAlign,width,text){

        var textAligns =textAlign;
        this.textWidth=width;

        this.textField = new egret.TextField();
        this.addChild(this.textField);
        this.textField.x = 0;
        this.textField.y = 380;
        this.textField.width = this.textWidth;
        this.textField.height =  this.textHeight;
        this.textField.textAlign ='center';
        this.textField.lineSpacing  = 15;
        this.textField.textColor  = '0x3debd0';
        this.textField.textFlow = (new egret.HtmlTextParser).parser(text);

        this.textField2 = new egret.TextField();
        this.addChild(this.textField2);
        this.textField2.x = 2;
        this.textField2.y = 382;
        this.textField2.width = this.textWidth;
        this.textField2.height =  this.textHeight;
        this.textField2.textAlign ='center';
        this.textField2.lineSpacing  = 15;
        this.textField2.textColor  = '0x999999';
        this.textField2.textFlow = (new egret.HtmlTextParser).parser(text);

        this.addChild(this.textField);

    }


}
