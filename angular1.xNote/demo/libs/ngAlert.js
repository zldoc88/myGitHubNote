!function(angular,window){

    var ngSelect = angular.module('ng-alert', []);

    ngSelect.config(function ($provide ) {
        $provide.factory('_ngAlert',['$compile' , '$document' , '$rootScope', function ($compile , $document, $rootScope) {
            return {

                init : function(){
                    this._AlertUi = angular.element('<div id="_AlertUi" class="ui-dialog-main" tabindex="-1" style="display: none;">'+this.msgContent+'</div>');
                    this._AlertUi.html('<div class="dialog-box">'+
                        '<div class="dialog-show">'+
                        '<div class="dialog-content">'+this.msgContent+'</div>'+
                        '<div class="dialog-controler" >' +
                        (this.sureCallBack? '<a href="javascript:;"  id="_Alert_sure" class="dialog-btn-cannel dialog-btn-true">确 认</a>' :'')+
                        (this.cancelCallBack? '<a href="javascript:;" id="_Alert_cancel" class="dialog-btn-cannel dialog-btn-can">取消</a>' :'')+
                        '</div>'+
                        '</div>'+
                        '</div>');
                    //$compile(this._AlertUi)(scope);
                    var body = $document.find('body').eq(0);
                    body.append(this._AlertUi);

                }
                ,show:function(options){
                    this.msgContent= options.msgContent;
                    this.sureCallBack= options.sureCallBack;
                    this.cancelCallBack= options.cancelCallBack;
                    $rootScope.stopBack=true;
                    this.init();
                    this._AlertUi.css({display:'table'});
                    this._AlertUi.addClass('on-showing');
                    this.bingEvent();
                }
                ,bingEvent:function(){
                    var _Alert_btns = angular.element(this._AlertUi[0].querySelector('#_Alert_sure'));
                    var _Alert_cancel = angular.element(this._AlertUi[0].querySelector('#_Alert_cancel')),_this= this;

                    _Alert_btns.on('click',function(){
                        try{
                            _this.sureCallBack();
                        }catch (e){};
                        _this.removeDom();
                    });
                    _Alert_cancel.on('click',function(){
                        try{
                            _this.cancelCallBack();
                        }catch (e){};
                        _this.removeDom();
                    });


                }
                ,removeDom:function(){
                    $rootScope.stopBack=false;
                    this._AlertUi.detach();
                }


            }
        }]);
    });

    ngSelect.directive('alert',['$document','$compile','$rootScope','_ngAlert',function($document ,$compile ,$rootScope ,_ngAlert ){

        return {
            require: 'ngModel',
            link:function(scope,element,attr ,ngModelCtrl){

                element.on('click',function(){
                    _ngAlert.show({
                        msgContent : attr.alert
                       , cancelCallBack : scope[attr['ngModel']].cancel
                        ,sureCallBack : scope[attr['ngModel']].ok
                    });
                });



            }
        }

    }]);





}(angular,window);

