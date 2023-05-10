import { $win } from '../main';
import { coords1 } from '../coords/coords-1.js';
import { coords2 } from '../coords/coords-2.js';
import { coords3 } from '../coords/coords-3.js';
import { coords4 } from '../coords/coords-4.js';

// Track filler
export default function initTracks() {
	const $track = $('.js-track');

	$track.each(function() {
		const $track = $(this);
		const $trackPoint = $track.closest('.js-track-container').find('.js-track-point');

		let $coords = [];
		let $coordsOffset = 0;
		let $length =  $track.data('stroke');
		let $firstCoord = 0;
		let $trackStart = 0;

		const $baseRes = 1920;
		let $activationThreshold = 30;
		let $winHeight = $win.innerHeight();
		let $winWidth = $win.innerWidth();
		let $winVh = $winHeight / 100;
		let $ratio = $baseRes / $winWidth;;

		let $docScrolled = 0;
		let $trackHeight = $track.height();
		let $trackOffset = $track.offset().top;
		let $trackInView = 0;
		
		let $progress = 0;
		let $remaining = $track.data('stroke');
		let $trackScrolled = 0;
		let $activeCoord = 0;

		function updateCoords() {
			const $path = $track.find('path')[0];

			$coords =
				$track.hasClass('js-track-1') && coords1 ||
				$track.hasClass('js-track-2') && coords2 ||
				$track.hasClass('js-track-3') && coords3 ||
				$track.hasClass('js-track-4') && coords4;
			$length = parseInt($path.getTotalLength()); 
			$firstCoord = Math.min(...$coords);	
			$trackStart = $coords.indexOf($firstCoord);
		}

		function updateActivationThreshold(percent) {
			$winVh = $winHeight / 100;
			$activationThreshold = parseInt(percent * $winVh);
		};

		function updateRatio() {
			$ratio = $baseRes / $winWidth;
		}

		function isTrackFinished() {
			if ($activeCoord < 0 && $trackScrolled > $firstCoord) {
				return true;
			}

			return false;
		}

		function updateTrackInView() {
			$docScrolled = $('html, body').scrollTop();
			$trackHeight = $track.height();
			$trackOffset = $track.offset().top;
			$trackInView = $docScrolled + $winHeight - $trackOffset;
		}

		function isTrackInView() {
			if (
				$trackInView > 0 &&
				$trackInView < $trackHeight + $winHeight
			) {
				return true;
			}

			return false;
		}

		function updatePoints() {
			$trackPoint.each(function() {
				const $trackPoint = $(this);
				const $trackPointOffset =
					$trackPoint.hasClass('js-track-point-start') && 0 ||
					$trackPoint.hasClass('js-track-point-finish') && 100 ||
					50;
				const $trackGroup = $trackPoint.parent();
				const $pointOffset = ($trackPoint.position().top + $trackPoint.height() / 2  + $trackGroup.position().top + $trackPointOffset)  * $ratio;

				if (
					$progress > 0 &&
					$trackScrolled > $pointOffset
				) {
					$trackGroup.addClass('active');

					if (! $trackGroup.prev().hasClass('active')) {
						$trackGroup.prev().addClass('active');
					}
				} else {
					$trackGroup.removeClass('active');
				}
				
				if ($trackGroup.next().hasClass('active')) {
					$trackGroup.addClass('active');
				}
			});
		}

		function updateProgress() {
			$trackScrolled = parseInt(($trackInView - $activationThreshold) * $ratio);
			$activeCoord = $.inArray($trackScrolled, $coords, $trackStart);
			isTrackFinished() ? $remaining = 0 : $remaining = ($length - $activeCoord);
			$progress = $length - $remaining;
			$track.css('stroke-dashoffset', $remaining);

			// console.log($track[0].className.slice(-7), $length, " : ", $progress < 0 ? 0 : $progress, parseInt($progress / $length * 100) + "%");
		};

		function updateTrack() {
			$winHeight = $win.innerHeight();
			$winWidth = $win.innerWidth();
			updateActivationThreshold(30);
			updateRatio();
			updateTrackInView();

			if (isTrackInView()){
				updateProgress();
				updatePoints();
			}
		}

		updateCoords();
		updateTrack();

		$win.on('scroll resize', _.throttle(updateTrack, 100)); 

		// Coordinates logger; Used to generate path coordinates file.
		function generateCoords() {
			const $map = [];

			for (let i = 0; i < $length + 1; i++) {
				const $pathY = parseInt($path.getPointAtLength(i).y);
				const $coord = $pathY;
				
				$map.push($coord);
			}

			console.log('$map', $map);

			if ($track.hasClass('js-track-1')) {
				for (let i = 0; i < $map.length; i++) {
					$('.js-coords-1').append(document.createTextNode($map[i] + ", "));
				}
			}

			if ($track.hasClass('js-track-2')) {
				for (let i = 0; i < $map.length; i++) {
					$('.js-coords-2').append(document.createTextNode($map[i] + ", "));
				}
			}

			if ($track.hasClass('js-track-3')) {
				for (let i = 0; i < $map.length; i++) {
					$('.js-coords-3').append(document.createTextNode($map[i] + ", "));
				}
			}

			if ($track.hasClass('js-track-4')) {
				for (let i = 0; i < $map.length; i++) {
					$('.js-coords-4').append(document.createTextNode($map[i] + ", "));
				}
			}
		}

		// generateCoords();
	});
}
