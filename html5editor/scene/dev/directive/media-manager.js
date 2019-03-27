define(['angularAMD','cropper'],function(angularAMD,cropper){
    angularAMD.directive('mediaManager', ['$document','$compile',function($document,$compile) {
        return{
            link:function(scope,element,attrs){



            }
        }
    }]);

    angularAMD.directive('imagesManager', ['$document','$compile',function($document,$compile) {
        return{
            templateUrl:'scene/component/images.lib.html',
            link:function(scope,element,attrs){


            }
        }
    }]);

    angularAMD.directive('imageCoper', ['$document','$compile',function($document,$compile) {
        return{
            templateUrl:'scene/component/croper.image.html',
            link:function(scope,element,attrs){
                scope.DefaultUrl='';
                scope.isShowCoper=false;
                var cropper=null;
                var isCancel=false;
                var image=null;
                //开始裁剪图片---------------------------
                var options ={
                    aspectRatio: 16 / 9,
                    preview: '.preview-result',
                    crop: function(e) {
                        /*console.log(e.detail.x);
                        console.log(e.detail.y);
                        console.log(e.detail.width);
                        console.log(e.detail.height);
                        console.log(e.detail.rotate);
                        console.log(e.detail.scaleX);
                        console.log(e.detail.scaleY);*/
                    }
                };
                scope.showCoperImgMain=function(url){
                    scope.DefaultUrl = url;
                    scope.isShowCoper=true;
                    image=new Image();
                    image.onload=function(){
                        image = document.querySelector('#coper-img-tagert');
                        cropper = new Cropper(image, options);

                    };
                    image.src =url;

                   // scope.$emit('changeCoperStatue.emit',true);//上报显示
                };

                scope.resetCroper=function(aspectRatio){
                    options.aspectRatio = aspectRatio;
                    // Restart
                    cropper.destroy();
                    cropper = new Cropper(image, options);
                };

                scope.croperRotate=function(deg){
                    cropper['rotate'](deg);
                };
                //Flip Horizontal /Flip Vertical
                scope.scaleX=1;
                scope.scaleY=1;
                scope.croperScale=function(type){
                    scope[type] = -scope[type];
                    cropper[type](scope[type]);
                };

                //取消裁剪
                scope.cancelCope=function(){
                   // cropper.clear();
                    cropper.destroy();
                    cropper = null;
                    scope.isShowCoper=false;
                    image = null;
                    scope.$emit('cancelCroperOnece.emit',true);
                };
                //使用裁剪并上传=====================
                function dataURLtoBlob(dataurl) {
                    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
                    while(n--){
                        u8arr[n] = bstr.charCodeAt(n);
                    }
                    return new Blob([u8arr], {type:mime});
                };

                scope.useCoperdata=function(){
                    var blob = cropper.getCroppedCanvas().toDataURL('image/png');
                    blob = dataURLtoBlob(blob);
                    var formData = new FormData();
                    formData.append('upfile', blob,"image.png");
                    scope.$emit('uploadFileChange.emit',{data:formData,closeModel:true});

                };




            }
        }
    }]);




    angularAMD.directive('audioManager', ['$document','$compile',function($document,$compile) {
        return{
            templateUrl:'scene/component/audio.lib.html',
            link:function(scope,element,attrs){




            }
        }
    }]);

    angularAMD.directive('videoManager', ['$document','$compile',function($document,$compile) {
        return{
            templateUrl:'scene/component/vedio.lib.html',
            link:function(scope,element,attrs){




            }
        }
    }]);

    //loading ============================================================================
    angularAMD.directive('uploadLoad', ['$document','$compile',function($document,$compile) {
        return{
            link:function(scope,element,attrs){

                scope.isShowLoad=false;
                scope.$on('showLoading.broadcast',function(evt,data){
                    scope.isShowLoad = data;
                })

            }
        }
    }]);
    // 上传文件=====================================================================
    angularAMD.directive('uploadFiles', ['$document','$compile',function($document,$compile) {
        return{
            link:function(scope,element,attrs){

                angular.element(element).on('change',function(){
                    var file = this.files[0];
                    var formData = new FormData();
                    formData.append('upfile',file);
                    scope.$emit('uploadFileChange.emit',{data:formData,closeModel:false});
                });


            }
        }
    }]);
});