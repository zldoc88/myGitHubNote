define(['angularAMD'],function(angularAMD){

    angularAMD.directive('drawButton', ['$document','$compile',function($document,$compile) {

        return {
            link : function(scope,element,attr){
                var initstyle = "{color:button.color,lineHeight:button.height+\'px\',textAlign: \'center\',borderRadius:(button.borderRadiusLeftTop?button.borderRadius:0)+\'px \'+(button.borderRadiusRightTop?button.borderRadius:0)+\'px \'+(button.borderRadiusRightBottom?button.borderRadius:0)+\'px \'+(button.borderRadiusLeftBottom?button.borderRadius:0)+\'px\'}";
                var template = '<div class="fouce-region"  move-component setting="{{button}}" set-background-option=""' +
                    'ng-style="'+initstyle+'"'+
                    '  ng-click="chooseComponent(button.type,button.id)" >{{button.innerText}}</div>'+
                                '<div class="reSetSize-LT actrl"  se-tresize setting="{{button}}" ></div>'+
                                '<div class="reSetSize-T actrl"  vt-resize setting="{{button}}" ></div>'+
                                '<div class="reSetSize-RT actrl"  sw-tresize setting="{{button}}"  ></div>'+
                                '<div class="reSetSize-R actrl" hr-bresize setting="{{button}}"  ></div>'+
                                '<div class="reSetSize-RB actrl" se-resize setting="{{button}}" ></div>'+
                                '<div class="reSetSize-B actrl"  vb-resize setting="{{button}}" ></div>'+
                                '<div class="reSetSize-LB actrl"  sw-bresize setting="{{button}}" ></div>'+
                                '<div class="reSetSize-L actrl" hl-bresize setting="{{button}}" ></div>'+
                                '<div class="actrl tool-rotate" comp-rotate setting="{{button}}" ></div>';

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

    angularAMD.directive('editerButton', ['$document','$compile',function($document,$compile) {
        return {
            templateUrl:'scene/partials/button.html',
            link:function(scope,element,attr){

            }
        }
    }]);
});