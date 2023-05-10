import { $win, $wrapper } from '../main';

// Dot activator 
export default function initDots() {
	const $labelGroup = $('.label-group');

	$labelGroup.each(function() {
		const $labelGroup = $(this);
		const $target = $wrapper.find(`[data-group="${$labelGroup.attr('data-group')}"]:not(.label-switch)`);

		function updateDots() {
			if ($labelGroup.hasClass('label-switch') && $labelGroup.hasClass('aos-animate')) {
				$target.each(function() {
					const $target = $(this);
					
					$target.find('.circle').removeClass('circle--red');
					$target.addClass('color-yellow').removeClass('color-white');
					$target.removeClass('dot--red');
					$target.addClass('active');
				});
			} else if ($labelGroup.hasClass('label-switch') && !$labelGroup.hasClass('aos-animate')) {
				$target.each(function() {
					const $target = $(this);

					$target.find('.circle').addClass('circle--red');
					$target.removeClass('color-yellow').addClass('color-white');
					$target.addClass('dot--red');
					$target.removeClass('active');
				});
			}
		}

		updateDots();
		$win.on('scroll resize', _.throttle(updateDots, 100));
	});
}
