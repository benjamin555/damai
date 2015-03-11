(function($){

	var defaults = {
        width : 0,
        height : 0,
        opacity : 0.5,
		duration : 500,
		interval : 2000,
		container : null
	};

	$.fn.slider = function(options){
		$.extend(defaults,options);
		var me = this,
            brother = me.next(),
			width = me.width(),
            height = me.height(),
            circles = null,
			container = defaults.container ? defaults.container : me.children(':first'),
			children = container.children(),
			len = children.length,
			index = 0,
			id = interval();

        container.width((len+1)*width);

        children.css({
            width : width,
            height : height
        });

        if(brother.length) {
            circles = brother.children();
            circles.hover(function(e){
                clearInterval(id);
                var i = circles.index($(this));
                index = i;
                showPics(i);
            },function(e){
                index++;
                id = interval();
            });
        }

		me.hover(function(e){
			clearInterval(id);
		},function(e){
			id = interval();
		});

		function interval(){
            if(len == 0) return;
			return setInterval(function(){
				if(index == len) {
					showFirstPic();
                    index = 0;
				} else {
                    showPics(index);
                    index++;
                }
			},defaults.interval);
		}

        function changeCircle(index){
            circles.filter('.slider').removeClass('slider').addClass('static');
            $(circles.get(index)).removeClass('static').addClass('slider');
        }

		function showFirstPic(){
            container.append(children.first().clone());
            changeCircle(0);
            container.animate({left : -index*width}, defaults.duration,'linear',function(){
				container.css({
				    left : 0
				});
				container.children(':last').remove();
			});
		}

		function showPics(index){
		    container.animate({ left: -index * width }, defaults.duration,'linear');
            changeCircle(index);
		}

	};

})(jQuery);