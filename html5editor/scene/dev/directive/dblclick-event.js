define(['angularAMD'],function(angularAMD){

    angularAMD.directive('dblclickEvent', ['$document','$compile',function($document,$compile) {
        return {
            link:function(scope,element,attr){
                //双击-----
                var id = attr['dblclickEvent'],resultElem = angular.element(element)[0].children[0],editingElem = angular.element(element)[0].children[1];

                scope.isEditing=false;

                angular.element(element)[0].ondblclick=function(){
                    if(scope.isEditing) return;
                    if(scope.selectedItem==null) return;
                    if(scope.selectedItem.id != id) return;
                    scope.isEditing = true;
                    angular.element(editingElem).addClass('onInputText');
                    scope.$emit('cursorOnInputTextChage',true);
                };

                angular.element(editingElem).on('blur',function(){
                    if(!scope.isEditing) return;
                    scope.isEditing = false;
                    angular.element(this).removeClass('onInputText');
                    angular.element(this).find('span').remove();
                    scope.setComponentValue('content',this.value);
                    scope.$emit('cursorOnInputTextChage',false);
                })


            }
        }

    }]);
});