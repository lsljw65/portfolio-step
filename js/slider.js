$(document).ready(function(){
    // 슬라이드 js
    // 변수
    var slideHeight=0;
    var swidth=0; // slide너비 변수
    var slideCount=1; // slide 분할 변수
    var slideLength=0; // slide 수
    var $auto=null; // 자동
    var slidePosition=0; // slide를 움직일 슬라이드 위치 변수
    var $slides=$(".slides"); // .slides요소를 담을 변수
    var $slide=$slides.children(".slide"); //.slides>.slide 요소 저장변수
    var roll=0;
    // 페이지네이션 변수
    var $page=$(".pagenation");
    var dotCount=0; // slide의 dot수 계산 변수
    var last=0;
    // mousemove,touchmove 변수
    var x_pos,x;
    var xDif;
    var drag=false;
    var timeCount;
    var $time=0;

//--------------------------------------------------------------------------------------------------------------//    

    // 슬라이드 초기값 생성
    function init(){      
        slideHeight=$(".slide img").height();
        console.log("slideHeight : "+slideHeight)
        // 슬라이드 표시되는 슬라이드 구역 너비
        var slider_wrap=$(".slider-wrap").width();
        //슬라이드너비 변수 저장(슬라이드 구역 너비/한 구역에 표시할 슬라이드의 수)
        swidth=slider_wrap/slideCount;
        // 슬라이드 너비 재 설정
        $slide.css({"width":swidth})
        //슬라이드 전체 개수 저장
        slideLength=$(".slide").length; 
        // 슬라이드 그룹의 전체 너비 재 설정
        $slides.css({
            width:swidth*(slideLength*2),
            
        })
        
        
    }
    init();
    
//---------------------------------------------------------------------------//
    
    function dot(){
        var dotLength=$slide.length;
        console.log("dotLength : "+dotLength);
        for(i=0; i<dotLength; i++){
            $(".pagenation").append('<span class="dot"><img src="./images/desk-slide'+(i+1)+'.jpg" alt="설명"></span>')
        }
        $(".pagenation .dot").eq(0).addClass("active")
    }
    dot();

//---------------------------------------------------------------------------//

    function page(slidePosition){
        // slidePosition=last
        $(".dot").removeClass("active");
        $(".dot").eq(slidePosition).addClass("active");
        console.log("slidePosition : "+slidePosition)
    }

//---------------------------------------------------------------------------//
    // 슬라이드 전체 동작 함수
    function slideEvent(){
        function nextMove(){
            $slides.stop().animate({
    
                left:-swidth*roll
    
            },function(){
    
                for(i=0;i<roll;i++){
                    $(this).append("<div class='slide'>"+$(this).find(".slide:first").html()+"</div>");
                    $(this).find(".slide:first").remove();
                    $(this).find(".slide").css({width:swidth});
                    $(this).css({left:0});
                }
    
            })
            console.log("roll : "+roll)
        };
//---------------------------------------------------------------------------//
        $(".nextbt").click(function(){
            roll=1;
    
            if(slidePosition>=slideLength-1){
                slidePosition=0;
            }else{
                slidePosition++;
            }
            page(slidePosition);
            nextMove();
        })

//---------------------------------------------------------------------------//
        function prevMove(){
            $(".slides").css({left:-swidth*roll});
            for(i=0; i<roll; i++){
                $(".slides").prepend("<div class='slide'>"+$(".slides").find(".slide:last").html()+"</div>");
                $(".slides").find(".slide:last").remove();
                $(".slides").find(".slide").css({width:swidth});
                $(".slides").animate({left:0});
            }     
        }

//---------------------------------------------------------------------------//
        $(".prevbt").click(function(){
            roll=1;
            if(slidePosition<=0){
                slidePosition=slideLength-1;
            }else{
                slidePosition--;
            }
            console.log("prevbt slidePosition : "+slidePosition)
            page(slidePosition)
            prevMove();
        })
//---------------------------------------------------------------------------//
        function pagenation(){
            $(".dot").each(function(index){
                $(this).click(function(){
                    $(".dot").removeClass("active");
                    $(this).addClass("active");
                    // slidePosition=index;
                    
                    if(index==slidePosition){
                        roll=0;
                    }else{
                        roll=index-slidePosition;
                    }
                    if(roll<0){
                        // 왼쪽
                        roll=roll*-1
                        prevMove();
                    }else{
                        // 오른쪽
                        nextMove();
                    }
                    // last=index;
                    slidePosition=index;
                    console.log("index : "+index)
                    // console.log("last : "+last)
                    console.log("dot roll : "+roll)
                });
            })
        }
        pagenation();

//--------------------------------------------------------------------------------------------------------------//

        $slides.on("mousedown touchstart",(event)=>{
            console.log("마우스버튼을 누르고 있어요")
            if(event.type=="touchstart"){
                x_pos=event.touches[0].screenX;
            }else{
                x_pos=event.pageX;
            }
            drag=true;
            timeCount=setInterval(function(){ $time++; console.log($time) },10);
            if(event.type==="mousedown"){
                return false;
            }
            
        })

//--------------------------------------------------------------------------------------------------------------//

        $slides.on("mouseup touchend",(event)=>{
            console.log("마우스 버튼을 떼었어요");
            drag=false;
            if(Math.abs(xDif)>50){
                roll=1;
                
                if(xDif<-100){
                    if(slidePosition<=0){
                        slidePosition=slideLength-1;
                    }else{
                        slidePosition--;
                    }
                    page(slidePosition)
                    prevMove();
                    
                }else{
                    if(slidePosition>=slideLength-1){
                        slidePosition=0;
                    }else{
                        slidePosition++;
                    }
                    page(slidePosition)
                    nextMove();
                    
                }
                
                xDif=0;
            }
            
            clearInterval(timeCount);
            if($time>10){
            $("a").click(function(){
                return false;
            })
            console.log("이벤트 제거")
            }else{
                $("a").click(function(){
                    console.log("이벤트 설정");
                    var $href=$(this).attr("href");
                    window.open($href,"_self");
                })     
            }
            $time=0;
        })

//--------------------------------------------------------------------------------------------------------------//

        $slides.on("mousemove touchmove",(event)=>{
            if(drag){
                
                console.log("마우스를 드레그 하고 있어요");
                if(event.type=="touchmove"){
                    xDif=parseInt((x_pos-event.touches[0].screenX));
                }else{
                    xDif=parseInt((x_pos-event.pageX));
                } 
                
            }
            return false;
        })// mousemove, touchmove 끝

        // auto
        function autoPlay(){
            $auto=setInterval(function(){
                console.log("auto");
                roll=1;
                slidePosition++;
                page(slidePosition);
                nextMove();
                
            },10000);
        }
        autoPlay();
    }// /slideEvent 끝
    slideEvent();

    
//--------------------------------------------------------------------------------------------------------------//
    
    // 창이 조절되었을 때 슬라이더의 크기 변경
    $(window).resize(function(){
        init();
        $(".slide").css({
            width:swidth
        })
        $slides.css({
            "height":slideHeight
        })
    }); // 창 재설정 끝
    
})// jquery 끝
