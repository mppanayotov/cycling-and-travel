const initScroller = () => {
	$('.footer__nav li:not(:first-child)').find('a').click(function(e) {
		e.preventDefault();
		
		let section = $(this).attr('href');
		
		if (section === '#en-1') {
			$('html, body').stop().animate({
				scrollTop: $(section).offset().top + 330
			}, 2000 );
		}

		else if (section === '#lesson-101') {
			$('html, body').stop().animate({
				scrollTop: $(section).offset().top + 150
			}, 2000 );
		}

		else if (section === '#jp-1') {
			$('html, body').stop().animate({
				scrollTop: $('html, body').offset().top
			}, 2000 );
		}

		else {
			if ($('.footer').hasClass('footer--chapter-3')) {
				$('html, body').stop().animate({
					scrollTop: $(section).offset().top
				}, 2000 );
			}

			if ($('.footer').hasClass('footer--chapter-4')) {
				$('html, body').stop().animate({
					scrollTop: $(section).offset().top + 2
				}, 2000 );
			}

			else {
				$('html, body').stop().animate({
					scrollTop: $(section).offset().top - 200
				}, 2000 );
			}
		}
	});
}

export default initScroller;
