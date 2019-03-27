define(['angularAMD'],function(angularAMD){
    angularAMD.directive('drawImage', ['$document','$compile',function($document,$compile) {

        return {
            link : function(scope,element,attr){

                var template = '<div class="fouce-region"  move-component setting="{{image}}" ' +
                    'style="height: {{setPxToRem(image.height)}};width: {{setPxToRem(image.width)}};"'+
                    '  ng-click="chooseComponent(image.type,image.id)" ><img ' +
                    'style="height: {{setPxToRem(image.height)}};width: {{setPxToRem(image.width)}};border-color: {{image.borderColor}};border-style: {{image.borderStyle}};border-width: {{setPxToRem(image.borderWidth)}};"'+
                    ' ng-src="{{image.src}}" ondragstart="return false;" /></div>'+
                                '<div class="reSetSize-LT actrl"  se-tresize setting="{{image}}" ></div>'+
                                '<div class="reSetSize-T actrl"  vt-resize setting="{{image}}" ></div>'+
                                '<div class="reSetSize-RT actrl"  sw-tresize setting="{{image}}"  ></div>'+
                                '<div class="reSetSize-R actrl" hr-bresize setting="{{image}}"  ></div>'+
                                '<div class="reSetSize-RB actrl" se-resize setting="{{image}}" ></div>'+
                                '<div class="reSetSize-B actrl"  vb-resize setting="{{image}}" ></div>'+
                                '<div class="reSetSize-LB actrl"  sw-bresize setting="{{image}}" ></div>'+
                                '<div class="reSetSize-L actrl" hl-bresize setting="{{image}}" ></div>'+
                                '<div class="actrl tool-rotate" comp-rotate setting="{{image}}" ></div>';

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

    angularAMD.directive('editerImage', ['$document','$compile',function($document,$compile) {
        return {
            templateUrl:'scene/partials/image.html',
            link:function(scope,element,attr){

            }
        }
    }]);
});