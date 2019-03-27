/**
 * 获得base64
 * @param {Object} obj
 * @param {Number} [obj.width] 图片需要压缩的宽度，高度会跟随调整
 * @param {Number} [obj.quality=0.8] 压缩质量，不压缩为1
 * @param {Function} [obj.before(this, blob, file)] 处理前函数,this指向的是input:file
 * @param {Function} obj.success(obj) 处理后函数
 * @example
 *
 */
$.fn.localResizeIMG = function (obj) {
    var file = this[0].files[0];
    var blob= null;
    if(window.createObjectURL != undefined){
        blob = window.createObjectURL(file);
    }else if(window.URL != undefined){
        //MOZ
        blob = window.URL.createObjectURL(file);
    }else if(window.webkitURL != undefined){
        //MOZ
        blob = window.webkitURL.createObjectURL(file);
    }

    // 执行前函数
    //if ($.isFunction(obj.before)) { obj.before(this, blob, file) };

    _create(blob, file);
    this.value = '';   // 清空临时数据

    /**
     * 生成base64
     * @param blob 通过file获得的二进制
     */
    function _create(blob) {
        var img = new Image();
        img.src = blob;
       //
        img.onload = function () {
            var that = this;

            //生成比例
            var w = that.width,
                h = that.height,
                scale = w / h;
            w = obj.width || w;
            h = w / scale;
            var w_w = $(window).width();
            w = w_w;
            h = w * that.height /  that.width;

            //生成canvas
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            $(canvas).attr({width:w,height:h});
            {
                switch (obj.orientation) {
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                        canvas.width = h;
                        canvas.height = w;
                        break;
                    default:
                        canvas.width = w;
                        canvas.height = h;
                        break;
                }

                switch (obj.orientation) {
                    case 2:
                        // horizontal flip
                        ctx.translate(w, 0);
                        ctx.scale(-1, 1);
                        break;
                    case 3:
                        // 180 rotate left
                        ctx.translate(w, h);
                        ctx.rotate(Math.PI);
                        break;
                    case 4:
                        // vertical flip
                        ctx.translate(0, h);
                        ctx.scale(1, -1);
                        break;
                    case 5:
                        // vertical flip + 90 rotate right
                        ctx.rotate(0.5 * Math.PI);
                        ctx.scale(1, -1);
                        break;
                    case 6:
                        // 90 rotate right
                        ctx.rotate(0.5 * Math.PI);
                        ctx.translate(0, -h);
                        break;
                    case 7:
                        // horizontal flip + 90 rotate right
                        ctx.rotate(0.5 * Math.PI);
                        ctx.translate(w, -h);
                        ctx.scale(-1, 1);
                        break;
                    case 8:
                        // 90 rotate left
                        ctx.rotate(-0.5 * Math.PI);
                        ctx.translate(-w, 0);
                        break;
                    default:
                        break;
                }
            }

            ctx.drawImage(img, 0, 0, w, h);
            /**
             * 生成base64
             * 兼容修复移动设备需要引入mobileBUGFix.js
             */
            var base64 = canvas.toDataURL('image/jpeg', obj.quality || 0.8);

            // 修复IOS
            if (navigator.userAgent.match(/iphone/i)) {
                var mpImg = new MegaPixImage(img);
                mpImg.render(canvas, { maxWidth: w, maxHeight: h, quality: obj.quality || 0.8, orientation: obj.orientation });
                base64 = canvas.toDataURL('image/jpeg', obj.quality || 0.8);
            }

            // 修复android
            if (navigator.userAgent.match(/Android/i)) {
                var encoder = new JPEGEncoder();
                base64 = encoder.encode(ctx.getImageData(0, 0, w, h), obj.quality * 100 || 80);
            }

            // 生成结果
            var result = {
                base64: base64,
                clearBase64: base64.substr(base64.indexOf(',') + 1)
            };

            // 执行后函数
            obj.success(result);
        };
    }
};


// 例子
/*
    $('input:file').localResizeIMG({
        width: 100,
        quality: 0.1,
        //before: function (that, blob) {},
        success: function (result) {
            var img = new Image();
            img.src = result.base64;

            $('body').append(img);
            console.log(result);
        }
    });
*/
