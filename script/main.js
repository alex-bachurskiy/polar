$(document).ready(function () {

    let timeList = 700;
    let TimeView = 5000;
    let RadioBut = true;
    
    let slideNum = 1;
    let slideTime;
    slideCount = $("#slider .slide").length;
    
    let animSlide = function(arrow){
        clearTimeout(slideTime); 
        if(arrow == "next"){
            if(slideNum == slideCount) { slideNum=1; }
            else{slideNum++}
            translateWidth = -$('#active-slide').width() * (slideNum - 1);
            $('#slider').css({'transform': 'translate(' + translateWidth + 'px, 0)'});
        } else if(arrow == "prew") {	
            if(slideNum == 1) { slideNum=slideCount; }
            else{slideNum-=1}
            translateWidth = -$('#active-slide').width() * (slideNum - 1); 
            $('#slider').css({'transform': 'translate(' + translateWidth + 'px, 0)'});
        }else{
            slideNum = arrow;
            translateWidth = -$('#active-slide').width() * (slideNum -1);
            $('#slider').css({'transform': 'translate(' + translateWidth + 'px, 0)'});
        }
        $(".ctrl-select.active").removeClass("active");
        $('.ctrl-select').eq(slideNum - 1).addClass('active');
    }
    
    if(RadioBut){
        let $linkArrow = $('<a id="prewbutton" href="#">&lt;</a><a id="nextbutton" href="#">&gt;</a>')
        .prependTo('#active-slide');
        $('#nextbutton').click(function(){
            animSlide("next");
            return false;
            })
        $('#prewbutton').click(function(){
            animSlide("prew");
            return false;
        })
    }
    let adderSpan = '';
    $('.slide').each(function(index) {
        adderSpan += '<span class = "ctrl-select">' + index + '</span>';
    });
    $('<div class ="Radio-But">' + adderSpan +'</div>').appendTo('#slider-wrap');
    $(".ctrl-select:first").addClass("active");
    $('.ctrl-select').click(function(){
        let goToNum = parseFloat($(this).text());
        animSlide(goToNum + 1);
    });
    let pause = false;
    let rotator = function(){
        if(!pause){
            slideTime = setTimeout(function(){animSlide('next')}, TimeView);
        }
    }
    $('#slider-wrap').hover(
        function(){clearTimeout(slideTime); pause = true;},
        function(){pause = false; rotator();
    });
    let clicking = false;
    let prevX;
    $('.slide').mousedown(function(e){
        clicking = true;
        prevX = e.clientX;
    });
    
    $('.slide').mouseup(function() {
        clicking = false;
    });
    
    $(document).mouseup(function(){
        clicking = false;
    });
    
    $('.slide').mousemove(function(e){
        if(clicking == true) {
            if(e.clientX < prevX) {
                animSlide("next"); clearTimeout(slideTime);
            }
            if(e.clientX > prevX) {
                animSlide("prew"); clearTimeout(slideTime);
            }
            clicking = false;
        }
    });
    $('.slide').hover().css('cursor', 'pointer');
    rotator();  
});

$('.mobile div').on('click', () => {
    $('.mobile div').toggleClass('active');
    $('.mobile nav').toggleClass('open');
    $('.mobile nav ul').toggleClass('show');
});
for (let a = 1; a <= $(".mobile ul li").length; a++){
    $(".mobile ul li:nth-child("+ a +")").css("animation-delay", "."+ (a+1) +"s");   
}    