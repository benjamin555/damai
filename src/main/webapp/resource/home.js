//根据浏览器尺寸居中显示图片
function fixedSliderImg() {
    var bodyWidth = $("body").width();
    if (bodyWidth >= 1100) {
        var imgLeft = (1920 - bodyWidth) / 2;
        $("#slider li img").each(function (index, el) {
            $(this).css('left', -imgLeft);
        });
    }
}

/*首页切换模块*/
/**
 * 首页新闻的切换tab
 * @param selectDiv
 * @param pt
 */
function tabBox(selectDiv, pt) {
    //pt=1为鼠标移上效果，pt=2为鼠标点击效果
    var tabTit = $(selectDiv + " .tabTit li");
    var tabCont = $(selectDiv + " .tabCont .fore");
    tabTit.eq(0).addClass("tabHover");
    tabCont.eq(0).addClass("foreShow");

    switch (pt) {
        case 1:
            tabTit.live("mouseover", function () {
                var tabIndex = $(this).index();
                $(this).addClass("tabHover").siblings().removeClass("tabHover");
                tabCont.eq(tabIndex).addClass("foreShow").siblings().removeClass("foreShow");
            });
            break;
        case 2:
            tabTit.live("click", function () {
                var tabIndex = $(this).index();
                $(this).addClass("tabHover").siblings().removeClass("tabHover");
                tabCont.eq(tabIndex).addClass("foreShow").siblings().removeClass("foreShow");
            });
            break;
    }
}
//鼠标移上新闻效果
function mouseHover(obj) {
    $(obj).addClass("news-hover");
    var tit = $(obj).find('ul li p.articleTit a').text();
    var url = $(obj).find('ul li p.articleTit a').attr('href');
    var img = $(obj).attr('data-pic');
    $(obj).siblings('.newsimg-box').find('a').attr('href', url);
    $(obj).siblings('.newsimg-box').find('a img').attr('src',img);
    $(obj).siblings('.newsimg-box').find('.img-tit a').text(tit);
}
function mouseOut(obj) {
    $(obj).removeClass("news-hover");
}

var slideshow = null;
$(document).ready(function () {
    slideshow = new TINY.slider.slide('slideshow', {
        id: 'slider',
        auto: 10,
        resume: true,
        vertical: false,
        position: 0, // initial position index
        rewind: true, // toggle "rewinding", else the slides will be continuous
        elastic: true, // toggle the bouncing effect of the slides
        left: 'slideleft', // ID of left nav, to cancel cursor selection
        right: 'slideright' // ID of left nav, to cancel cursor selection
    });

    fixedSliderImg();
    $(window).resize(function () {
        fixedSliderImg();
    });

    $('#dynamic').slider({
        duration: 1000,
        interval: 4000
    });

    tabBox(".tab", 1); //首页公司动态
});
