require(['angular','ResizeIMGFix','ResizeIMG','EXIF'],function(angular,ResizeIMGFix ,localResizeIMG,EXIF){
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


    var previewImg = function(opion,callback){
        this.inputs =opion.inputs;
        this.preciew =opion.preciew;
        this.img =null;
        this.imgWidth =null;
        this.imgHeight =null;
        this.onMosefouce =false;
        this.onSole =false;
        this.onScaleIng =false;
        this.soleTouches =null;
        this.interval = null;
        this.defAngle = null;
        this.defLong = null;
        this.zoom = 100;
        this.opions =opion;
        this.index =opion.index;

        this.callback =callback;
        this.canvas =this.opions.canvas[0];
        this.cxt=this.canvas.getContext('2d');

        this.filedata = this.opions.filedata;
        this.filebold = this.opions.filebold;
        // 裁剪坐标
        this.cutX = 0;
        this.cutY = 0;
        // 默认开始图片开始点
        this.ImgStartPotion = {
            x :0,
            y :0
        };
        window.requestAnimationFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame;

        window.cancelRequestAnimationFrame = window.cancelRequestAnimationFrame
            || window.webkitCancelAnimationFrame
            || window.webkitCancelRequestAnimationFrame
            || window.mozCancelRequestAnimationFrame
            || window.cancelAnimationFrame
            || window.oCancelRequestAnimationFrame
            || window.msCancelRequestAnimationFrame;
        this.init();
    };

    previewImg.prototype ={

        init : function(){
            var self = this;

            self.canvas.width = self.opions.width;
            self.canvas.height = self.opions.height;

            self.cutX =(self.opions.width - self.opions.tagertSize.width)/2;
            self.cutY =(self.opions.height - self.opions.tagertSize.height)/2;

            var startFousePotion = {};
            self.canvas.addEventListener('touchstart',function(e){

                startFousePotion.x = e.changedTouches[0].pageX;
                startFousePotion.y = e.changedTouches[0].pageY;

                // console.log(e.touches);

                if(e.touches.length >2){
                    self.onMosefouce = false;
                    self.onSole =false;
                    self.soleAction();
                }else if(e.touches.length ==2){
                    console.log('2点触控开始!...');
                    self.soleTouches =e.touches;
                    self.onMosefouce = false;
                    self.onSole =true;
                    self.soleAction();
                }else{
                    self.onMosefouce = true;
                    self.onSole =false;
                    //self.StopMove();
                }
            },false);

            self.canvas.addEventListener('touchmove',function(e){
                e.preventDefault();
                if(e.touches.length == 2 && self.onSole){
                    self.soleTouches =e.touches;
                }

                if(self.onMosefouce){
                    // console.log('---------startFousePotion-------------');

                    if(e.clientX-startFousePotion.x>0){
                        //向右拖
                        self.ImgStartPotion.x = self.ImgStartPotion.x + (e.changedTouches[0].pageX-startFousePotion.x)/2 ;
                    }else{
                        self.ImgStartPotion.x = self.ImgStartPotion.x + (e.changedTouches[0].pageX-startFousePotion.x)/2 ;
                    }

                    if(e.clientY-startFousePotion.y>0){
                        //向下拖
                        self.ImgStartPotion.y =  self.ImgStartPotion.y + (e.changedTouches[0].pageY-startFousePotion.y)/2;
                    }else{
                        self.ImgStartPotion.y =  self.ImgStartPotion.y + (e.changedTouches[0].pageY-startFousePotion.y)/2;
                    }

                    self.StartMove(e);
                    startFousePotion.x = e.changedTouches[0].pageX;
                    startFousePotion.y = e.changedTouches[0].pageY;
                    var target = document.elementFromPoint(e.changedTouches[0].pageX, e.changedTouches[0].pageY); //TODO 根据坐标取DOM对象节点
                    // if(!$(target).closest('canvas').length) self.StopMove(e);

                }else{
                    // self.soleTouches =e.touches;
                }

            },false);

            self.canvas.addEventListener('touchend',function(e){
                if(self.onMosefouce){
                    self.onMosefouce = false;
                }

                self.onSole =false;
                self.soleAction();

            },false);


            var img = new Image();
            img.src= self.filebold;
            var exif;
            img.onload = function() {
                self.img=this;
                self.imgWidth = self.opions.width;
                self.imgHeight =  self.imgWidth * self.img.height /self.img.width;
                self.ImgStartPotion.x =0;
                self.ImgStartPotion.y =0;
                self.appedRect();


                EXIF.getData(img, function(){

                    exif = EXIF.getTag(img, 'Orientation');
                    var orientation = typeof exif ==='undefined' ?  1 : exif;
                    // 判断拍照设备持有方向调整照片角度
                    localResizeIMG(self.filebold,{
                        quality: 1,
                        orientation :orientation ,
                        success: function (blods) {
                            var imgurl = blods.base64;
                            var careImg = new Image();

                            careImg.src = imgurl;
                            careImg.onload = function(){
                                self.img=careImg;
                                self.imgWidth = self.opions.width;
                                self.imgHeight =  self.imgWidth * self.img.height /self.img.width;
                                self.ImgStartPotion.x =0;
                                self.ImgStartPotion.y =0;
                                self.appedRect();
                            };


                        }

                    });
                });

            };



            /*console.log(self.SaveBtn);

            self.SaveBtn.onclick=function(e){
                alert(111);
                self.StopMove(e);
                e.preventDefault();
                self.exprotImage('png');
                self.setStopPropagation();

            };*/

        },

        soleAction: function(){
            var self = this;

            var _drawSole=function(){
                self.onScaleIng = true;
                //alert(11);
                var setSoLe ={};
                for(var i=0; i<2;i++){
                    var t =self.soleTouches[i];
                    //t.pageX;
                    setSoLe[i] = {};
                    setSoLe[i].x = t.pageX;
                    setSoLe[i].y = t.pageY;
                }

                var angle = self.distance(setSoLe)*0.05; //两个手指之间的距离
                // alert(angle);
                setSoLe = {}; //释放内存

                if(self.defAngle ==null){
                    self.defAngle = angle;// 第一次赋值
                }else if(self.defAngle !==angle){

                    var sizelong =  Math.sqrt(self.imgWidth * self.imgWidth + self.imgHeight*self.imgHeight);//勾股定理，图片对角线距离

                    var new_sizelong =(self.defAngle > angle) ? sizelong - angle : sizelong + angle; //新图片对角线的距离


                    var nen_imgW =  new_sizelong*self.imgWidth / sizelong; //新图片的宽度
                    var nen_imgH =  self.imgHeight*new_sizelong / sizelong; //新图片的高度


                    var b_x = nen_imgW * (angle/2) / new_sizelong; //新x坐标
                    var b_y = nen_imgH * (angle/2) / new_sizelong; //新y坐标

                    if(self.defAngle > angle){
                        //todo 缩小
                        if(self.imgWidth < self.opions.tagertSize.width) return false;
                        self.ImgStartPotion.x =  self.ImgStartPotion.x + b_x;
                        self.ImgStartPotion.y =  self.ImgStartPotion.y + b_y;
                    }else{
                        //TODO 放大
                        self.ImgStartPotion.x =   self.ImgStartPotion.x-b_x;
                        self.ImgStartPotion.y =   self.ImgStartPotion.y-b_y;

                    }


                    self.imgWidth =nen_imgW;
                    self.imgHeight =nen_imgH;

                    self.StartMove();
                    self.defAngle = angle;

                }

                self.animationFrame=window.requestAnimationFrame(_drawSole)

            };

            if(self.onSole && !self.onScaleIng){
                _drawSole();
            }else{
                self.onScaleIng=false;
                window.cancelRequestAnimationFrame(self.animationFrame);
                self.defAngle = null;
            }


        },

        distance : function(setSoLe){
            var x1 = setSoLe[0].x;
            var y1 = setSoLe[0].y;
            var x2 = setSoLe[1].x;
            var y2 = setSoLe[1].y;
            var xdiff = x2 - x1;
            var ydiff = y2 - y1;
            var result = Math.sqrt(xdiff * xdiff + ydiff * ydiff);
            return Math.abs(result);
        },

        topreventDefault : function(e){
            e.preventDefault()
        },


        StopMove : function(e){
            // console.log('StopMove');
            this.onMosefouce = false;
        },
        StartMove : function(e){
            this.appedRect();
        },

        appedRect : function(){
            var self = this;
            self.cxt.clearRect(0,0,self.opions.width,self.opions.height);
            //self.cxt.save();
            self.cxt.fillStyle="rgba(0,0,0,.55)";  //填充的颜色
            self.cxt.fillRect(0,0,self.opions.width,self.opions.height);

            self.cxt.globalCompositeOperation="destination-out";
            self.cxt.fillStyle="rgba(0,0,0,1)";  //挖空中间

            self.cxt.fillRect(self.cutX,self.cutY,self.opions.tagertSize.width,self.opions.tagertSize.height);

            self.cxt.globalCompositeOperation="destination-over";
            self.cxt.strokeStyle = "#08b0eb";
            self.cxt.linewidth=3;  //边框宽
            self.cxt.strokeRect(self.cutX,self.cutY,self.opions.tagertSize.width,self.opions.tagertSize.height);

            self.cxt.drawImage(self.img,self.ImgStartPotion.x,self.ImgStartPotion.y,self.imgWidth,self.imgHeight);

        },

        exprotImage : function(type,fuc){
            //导出png
            var self = this;
            var outputCanvas = document.createElement('canvas');

            outputCanvas.width = self.opions.tagertSize.width;
            outputCanvas.height = self.opions.tagertSize.height;
            //
            var outputCanvasCtx = outputCanvas.getContext('2d');
            outputCanvasCtx.drawImage(self.img,self.ImgStartPotion.x-self.cutX,self.ImgStartPotion.y-self.cutY,self.imgWidth,self.imgHeight);
            var type = type || 'jpeg';
            var imgData = outputCanvas.toDataURL('image/'+type);
            var databese=imgData.split(',')[1];
            databese = encodeURIComponent(databese);
            fuc(imgData,databese);


        }

    };



    var ngImgCutUploader = angular.module('ng-imgCutUploader', []);

    ngImgCutUploader.directive('canvaHolper',[function(){
        return {
            template: '<canvas width="windowWidth"  height="windowHeight"  ></canvas>'+
            '<div id="_io_saveCurImg" ng-click="saveCurImgResult()"   style="position: fixed; color: #fff; z-index: 99999; bottom: 0; left: 0; width: 100%; height: 34px; line-height: 34px; text-align: center ; background: rgba(0,0,0,.75)">保存截图</div>',
            require:'?ngModel',
            link:function(scope,element,attr ,ngModel){
                //console.log(scope.ngImgCutUploaderOptions);
                var $canvas = element.find('canvas');
                scope.ngImgCutUploaderOptions.canvas =$canvas;
                scope.ngImgCutUploaderOptions.filebold =scope.ioImgcutActiveFile;


                var curResultImg = new previewImg(scope.ngImgCutUploaderOptions);
                //-todo -触发保存图片-----------------
                scope.saveCurImgResult=function(){
                    // 上报--------------------
                    //截图结果
                    ///console.log(scope.ativeUploadModelName);
                    curResultImg.exprotImage('jpg',function(baseUrl,base64){
                        scope.$emit('saveCurImgExport.$emit'+scope.ativeUploadModelName,{baseUrl:baseUrl,base64:base64});
                    });
                };


            }
        };

    }]);

    ngImgCutUploader.directive('ioImgcutuploader',['$document','$compile','$animate','$rootScope',function($document ,$compile,$animate,$rootScope ){

        return {
            require:'?ngModel',
            link:function(scope,element,attr ,ngModel){

                scope.windowWidth = window.innerWidth;
                scope.windowHeight = window.innerHeight;


                scope.ioImgcutActiveFile = null;

                var myContainer;
                element.on('change',function(){
                    $rootScope.stopBack=true;
                    scope.ngImgCutUploaderOptions = {
                        container : $document.find('body'),
                        preciew : attr['tPreciew'] ?  angular.element(document.getElementById(attr['tPreciew'])) : null,
                        inputs : element,
                        view : true,
                        width :scope.windowWidth,
                        height:scope.windowHeight,
                        tagertSize:{
                            width:attr['tWidth'] || scope.windowWidth,
                            height:attr['tHeight'] || scope.windowHeight
                        }
                    };

                    scope.ativeUploadModelName = attr['ngModel'];
                    scope.ioImgcutActiveFile = getURLbyInput(this.files[0]);
                    myContainer = '<div canva-holper="{{ioImgcutActiveFile}}" ng-model="ngImgCutUploaderOptions" style="position: fixed; z-index: 99998; top: 0;left: 0;width: 100%;height: 100%;" ></div>';
                    myContainer = $compile(myContainer)(scope);
                    scope.ngImgCutUploaderOptions.container.append(myContainer);
                    this.value='';
                });


                function hideElement(){
                    try{
                        myContainer.remove();
                    }catch (e){};

                };



                //todo 接收图片====================================
                scope.$on('saveCurImgExport.$emit'+attr['ngModel'],function(evt,date){
                    ngModel.$setViewValue(date.baseUrl);
                    hideElement();
                    $rootScope.stopBack=false;
                });







            }


        }


    }]);


});