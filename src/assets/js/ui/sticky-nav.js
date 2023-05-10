import { $win } from '../main';

// Sticky tabs-nav
export default function initStickyNav() {
	$('.js-sticky-nav').each(function() {
		const $nav = $(this);

		$nav.stickySidebar({
			topSpacing: 0,
			bottomSpacing: 0,
			innerWrapperSelector: '.sidebar__inner',
			containerSelector: '.js-tabs'
		});

		function izZoomed() {
			if (document.documentElement.clientWidth / window.innerWidth !==1) {
				if (Math.abs(document.documentElement.clientWidth - window.innerWidth) > 20) {
					return true;
				}
			}

			return false;
		}

		function fadeNav() {
			if (izZoomed()) {
				$nav.addClass('fade');
			} else if ($nav.hasClass('fade')) {
				$nav.removeClass('fade');
			}
		}

		$win.on('scroll resize', _.throttle(fadeNav, 100));
	});
}
