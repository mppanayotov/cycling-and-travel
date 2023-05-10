import { $win } from '../main';

const initFixedFooter = () => {
	if ($('.footer').length) {			
		function updateFooter() {
			let footerIsFixed = $win.scrollTop() + $win.height() >= $win.height()*3; 
			
			if ( footerIsFixed ) { 
				$('.wrapper').addClass('footerFixed')
				 
			} else { 
				$('.wrapper').removeClass('footerFixed')
			}
		}

		updateFooter();
		$win.on('scroll resize', _.throttle(updateFooter, 100));
	}		
}

export default initFixedFooter;
