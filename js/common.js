$(document).ready(function(){
    /* *************************************************************************** */
      var winHeight=0; //브라우저의 높이 변수
      var windowWidth;
      
    //  슬라이더 변수

    // 터치 변수 

    // 브라우저의 높이값 얻기 위한 함수
    function $wh(){
        // 브라우저의 높이값 가져오기
        winHeight=$(window).height();
        // 브라우저의 높이값 가져오기
        windowWidth=$(window).width();
        // 스크롤바의 추가 값 계산
        $(".section").css({
            height:winHeight
        });
        console.log("창의 높이 : "+winHeight)
        
        $(".section").eq(0).css({
            height:winHeight
        })
    }
    // 높이 너비 함수 실행
    $wh();
    
    /* *************************************************************************** */
    
      // 브라우저의 높이가 변경되면 처리할 재 설정
      $(window).resize(function(){
        $wh()
        wheel();
        // ////////////////////////////////////////////////////////////////////////
        /* $("html,body").stop().animate({
          scrollTop:winHeight*activeIndex
         }); */
        // ///////////////////////////////////////////////////////////////////////// 
        
      })
    
    /* *************************************************************************** */
    // 헤더 네비, 사이드 네비 구성 처리 및 
    var $navBool=true;
    $(".navBt").click(function(){
        if($navBool){
        $(this).addClass("bt-background")
        $(".nav-list").addClass("nav-position")
        $navBool=false;
        }else{
        $(".nav-list").removeClass("nav-position")
        $(this).removeClass("bt-background")
        $navBool=true;
        }
    })

    // 스크롤 애니메이션
    $(window).scroll(function(){
        $scrollTop=$(window).scrollTop();
        if($scrollTop<70){
            $("header").removeClass("topHeader")
        }else{
            $("header").addClass("topHeader")
        }
    })
    // 해시 애니메이션
    $(".nav-list a").click(function(){
        $hash=$(this.hash).offset().top
        $("html,body").stop().animate({
            scrollTop:$hash
        })
        $(".nav-list a").removeClass("clickActive")
        $(this).addClass("clickActive")
        $(".nav-list").removeClass("nav-position")
        $navBool=true;
    })
    
    /* *************************************************************************** */
    // 활성/비활성
    
    // //////////////////////////////////////////////////////////////////
    // 스킬

    // 애니메이션
    
    // //////////////////////////////////////////////////////////////////////
    //휠 함수
      function wheel(){
        // 슬라이드 부분 삽입

        //-------------휠을 올렸을 때의 동작 -----------------------------------------------
        $(".section").each(function(index){
            
            $(this).on("DOMMouseScroll mousewheel", function(e){
                
                if(e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0 ){
                    
                    if($(this).prev() != undefined){
                        var moveTop=$(this).prev().offset().top;
                        console.log("섹션의 위치 : "+moveTop)
                        
                        // 휠을 올렸을 때 애니메이션 할 위치
                        // ///////////////////////////////////////////////////////////////////
                        if(moveTop<70 ){
                            console.log("70보다 작습니다.")
                            $("header").removeClass("topHeader")                            
                        }
                        $(".nav-list a").eq(index).removeClass("clickActive")
                        $(".nav-list a").eq(index-1).addClass("clickActive")
                        // /////////////////////////////////////////////////////////////////
                    }
                    
                }else{
                    console.log("내렸어요");
                    if($(this).next() != undefined){
                        var moveTop=$(this).next().offset().top;
                        
                        console.log("섹션의 위치 : "+moveTop)
                        // 휠을 내렸을 때 애니메이션 할 위치
                        // ///////////////////////////////////////////////////////
                        if(moveTop>100){
                            $("header").addClass("topHeader")
                        }
                        $(".nav-list a").eq(index).removeClass("clickActive")
                        $(".nav-list a").eq(index+1).addClass("clickActive")
                        // //////////////////////////////////////////////////////
                        
                    }
                }
                // //////////////////////////////////////////////////////////////
                
                $("html,body").stop().animate({
                    scrollTop:moveTop
                },800);
                // ///////////////////////////////////////////////////////////////
                
               return false; 
            })
            
        })


    //   마우스 무브, 터치 무브
/* ----------------------------터치무브 ------------------------------------------------------- */
      

    }// wheel함수 끝
    wheel();
    /* *************************************************************************** */
})//jqeuery 끝
    
    
    