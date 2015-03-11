function Dialog() {
    //点击按钮弹出对话框，用法如下
    /*dialog.show({
     type:'dialog',//type可取值dialog,confirm,loading,dialog表示普通弹出框，confirm表示确认框，有确认和取消按钮，如果type为confirm,不用传footer和agreement参数
     如果为loading其他参数都不用传
     title:'新建计划',
     modal:true,//是否背后加一层遮罩
     footer:true,//是否要有底部的操作按钮
     agreement:true,//是否要有免责声明
     content:''//弹出的对话框中间部分显示的内容，必须提供
     events:function(){}//确定等按钮需要绑定的事件
     });*/
    var dialog_detail = null;
    if (typeof(Dialog.prototype.showCover) != 'function') {
        Dialog.prototype.showCover = function () {
            var cover_div = $('.cover');
            if (cover_div.length == 0) {
                $('<div class="cover"></div>').appendTo($('body'));
            } else {
                cover_div.show();
            }
        };
        Dialog.prototype.hideCover = function () {
            $('.cover').hide();
        };
        Dialog.prototype.show = function (detail) {
            dialog_detail = detail;
            switch (detail.type) {
                case 'confirm':
                    var html = this.getConfirmHtml();
                    break;
                case 'dialog':
                    var html = this.getDialogHtml();
                    break;
                case 'loading':
                    var html = this.getLoadingHtml();
                    break;
                default :
                    break;
            }
            if (detail.modal || detail.type == 'loading') {
                this.showCover();
            }
            $(html).appendTo($('body'));
            this.bindEvent();
        };
        Dialog.prototype.alert = function (title, okEvent) {
            var html = this.getAlertHtml(title);
            this.showCover();
            $(html).appendTo($('body'));
            this.bindEvent(true);
            if (okEvent && typeof okEvent == 'function') {
                $('.alert .sure-btn,.alert .close-btn').bind('click', function () {
                    okEvent();
                });
            }
        };
        Dialog.prototype.hide = function (type) {
            if (type && type == 'alert') {
                $('.alert.popup').remove();
                if ($('.popup:visible').length == 0) {
                    this.hideCover();
                }
            } else {
                $('.loading').remove();
                $('.popup:not(#add-plan-dialog)').remove();
                this.hideCover();
            }
        };
        Dialog.prototype.hideLoading = function () {
            $('.loading').remove();
        };
        Dialog.prototype.getDialogHtml = function () {
            var html = '<div class="popup dialog">';
            html += '<div class="d-banner"><h2>' + dialog_detail.title + '</h2></div>';
            html += '<div class="d-content">' + dialog_detail.content + '</div>';
            if (dialog_detail.footer) {
                html += '<div class="d-footer"><div class="center">';
                if (dialog_detail.agreement) {
                    html += '<p><input type="checkbox" checked="checked" /><span>我已阅读并同意相关服务条款</span><a href="index.php?r=hardcover/about/declare" target="_blank" class="common-bg help">&nbsp;</a></p>';
                }
                html += '<a href="javascript:void(0);" class="sure-btn btn hover">确&nbsp;定</a>';
                html += '<a href="javascript:void(0);" class="cancel-btn btn hover">取&nbsp;消</a></div></div></div>';
            }
            return html;
        };
        Dialog.prototype.getConfirmHtml = function () {
            var html = '<div class="popup confirm">';
            html += '<div class="d-banner"><h2>' + dialog_detail.title + '</h2></div>';
            html += '<div class="d-content">' + dialog_detail.content + '</div>';
            html += '<div class="d-footer"><div class="center">';
            html += '<a href="javascript:void(0);" class="sure-btn btn hover"></span>确&nbsp;定</a>';
            html += '<a href="javascript:void(0);" class="cancel-btn btn hover"></span>取&nbsp;消</a></div></div></div>';
            return html;
        };
        Dialog.prototype.getLoadingHtml = function () {
            var html = '<div class="loading"></div>';
            return html;
        };
        Dialog.prototype.getAlertHtml = function (title) {
            var html = '<div class="popup alert">';
            html += '<div class="d-banner"><a href="javascript:void(0);" class="close-btn">x</a><h2>提示</h2></div>';
            html += '<div class="d-content">' + title + '</div>';
            html += '<div class="d-footer"><div class="center">';
            html += '<a href="javascript:void(0);" class="sure-btn btn hover">确&nbsp;定</a>';
            html += '</div></div></div>';
            return html;
        };
        Dialog.prototype.bindEvent = function (flag) {
            //如果设置了flag参数，给alert框的确定按钮绑定点击事件
            var that = this;
            //$('.popup').draggable({handle: '.d-banner'});
            if (flag) {
                $('.alert .sure-btn').bind('click', function () {
                    that.hide('alert');
                });
                $('.popup.alert .close-btn,.d-footer .cancel-btn').bind('click', function () {
                    that.hide('alert');
                });
            } else {
                $('.popup .close-btn, .d-footer .cancel-btn').bind('click', function () {
                    that.hide();
                });
                if (dialog_detail.type == 'confirm') {
                    $('.confirm .d-footer .cancel-btn').bind('click', function () {
                        $(this).unbind('click');
                        that.hide();
                    });
                }
                if (dialog_detail.events && typeof dialog_detail.events == 'function') {
                    dialog_detail.events();
                }
                if (dialog_detail.type == 'dialog' && dialog_detail.agreement) {
                    $('.d-footer input[type="checkbox"]').bind('click', function () {
                        var sure_btn = $(this).parents('.d-footer').find('.sure-btn');
                        if (this.checked) {
                            sure_btn.removeClass('disabled');
                        } else {
                            sure_btn.addClass('disabled');
                        }
                    });
                }
            }
        };
    }
}

(function ($) {

    var loading = new Dialog();

    $.fn.extend({
        yjAlert: function (callback) {
            var dialog = new Dialog();
            dialog.alert($(this).html(), callback);
            return dialog;
        },
        yjError: function () {

            $("#error-dialog").remove();

            $("body").append("<div id='error-dialog'><div class='error-content'><div class='pic'></div><div class='msg'></div></div></div>");
            $(".error-content .msg").html($(this).html());

            var dialog = new Dialog();
            dialog.show({
                type: 'dialog',
                title: '错误',
                modal: true,
                content: $("#error-dialog").html()
            });
            return dialog;
        },
        yjConfirm: function (title, callback) {
            var dialog = new Dialog();
            dialog.show({
                type: 'confirm',
                title: title,
                content: $(this).html(),
                modal: true,
                events: function () {
                    $(".confirm .sure-btn").click(function () {

                        if (typeof callback == 'function') {
                            callback();
                            dialog.hide();
                        } else if (typeof callback == 'object') {
                            dialog.hide();

                            var funOk = function (resp) {
                                callback.success(resp);
                            };

                            $.ajax({
                                url: callback.url,
                                type: "GET",
                                dataType: "json",
                                data: callback.data,
                                success: funOk
                            });
                        } else {
                            dialog.hide();
                        }

                    });
                }
            });
            return dialog;
        },
        yjDialog: function (data, setting) {
            var content = "";
            if ($(this).attr("type") !== undefined && $(this.attr("type").indexOf("x-jquery-tmpl") > 0)) {

                content = $("<div></div>").append($(this).tmpl(data)).html();
            } else {

                content = $(this).html();
            }

            setting = $.extend({}, {
                type: 'dialog',
                modal: true,
                title: '提示',
                footer: false,
                agreement: false,
                content: content,
                events: function () {
                }
            }, setting, eval('(' + $(this).attr("data-prof") + ')'));
            var dialog = new Dialog();
            dialog.show(setting);
            return dialog;
        }
    });
})($);