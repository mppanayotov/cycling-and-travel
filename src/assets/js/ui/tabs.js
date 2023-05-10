import AOS from 'aos';
import { $win } from '../main';

// Tab remotes
export default function initTabs() {
	const $tabRemote = $('.js-tab-remote');

	$tabRemote.each(function() {
		const $tabRemote = $(this);
		const $target = $($tabRemote.data('target'));

		function closeNearTabs(near) {
			const $tabs = near.closest('.js-tabs');

			$tabs.find('.js-tab-remote')
				.add($tabs.find('.js-tab'))
					.removeClass('active');

			if ($tabs.hasClass('tab-lake-active')) {
				$tabs.removeClass('tab-lake-active');
			}

			if ($tabs.hasClass('tab-land-active')) {
				$tabs.removeClass('tab-land-active');
			}

			if ($tabs.hasClass('tab-falls-active')) {
				$tabs.removeClass('tab-falls-active');
			}

			if ($tabs.hasClass('tab-mountain-active')) {
				$tabs.removeClass('tab-mountain-active');
			}

			if ($tabs.hasClass('tab-route-active')) {
				$tabs.removeClass('tab-route-active');
			}

			if ($tabs.hasClass('tab-camp-active')) {
				$tabs.removeClass('tab-camp-active');
			}
		}

		if (!$tabRemote.hasClass('active')) {
			$target.hide();
		}

		$tabRemote.on('click', function(event) {
			const $tabRemote = $(this);

			event.preventDefault();

			if (!$tabRemote.hasClass('active')) {
				$target.show();
				closeNearTabs($tabRemote);
				$tabRemote
					.add($tabRemote.closest('.js-tabs').find($target))
						.addClass('active');

				if ($target.hasClass('js-tab-lake')) {
					$tabRemote.closest('.js-tabs').addClass('tab-lake-active');
				}

				if ($target.hasClass('js-tab-land')) {
					$tabRemote.closest('.js-tabs').addClass('tab-land-active');
				}

				if ($target.hasClass('js-tab-falls')) {
					$tabRemote.closest('.js-tabs').addClass('tab-falls-active');
				}

				if ($target.hasClass('js-tab-mountain')) {
					$tabRemote.closest('.js-tabs').addClass('tab-mountain-active');
				}

				if ($target.hasClass('js-tab-route')) {
					$tabRemote.closest('.js-tabs').addClass('tab-route-active');
				}

				if ($target.hasClass('js-tab-camp')) {
					$tabRemote.closest('.js-tabs').addClass('tab-camp-active');
				}
			} else {
				if (!$tabRemote.hasClass('js-tab-remote-solid')) {
					closeNearTabs($tabRemote);
				}
			}

			AOS.refresh();
			$('.js-sticky-nav').stickySidebar().stickySidebar('updateSticky');

			if (parseInt($tabRemote.closest('.js-tabs').offset().top) < parseInt($('html, body').scrollTop()) - 200) {
				$('html, body').stop().animate({
					scrollTop: parseInt($tabRemote.closest('.js-tabs').offset().top) + 1
				}, 2000 );
			}
			
			setTimeout(function() {
				AOS.refresh();
				$('.js-sticky-nav').stickySidebar().stickySidebar('updateSticky');
			}, 2500);
		});
	});
}
