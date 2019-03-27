define(['angularAMD'],function(angularAMD){
    angularAMD.directive('drawSquare', ['$document','$compile',function($document,$compile) {

        return {
            link : function(scope,element,attr){
                var initstyle = "{borderRadius:(square.borderRadiusLeftTop?square.borderRadius:0)+\'px \'+(square.borderRadiusRightTop?square.borderRadius:0)+\'px \'+(square.borderRadiusRightBottom?square.borderRadius:0)+\'px \'+(square.borderRadiusLeftBottom?square.borderRadius:0)+\'px\'}";
                var template = '<div class="fouce-region"  move-component setting="{{square}}" set-background-option=""' +
                    'ng-style="'+initstyle+'"'+
                    '  ng-click="chooseComponent(square.type,square.id)" ></div>'+
                                '<div class="reSetSize-LT actrl"  se-tresize setting="{{square}}" ></div>'+
                                '<div class="reSetSize-T actrl"  vt-resize setting="{{square}}" ></div>'+
                                '<div class="reSetSize-RT actrl"  sw-tresize setting="{{square}}"  ></div>'+
                                '<div class="reSetSize-R actrl" hr-bresize setting="{{square}}"  ></div>'+
                                '<div class="reSetSize-RB actrl" se-resize setting="{{square}}" ></div>'+
                                '<div class="reSetSize-B actrl"  vb-resize setting="{{square}}" ></div>'+
                                '<div class="reSetSize-LB actrl"  sw-bresize setting="{{square}}" ></div>'+
                                '<div class="reSetSize-L actrl" hl-bresize setting="{{square}}" ></div>'+
                                '<div class="actrl tool-rotate" comp-rotate setting="{{square}}" ></div>';

                scope.setting =JSON.parse(attr['setting']);
                //todo 选择工具
                scope.isChooseMe=function(id){
                    if(scope.selectedItem==null) return '';
                    return id==scope.selectedItem.id ? 'active' : '';
                };

                scope.copyTool=function(){
                    if( scope.ActiveToolType!=='pick') return;
                    scope.setting =JSON.parse(attr['setting']);
                    var newTool = scope.getCSS['copyTool'](scope.setting);
                    scope.$emit('addNewOne',newTool);
                };


                var $template = angular.element(scope.PublicToolTMP+template);
                $compile($template)(scope);
                element.append($template);



            }
        }


    }]);

    angularAMD.directive('editerSquare', ['$document','$compile',function($document,$compile) {
        return {
            templateUrl:'scene/partials/square.html',
            link:function(scope,element,attr){

            }
        }
    }]);
});