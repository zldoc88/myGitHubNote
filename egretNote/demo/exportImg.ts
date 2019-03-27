class exportImg{


    public init(bg,fn){

        var i=6;
        var imgs = {};
        var _exImg = new egret.Sprite();

        var _goDraw=()=>{
            if(i!==0) return;

            _exImg.addChild(imgs['beij']);

            _exImg.addChild(imgs['taiy']);
            imgs['taiy'].x = bg['taiy'].x;
            imgs['taiy'].y= bg['taiy'].y;
            imgs['taiy'].anchorOffsetX= bg['taiy'].anchorOffsetX;
            imgs['taiy'].anchorOffsetY= bg['taiy'].anchorOffsetY;

            _exImg.addChild(imgs['renwu']);
            imgs['renwu'].x = bg['renwu'].x;
            imgs['renwu'].y= bg['renwu'].y;

            var bot1=320;
            _exImg.addChild(imgs['neir']);
            imgs['neir'].x = bg['neir'].x;
            imgs['neir'].y= bg['neir'].y + bot1;

            var bot2=180;
            _exImg.addChild(imgs['erweima']);
            imgs['erweima'].x = bg['erweima'].x;
            imgs['erweima'].y = bg['erweima'].y+bot2;

            _exImg.addChild(imgs['erweitext']);
            imgs['erweitext'].x = bg['erweitext'].x;
            imgs['erweitext'].y = bg['erweitext'].y+bot2;

            var rt: egret.RenderTexture = new egret.RenderTexture();   //建立缓冲画布
            rt.drawToTexture(_exImg, new egret.Rectangle(0, 0, Game.sys.width, Game.sys.height));  //将对象画到缓冲画布上（可指定画对象的某个区域，或画整个）
            var imageBase64:string = rt.toDataURL("image/png");
            fn(imageBase64);

        };

        RES.getResByUrl(bg['beij'].url.toDataURL("image/png"),(event)=>{ i--;var img: egret.Texture = <egret.Texture>event;imgs['beij']=new egret.Bitmap(img);_goDraw(); },this,RES.ResourceItem.TYPE_IMAGE);
        RES.getResByUrl(bg['erweima'].url.toDataURL("image/png"),(event)=>{i--;var img: egret.Texture = <egret.Texture>event;imgs['erweima']=new egret.Bitmap(img);_goDraw();},this,RES.ResourceItem.TYPE_IMAGE);
        RES.getResByUrl(bg['erweitext'].url.toDataURL("image/png"),(event)=>{i--;var img: egret.Texture = <egret.Texture>event;imgs['erweitext']=new egret.Bitmap(img);_goDraw();},this,RES.ResourceItem.TYPE_IMAGE);
        RES.getResByUrl(bg['neir'].url.toDataURL("image/png"),(event)=>{i--;var img: egret.Texture = <egret.Texture>event;imgs['neir']=new egret.Bitmap(img);_goDraw();},this,RES.ResourceItem.TYPE_IMAGE);
        RES.getResByUrl(bg['renwu'].url.toDataURL("image/png"),(event)=>{i--;var img: egret.Texture = <egret.Texture>event;imgs['renwu']=new egret.Bitmap(img);_goDraw();},this,RES.ResourceItem.TYPE_IMAGE);
        RES.getResByUrl(bg['taiy'].url.toDataURL("image/png"),(event)=>{i--;var img: egret.Texture = <egret.Texture>event;imgs['taiy']=new egret.Bitmap(img);_goDraw();},this,RES.ResourceItem.TYPE_IMAGE);



    }

}
