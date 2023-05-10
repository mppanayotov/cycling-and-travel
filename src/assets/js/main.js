import initFixedFooter from './ui/fixed-footer';
import initScroller from './ui/scroller';
import initSliders from './ui/sliders';
import initStickyMaps from './ui/sticky-maps';
import initDots from './ui/dots';
import initTracks from './ui/tracks';
import initTabs from './ui/tabs';
import initStickyNav from './ui/sticky-nav';
import AOS from 'aos';

export const $win = $(window);
export const $doc = $(document);
export const $wrapper = $('.wrapper');

$doc.ready(function() {
	function initPreloader() {
		const $image = $('.main img:not(.parent-bg)');
		const $preloader = $('.preloader');
		const $preloaderCounter = $preloader.find('.preloader__percent');
		const $preloaderLoaded = $preloader.find('.preloader__loaded');
		const $background = $('.parent-bg');
		const $loader = $preloader.find('.preloader__loader');
		const $totalImages = $image.length + $background.length;
		const $imageWeight = 100 / $totalImages;
		let $imagesLoaded = 0;
		let $progress = 0;

		function loadImages() {
			$image.each(function() {	
				const $image = $(this);

				$image.attr('src', $image.data('src')).on('load',  function() {
					updateProgress();
				});
			});
			
			$background.each(function() {
				const $background = $(this);
				const $parent = $background.parent();
				
				$background.on('load', function() {
					$background.remove();
					$parent.css('background-image', 'url(' + $background.attr('src') + ')');
					updateProgress();
				});

				$background.attr('src', $background.data('src'));
			});
		}

		function updateProgress() {
			$imagesLoaded++;
			$progress = parseInt($imageWeight * $imagesLoaded);
			$loader.css('width', $progress + '%');

			if ($progress < 100) {
				$preloaderCounter.html($progress);
			}
			
			if ($imagesLoaded >= $totalImages) {
				$preloaderCounter.html('100');
				$preloader.addClass('out');
				
				setTimeout(function() {
					resumeInit();
				}, 3500);
			}
		}

		loadImages();
	}

	initPreloader();

	function resumeInit() {
		AOS.init();
		initFixedFooter();
		initScroller();

		if ($wrapper.hasClass('wrapper--chapter-3')) {
			initTracks();
		}

		if ($wrapper.hasClass('wrapper--chapter-4')) {
			initStickyMaps();
			initDots();
			initSliders();
		}
		
		if ($wrapper.hasClass('wrapper--chapter-5')) {
			initTabs();
			initStickyNav();
		}

		$win.on('scroll resize', _.throttle(AOS.refresh, 100));
	}
});

