/*新闻搜索功能*/
/**
 * 高亮搜索条件
 */
function highlightKeywords(keywords) {
    $(".recent-content ul li").each(function (index, ele) {
        var link = $(this).find(".news-title a");
        var title = link.text();
        var newTitleText = "<span style='color: #FFA101; font-size: 20px'>" + keywords + "</span>";
        var newTitle = title.replace(keywords, newTitleText);
        link.html(newTitle);
    });
}

/**
 * 请求搜索ajax
 * @param url
 * @param keyword
 */
function searchRequest(url, keyword) {
    $("#sec-tab-content .pic-block, #sec-tab-content .hot-news").remove();
    $("#sec-tab-content .recent-title .blue").html("搜索结果");
    $.get(url, {keyword: keyword}, function (resp) {
        $("#sec-tab-content").html(resp);
        $(".recent-title .blue").html("搜索结果");
    }, 'html');
}

/**
 * 触发搜索
 */
function searchDynamic() {
    $("#dynamic-search .search-submit").click(function () {
        var url = $(this).attr("data-url");
        var keyword = $(this).prev(".search-frame").val();
        searchRequest(url, keyword);
    });

    $("#dynamic-search .search-frame").keydown(function (event) {
        if (event.keyCode === 13) {
            var url = $(this).next(".search-submit").attr("data-url");
            var keyword = $(this).val();
            searchRequest(url, keyword);
        }
    });
}

$(document).ready(function () {
    searchDynamic();
});
