define(['angularAMD'],function(angularAMD){

    angularAMD.directive('setBackground', ['$document','$compile',function($document,$compile) {
        return{
            template:'<label class="ads-row foxfix" >'+
                '<span class="ads-c-4">背景类型:</span>'+
                '<span class="ads-c-6">'+
                '<select class="form-control" select-categ  ng-options="items.val as items.name for items in backgroundOptions" ng-model="compentArray.backgroundType" ><option value="none">-- 选择类型 --</option></select>'+
                '</span>'+
                '</label>'+
                '<label class="ads-row foxfix" ng-if="compentArray.backgroundType==\'color\'" >'+
                '<span class="ads-c-4">纯色:</span>'+
                '<span class="ads-c-6">'+
                '<input class="form-control" colorpicker="rgba" type="text"  ng-model="compentArray.backgroundColor" />'+
                '</span>'+
                '</label>'+
                '<label class="ads-row foxfix" ng-if="compentArray.backgroundType==\'gradient\'" gradientchange ng-model="compentArray.backgroundGradient" >'+
                '<span class="ads-c-4">渐变:</span>'+
                '<span class="ads-c-8">'+
                '<span class="ads-row" style="margin-bottom: 3px;">' +
                    '<span class="ads-c-3">方向:</span>'+
                    '<span class="ads-c-6"><input bings-value="{{compentArray.backgroundGradient.rotate}}"  class="form-control" min="-360" step="1" max="360"  type="number"   /></span>'+
                    '<span class="ads-c-3">度</span>'+
                '</span>' +
                '<span class="ads-row" ng-repeat="(k,items) in compentArray.backgroundGradient.color track by $index" style="margin-bottom: 5px;border-bottom: 1px solid #eee;background-color: {{items.color}}">' +
                    '<div class="ads-row"  style="margin-bottom: 3px;">' +
                         '<span class="ads-c-3">颜色</span>' +
                         '<span class="ads-c-5"><input class="form-control"  colorpicker="rgba" type="text"  ng-model="items.color" /></span>' +
                         '<span class="ads-c-4"><a class="btn btn-danger" href="javascript:;" ng-click="deleVgradientColor(k)" >删除</a></span>' +
                    '</div> '+
                '</span>'+
                '<span class="ads-row" ><a class="btn btn-success" href="javascript:;" ng-click="addVgradientColor()" >添加</a></span>'+
                '</span>'+
                '</label>'+
                '<label class="ads-row foxfix" ng-if="compentArray.backgroundType==\'img\'" >'+
                '<span class="ads-c-4">图片:</span>'+
                '<span class="ads-c-4">'+
                '<a href="javascript:;" ng-click="chooseLibruary(\'backgroundImg\',\'Images\',isGobal);" class="btn btn-default">选择图片</a>'+
                '</span>'+
                '<span class="ads-c-4">-</span>'+
                '</label>',
            require: '?ngModel',
            link:function(scope,element,attrs,ngModel){

                scope.isGobal =typeof attrs['isGobal']=='undefined'? false:true; //判断是否全局的属性设置
                //取父级controller
                scope.$watch(attrs.ngModel, function(newVal,oldVal) {
                    scope.compentArray=newVal;
                });

                scope.$on('backgroundGradientCast',function(evt,data){
                    scope.compentArray=data;
                    if(ngModel){
                        ngModel.$render = function () {
                            element.val(ngModel.$viewValue);
                        };
                        scope.$applyAsync(ngModel.$setViewValue(data));
                    }
                });


            }
        }
    }]);

    angularAMD.directive('selectCateg', ['$document','$compile',function($document,$compile) {
        return{
            require: 'ngModel',
            link:function(scope,element,attrs,ngModel){
                scope.$watch(attrs['ngModel'],function(newVal,oldVal){
                    if(ngModel) scope.$applyAsync(ngModel.$setViewValue(newVal));
                });
            }
        }
    }]);

    //number 设置及赋值
    angularAMD.directive('bingsValue', ['$document','$compile',function($document,$compile) {
        return{

            link:function(scope,element,attrs,ngModel){
                element[0].value= attrs['bingsValue'];
                element.on('change',function(){
                    var nvale = this.value;;
                    scope.compentArray.backgroundGradient.rotate = nvale;
                    scope.$emit('updata.backgroundGradient.rotate.emit',scope.compentArray.backgroundGradient.rotate);
                });

            }
        }
    }]);
    //渐变设置
    angularAMD.directive('gradientchange', ['$document','$compile',function($document,$compile) {
        return{
            require: 'ngModel',
            link:function(scope,element,attrs,ngModel){


            }
        }
    }]);

    angularAMD.directive('setBackgroundOption', ['$document','$compile',function($document,$compile) {
        return{

            link:function(scope,element,attrs){
                attrs.$observe('setting', function(data){
                    data = JSON.parse(data);
                    var val = '',k=0;
                    switch (data.backgroundType){
                        case 'none':
                            k=1;
                            break;
                        case 'color':
                            val=data.backgroundColor;
                            k=2;
                            break;
                        case 'gradient':
                            k=3;
                            val='';
                            var t='gradient(',same='';
                            var rotate = (data.backgroundGradient.rotate);
                            var webkit=rotate +'deg';
                            rotate =parseFloat(rotate);
                            rotate = -rotate+90;
                            var moz=rotate +'deg';
                            webkit='linear-'+t+webkit;
                            moz='linear-'+t+moz;

                            for(var m=0;m<data.backgroundGradient.color.length;m++){
                                same+= ','+data.backgroundGradient.color[m].color;
                            }
                            webkit= '-webkit-'+webkit+same+')';
                            moz= moz+same+')';
                            break;
                        case 'img':
                            k=4;
                            val=(data.backgroundImg=='none')?'':'url("'+data.backgroundImg+'")';
                            break;
                    }
                    element.css({background:'none'});
                    if(k==1) element.css({backgroundColor:val});
                    if(k==2) element.css({backgroundColor:val});
                    if(k==3) element.css({backgroundImage:moz,background:webkit,WebkitbackgroundImage:webkit});
                    if(k==4) element.css({backgroundImage:val,backgroundSize:'100% auto',backgroundRepeat:'no-repeat'});
                });


            }
        }
    }]);


});
