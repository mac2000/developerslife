(function($){
	var is_touch_device = 'ontouchstart' in document.documentElement,
		updateIntervalMinutes = 10,
		feedUrl = "http://developerslife.ru/rss.xml",
		query = "select * from rss where url='" + feedUrl + "'",
		queryUrl = "http://query.yahooapis.com/v1/public/yql?q=" + escape(query) + "&format=json&callback=?",
		title = $('#title'),
		image = $(document.body),
		pager = $('#pager'),
		preloader = $('<img/>'),
		items = [],
		currentItemIndex = 0;

	preloader.load(function(){
		image.css('background-image', 'url(' + preloader.attr('src') + ')');
	});

	function show(index) {
		if(typeof items[index] === 'undefined') return;

		title.text(items[index].title);
		preloader.attr('src', items[index].image);
		image.css('background-image', 'url(images/logo.png)');
		pager.text((index + 1) + ' / ' + items.length);
	}

	function update() {
		$.getJSON(queryUrl, function(data){
			items = $.map(data.query.results.item, function(item){
				return {
					title: item.title,
					url: item.link,
					image: item.description.split('src="').pop().split('"').shift()
				};
			});
			currentItemIndex = 0;
			show(currentItemIndex);
		});
	}

	function next(){
		currentItemIndex = currentItemIndex + 1 < items.length ? currentItemIndex + 1 : 0;
		show(currentItemIndex);

		// preload next image
		$('<img/>').get(0).src= items[currentItemIndex + 1 < items.length ? currentItemIndex + 1 : 0].image;
	}

	function prev(){
		currentItemIndex = currentItemIndex - 1 >= 0 ? currentItemIndex - 1 : items.length - 1;
		show(currentItemIndex);
	}

	update();
	setInterval(function(){
		update();
	}, updateIntervalMinutes * 60 * 1000);

	$(document).on('mouseup', function(e){
		next();
	});

	if(is_touch_device) {
		$(document).touchwipe({
			wipeLeft: function() { next(); },
			wipeRight: function() { prev(); },
			min_move_x: 20,
			min_move_y: 20,
			preventDefaultEvents: true
		});
	} else {
		$(document).on('keyup', function(e){
			if(e.keyCode === 39 || e.keyCode === 32 || e.keyCode === 13) {
				next();
			}

			if(e.keyCode === 37) {
				prev();
			}
		});
	}
})(jQuery);