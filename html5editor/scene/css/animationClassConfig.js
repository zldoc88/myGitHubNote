!function(){

    window.supportAnimation = [
        {//1
            outClass : 'pt-page-moveToLeft'
            ,inClass : 'pt-page-moveFromRight'
        }
        ,{//2
            outClass : 'pt-page-moveToRight'
            ,inClass : 'pt-page-moveFromLeft'
        }
        ,{//3
            outClass : 'pt-page-moveToTop'
            ,inClass : 'pt-page-moveFromBottom'
        }
        ,{//4
            outClass : 'pt-page-moveToBottom'
            ,inClass : 'pt-page-moveFromTop'
        }
        ,{//5
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-fade'
            ,inClass : 'pt-page-moveFromRight'
        }
        ,{//6
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-fade'
            ,inClass : 'pt-page-moveFromLeft'
        }
        ,{//7
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-fade'
            ,inClass : 'pt-page-moveFromBottom'
        }
        ,{//8
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-fade'
            ,inClass : 'pt-page-moveFromTop'
        }
        ,{//9
            outClass : 'pt-page-moveToLeftFade'
            ,inClass : 'pt-page-moveFromRightFade'
        }
        ,{//10
            outClass : 'pt-page-moveToRightFade'
            ,inClass : 'pt-page-moveFromLeftFade'
        }
        ,{//11
            outClass : 'pt-page-moveToTopFade'
            ,inClass : 'pt-page-moveFromBottomFade'
        }
        ,{//12
            outClass : 'pt-page-moveToBottomFade'
            ,inClass : 'pt-page-moveFromTopFade'
        }
        ,{//13
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-moveToLeftEasing'
            ,inClass : 'pt-page-moveFromRight'
        }
        ,{//14
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-moveToRightEasing'
            ,inClass : 'pt-page-moveFromLeft'
        }
        ,{//15
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-moveToTopEasing'
            ,inClass : 'pt-page-moveFromBottom'
        }
        ,{//16
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-moveToBottomEasing'
            ,inClass : 'pt-page-moveFromTop'
        }
        ,{//17
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-scaleDown'
            ,inClass : 'pt-page-moveFromRight'
        }
        ,{//18
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-scaleDown'
            ,inClass : 'pt-page-moveFromLeft'
        }
        ,{//19
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-scaleDown'
            ,inClass : 'pt-page-moveFromBottom'
        }
         ,{//20
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-scaleDown'
            ,inClass : 'pt-page-moveFromTop'
        }
        ,{//21
            activeClass:'pt-page-nodelay'
            ,outClass : 'pt-page-scaleDown'
            ,inClass : 'pt-page-scaleUpDown'
        }
        ,{//22
            activeClass:'pt-page-nodelay'
            ,outClass : 'pt-page-scaleDownUp'
            ,inClass : 'pt-page-scaleUp'
        }
        ,{//23
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-moveToLeft'
            ,inClass : 'pt-page-scaleUp'
        }
        ,{//24
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-moveToRight'
            ,inClass : 'pt-page-scaleUp'
        }
        ,{//25
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-moveToTop'
            ,inClass : 'pt-page-scaleUp'
        }
        ,{//26
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-moveToBottom'
            ,inClass : 'pt-page-scaleUp'
        }
        ,{//27
            activeClass:'pt-page-delay400'
            ,outClass : 'pt-page-scaleDownCenter'
            ,inClass : 'pt-page-scaleUpCenter'
        }
        ,{//28
            activeClass:'pt-page-delay200'
            ,outClass : 'pt-page-rotateRightSideFirst'
            ,inClass : 'pt-page-moveFromRight'
        }
        ,{//29
            activeClass:'pt-page-delay200'
            ,outClass : 'pt-page-rotateLeftSideFirst'
            ,inClass : 'pt-page-moveFromLeft'
        }

        ,{//30
            activeClass:'pt-page-delay200'
            ,outClass : 'pt-page-rotateTopSideFirst'
            ,inClass : 'pt-page-moveFromTop'
        }
        ,{//31
            activeClass:'pt-page-delay200'
            ,outClass : 'pt-page-rotateBottomSideFirst'
            ,inClass : 'pt-page-moveFromBottom'
        }
        ,{//32
            activeClass:'pt-page-delay500'
            ,outClass : 'pt-page-flipOutRight'
            ,inClass : 'pt-page-flipInLeft'
        }
        ,{//33
            activeClass:'pt-page-delay500'
            ,outClass : 'pt-page-flipOutLeft'
            ,inClass : 'pt-page-flipInRight'
        }
        ,{//34
            activeClass:'pt-page-delay500'
            ,outClass : 'pt-page-flipOutTop'
            ,inClass : 'pt-page-flipInBottom'
        }
         ,{//35
            activeClass:'pt-page-delay500'
            ,outClass : 'pt-page-flipOutBottom'
            ,inClass : 'pt-page-flipInTop'
        }
         ,{//36
            activeClass:'pt-page-current'
            ,outClass : 'pt-page-rotateFall'
            ,inClass : 'pt-page-scaleUp'
        }
        ,{//37
            activeClass:'pt-page-delay500'
            ,outClass : 'pt-page-rotateOutNewspaper'
            ,inClass : 'pt-page-rotateInNewspaper'
        }
        ,{//38
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-rotatePushLeft'
            ,inClass : 'pt-page-moveFromRight'
        }
         ,{//39
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-rotatePushRight'
            ,inClass : 'pt-page-moveFromLeft'
        }
         ,{//40
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-rotatePushTop'
            ,inClass : 'pt-page-moveFromBottom'
        }
        ,{//41
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-rotatePushBottom'
            ,inClass : 'pt-page-moveFromTop'
        }
        ,{//42
            activeClass:'pt-page-delay180'
            ,outClass : 'pt-page-rotatePushLeft'
            ,inClass : 'pt-page-rotatePullRight'
        }
        ,{//43
            activeClass:'pt-page-delay180'
            ,outClass : 'pt-page-rotatePushRight'
            ,inClass : 'pt-page-rotatePullLeft'
        }
        ,{//44
            activeClass:'pt-page-delay180'
            ,outClass : 'pt-page-rotatePushTop'
            ,inClass : 'pt-page-rotatePullBottom'
        }
        ,{//45
            activeClass:'pt-page-delay180'
            ,outClass : 'pt-page-rotatePushBottom'
            ,inClass : 'pt-page-rotatePullTop'
        }
        ,{//46
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-rotateFoldLeft'
            ,inClass : 'pt-page-moveFromRightFade'
        }
        ,{//47
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-rotateFoldRight'
            ,inClass : 'pt-page-moveFromLeftFade'
        }
        ,{//48
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-rotateFoldTop'
            ,inClass : 'pt-page-moveFromBottomFade'
        }
        ,{//49
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-rotateFoldBottom'
            ,inClass : 'pt-page-moveFromTopFade'
        }
        ,{//50
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-moveToRightFade'
            ,inClass : 'pt-page-rotateUnfoldLeft'
        }
        ,{//51
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-moveToLeftFade'
            ,inClass : 'pt-page-rotateUnfoldRight'
        }
        ,{//52
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-moveToBottomFade'
            ,inClass : 'pt-page-rotateUnfoldTop'
        }
        ,{//53
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-moveToTopFade'
            ,inClass : 'pt-page-rotateUnfoldBottom'
        }
        ,{//54
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-rotateRoomLeftOut'
            ,inClass : 'pt-page-rotateRoomLeftIn'
        }
        ,{//55
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-rotateRoomRightOut'
            ,inClass : 'pt-page-rotateRoomRightIn'
        }
        ,{//56
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-rotateRoomTopOut'
            ,inClass : 'pt-page-rotateRoomTopIn'
        }
        ,{//57
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-rotateRoomBottomOut'
            ,inClass : 'pt-page-rotateRoomBottomIn'
        }
        ,{//58
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-rotateCubeLeftOut'
            ,inClass : 'pt-page-rotateCubeLeftIn'
        }
        ,{//59
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-rotateCubeRightOut'
            ,inClass : 'pt-page-rotateCubeRightIn'
        }
        ,{//60
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-rotateCubeTopOut'
            ,inClass : 'pt-page-rotateCubeTopIn'
        }
        ,{//61
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-rotateCubeBottomOut'
            ,inClass : 'pt-page-rotateCubeBottomIn'
        }
        ,{//62
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-rotateCarouselLeftOut'
            ,inClass : 'pt-page-rotateCarouselLeftIn'
        }
        ,{//63
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-rotateCarouselRightOut'
            ,inClass : 'pt-page-rotateCarouselRightIn'
        }
        ,{//64
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-rotateCarouselTopOut'
            ,inClass : 'pt-page-rotateCarouselTopIn'
        }
        ,{//65
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-rotateCarouselBottomOut'
            ,inClass : 'pt-page-rotateCarouselBottomIn'
        }
        ,{//66
            activeClass:'pt-page-delay200'
            ,outClass : 'pt-page-rotateSidesOut'
            ,inClass : 'pt-page-rotateSidesIn'
        }
        ,{//67
            activeClass:'pt-page-ontop'
            ,outClass : 'pt-page-rotateSlideOut'
            ,inClass : 'pt-page-rotateSlideIn'
        }


    ];

    window.getAnimationName=function(index){
        return supportAnimation[index];
    }



}();
