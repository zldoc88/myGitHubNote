
//by jq
!function($){



    // 取file中的image的URL
    function getURLbyInput(file){


        var url= null;
        if(window.createObjectURL != undefined){
            url = window.createObjectURL(file);
        }else if(window.URL != undefined){
            //MOZ
            url = window.URL.createObjectURL(file);
        }else if(window.webkitURL != undefined){
            //MOZ
            url = window.webkitURL.createObjectURL(file);
        }

        return url;
    };

    function distance(setSoLe){
        var x1 = setSoLe[0].x;
        var y1 = setSoLe[0].y;
        var x2 = setSoLe[1].x;
        var y2 = setSoLe[1].y;
        var xdiff = x2 - x1;
        var ydiff = y2 - y1;
        var result = Math.sqrt(xdiff * xdiff + ydiff * ydiff);
        return Math.abs(result);
    }

    //todo 1 . 多图裁剪
    //todo 2. 画布尺寸之定义
    //todo 3 . 裁剪目标尺寸
    //todo 事件绑定

    //todo 黑箱返回

    var cut = function(ops){
        this.input=ops.input || undefined;
        if( typeof this.input === 'undefined') throw new Error('the input is undefined.');
        this.onChange=ops.onChange || function(){};
        this.onInit=ops.onInit || function(){};
        this.onSave=ops.onSave || function(){};
        this.width=ops.width || 640;
        this.height=ops.height || 1280;
        this.targetSize=ops.targetSize || {};
        this.opions=ops||{};
        this.canvas = document.createElement('canvas');
        this.cxt=this.canvas.getContext('2d');
        // 裁剪坐标
        this.cutX = 0;
        this.cutY = 0;
        // 默认开始图片开始点
        this.ImgStartPotion = {
            x :0,
            y :0
        };
        this.uploadPhoto;
        this.btnContainer;

        this.minWidth;


        this.container = $('body');
        this.init();
    };
    cut.prototype={
        init:function() {
            var self = this;
            self.container.append(this.canvas);
            this.canvas.style='position: fixed; z-index: 1008; bottom: 0; left: 0; width: 100%; height:100%; visibility:hidden';//visible
            self.canvas.width = self.width;
            self.canvas.height = self.height;

            self.cutX =(self.width - self.targetSize.width)/2;
            self.cutY =(self.height - self.targetSize.height)/2;


            this.btnContainert = $('<div id="btns-contr-box" style="display: none;position: fixed; z-index: 9999; bottom: 0; left: 0; width: 100%; text-align: center ; color:#fff"></div>');
            var $itemrow=$('<div class="ads-row"></div>');
            $itemrow.append('<span class="ads-c-6 cancel" style="color: #fff;line-height: 86px; font-size: 26px;">取消</span>');
            $itemrow.append('<span class="ads-c-6 sure"  style="color: #fff; line-height: 86px; font-size: 26px;">保存</span>');
            this.btnContainert.append($itemrow);
            this.btnContainert.appendTo(self.container);

            this.input.on('change',function(e){
                var filedata = this.files[0];
                var result = getURLbyInput(filedata);
                self.changeFile(result);
            });
            this.canvas.addEventListener('touchstart',function(e){self.touchStar(e)});
            this.canvas.addEventListener('touchmove',function(e){self.touchMove(e)});
            this.canvas.addEventListener('touchend',function(e){self.touchEnd(e)});

            this.btnContainert.find('.cancel').click(function(e){self.cancel(e)});
            this.btnContainert.find('.sure').click(function(e){self.save(e)});
            this.onInit();
        }
        ,cancel:function(){
            this.cxt.clearRect(0,0,this.width,this.height);
            this.canvas.style['visibility']='hidden';
            this.btnContainert.hide();
        }
        ,save:function(){
            this.onSave(this.exprotImage('png'));
            this.cxt.clearRect(0,0,this.width,this.height);
            this.canvas.style['visibility']='hidden';
            this.btnContainert.hide();
        }
        ,exprotImage:function(type){
            //导出png
            var self = this;
            var outputCanvas = document.createElement('canvas');

            outputCanvas.width = self.targetSize.width;
            outputCanvas.height = self.targetSize.height;
            //
            var outputCanvasCtx = outputCanvas.getContext('2d');
            outputCanvasCtx.drawImage(self.uploadPhoto,self.ImgStartPotion.x-self.cutX,self.ImgStartPotion.y-self.cutY,self.imgWidth,self.imgHeight);
            var type = type || 'jpeg';
            return outputCanvas.toDataURL('image/'+type);
        }
        ,showBtn:function(){
            this.btnContainert.show();
        }
        //todo 手指触碰开始 --------------
        ,touchStar:function(e){
            e.preventDefault();


            this.startFousePotion.x = e.changedTouches[0].pageX;
            this.startFousePotion.y = e.changedTouches[0].pageY;

            //缩放---- 释放
            if(e.touches.length >1){
                this.doType=2; //缩放
                return;
            }
            this.doType=1; //移动
        }
        ,startFousePotion:{}
        //todo 手指弹起 --------------
        ,touchEnd:function(e){
            e.preventDefault();

            if(e.touches.length ==0) this.doType=0;
            //缩放---- 释放
            if(e.touches.length <2){
                this.touchSpace=0;
                this.isSoleStatue=-1;
            }
        }
        //todo  -1:默认无操作状态 , 0 : 二手指准备中,计算开始之间距离 ，1：缩放执行计算
        ,isSoleStatue:-1 // 0 1 2
        ,touchSpace:0 // 开始记录两个手指之间距离

        //todo 1:移动 , 2: 缩放 ， 0：无操作
        ,doType :0
        ,defAngle :0 // 缩放倍数

        ,getDistance:function(e){
            //缩放
            var setSoLe ={};
            for(var i=0; i<2;i++){
                var t =e.changedTouches[i];

                setSoLe[i] = {};
                setSoLe[i].x = t.pageX;
                setSoLe[i].y = t.pageY;
            }
            return distance(setSoLe); // 手指之间距离
        }

        //todo 手指滑动(系统只提供第一根手指上报所有手指数据) --------------
        ,touchMove:function(e){
            e.preventDefault();

            var self = this;

            //todo @@ 缩放=========================
            if(e.changedTouches.length >1  ){


                this.isSoleStatue=this.isSoleStatue==-1 ? 0 :this.isSoleStatue;

                //开始记录两个手指之间距离 缩放倍数为1
                if(this.isSoleStatue==0){

                    self.defAngle =1;
                    self.touchSpace  = this.getDistance(e);
                    this.isSoleStatue=1;
                    return;
                }

                var Space =  this.getDistance(e);
                var defAngle =  Space/self.touchSpace;

                var nen_imgW = self.imgWidth *  defAngle;
                var nen_imgH = self.imgHeight *  defAngle;

                if(nen_imgW < this.minWidth)  return;

                var b_x =self.ImgStartPotion.x - ( nen_imgW - self.imgWidth ) /2;
                var b_y =self.ImgStartPotion.y - ( nen_imgH - self.imgHeight ) /2;

                //todo 更新边界数值，判断是否超出范围，超出则不更新画布
                this.setPiont(nen_imgW,nen_imgH);
                if(this.isOutedH(b_x) || this.isOutedV(b_y)) return;

                //todo 单向边界限制更新画布
                if(!this.isOutedH(b_x)) this.ImgStartPotion.x = b_x;
                if(!this.isOutedV(b_y)) this.ImgStartPotion.y = b_y;

                self.defAngle =  defAngle;
                self.touchSpace  =Space;

                //self.ImgStartPotion.x=b_x;
                //self.ImgStartPotion.y=b_y;

                self.imgWidth =nen_imgW;
                self.imgHeight =nen_imgH;

                this.drawToCanvas(e);
                return;
            }

            //todo 优先判断操作类型,触发缩放，要完全释放才可以下一步移动
            if(this.doType == 2) return;
            //todo @@ 移动========================
            this.isSoleStatue=-1;

            var ImgStartPotionX = this.ImgStartPotion.x + (e.changedTouches[0].pageX -this.startFousePotion.x);
            var ImgStartPotionY = this.ImgStartPotion.y + (e.changedTouches[0].pageY -this.startFousePotion.y);


            //todo 移动&拖动边界限制
            if(!this.isOutedH(ImgStartPotionX)) this.ImgStartPotion.x = ImgStartPotionX;
            if(!this.isOutedV(ImgStartPotionY)) this.ImgStartPotion.y = ImgStartPotionY;

            this.setPiont();
            this.drawToCanvas(e);
            this.startFousePotion.x = e.changedTouches[0].pageX;
            this.startFousePotion.y = e.changedTouches[0].pageY;


        }
        ,minPoint:{} //最小坐标
        ,maxPoint:{}//最大坐标
        ,whSol:1//最大坐标
        ,changeFile:function(file){
            var img = new Image(),_this=this;
            _this.canvas.style['visibility']='visible';
            img.onload=function(){
                _this.uploadPhoto = this;
                //判断长宽
                var s = this.width / this.height;
                _this.whSol = s;
                //this.minWidth=_this.targetSize.width;
                //长 》 高
                if(s >1) {
                    _this.imgHeight=_this.targetSize.height;
                    _this.imgWidth = s *  _this.imgHeight;
                    _this.minWidth = _this.imgWidth;
                }else {
                    //长 < 高
                    _this.imgWidth=_this.targetSize.width;
                    _this.minWidth=_this.imgWidth;
                    _this.imgHeight = _this.imgWidth/s;
                }

                _this.showBtn();
                _this.setCenter();
                _this.drawToCanvas();
            };
            img.src = file;

        }
        ,setCenter:function(){
            this.ImgStartPotion.x = (this.width - this.imgWidth) / 2;
            this.ImgStartPotion.y = (this.height - this.imgHeight) / 2;

            this.setPiont();
        }
        //todo 更新边界限制坐标数值
        ,setPiont:function(imgWidth,imgHeight){

            imgWidth = imgWidth || this.imgWidth;
            imgHeight = imgHeight || this.imgHeight;
            this.maxPoint.x = this.cutX;
            this.maxPoint.y = this.cutY;

            this.minPoint.x = this.cutX - (imgWidth - this.targetSize.width);// 截取坐标x- ( 图片长 - 截图长)
            this.minPoint.y = this.cutY - (imgHeight - this.targetSize.height);
        }
        //todo 水平限制
        ,isOutedH:function(x){
            if(    x < this.minPoint.x
                || x > this.maxPoint.x) return true;
            return false;
        }
        //todo 垂直限制
        ,isOutedV:function(y){
            if(    y < this.minPoint.y
                || y > this.maxPoint.y ) return true;
            return false;
        }
        //todo 渲染画布
        ,drawToCanvas:function(){
            var _this = this;
            _this.cxt.clearRect(0,0,_this.width,_this.height);


            //self.cxt.save();
            _this.cxt.fillStyle="rgba(0,0,0,1)";  //填充的颜色
            _this.cxt.fillRect(0,0,_this.width,_this.height);

            _this.cxt.globalCompositeOperation="destination-out";
            _this.cxt.fillStyle="rgba(0,0,0,1)";  //挖空中间

            _this.cxt.fillRect(_this.cutX,_this.cutY,_this.targetSize.width,_this.targetSize.height);

            _this.cxt.globalCompositeOperation="destination-over";
            _this.cxt.strokeStyle = "#ffffff";
            _this.cxt.linewidth=3;  //边框宽
            _this.cxt.strokeRect(_this.cutX,_this.cutY,_this.targetSize.width,_this.targetSize.height);

            _this.cxt.drawImage(_this.uploadPhoto,_this.ImgStartPotion.x,_this.ImgStartPotion.y,_this.imgWidth,_this.imgHeight);

        }
    };



    $.fn['moblieCut']=function(options){

        var def = {
            width : 0,
            input : this,
            height: 0,
            targetSize:{
                width:120,
                height:120
            }
        };
        def = $.extend(def,options);
        return new cut(def);
    }


}(jQuery||{});

