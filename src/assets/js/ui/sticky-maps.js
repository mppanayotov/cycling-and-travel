// Sticky gallery sidebar map
export default function initStickyMaps() {
	$('.js-sticky-map').each(function() {
		const $this = $(this);

		$this.stickySidebar({
			topSpacing: 0,
			bottomSpacing: 0,
			innerWrapperSelector: '.sidebar__inner',
			containerSelector: '.sidebar__map'
		});
	});
}
