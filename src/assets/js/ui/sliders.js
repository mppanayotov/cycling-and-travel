// Slider functions
export default function initSliders() {
	const $slider = $('.slider');

	$slider.each(function(index, el) {
		const $slider = $(this);
		const $sliderSlides = $slider.find('.slider__slides');
		const $sliderPrev = $slider.find('.slider-prev');
		const $sliderNext = $slider.find('.slider-next');

		$sliderSlides.owlCarousel({
			items: 1,
			loop: false,
			dots: true,
			nav: true,
			margin: 0,
			onInitialized: function(event) {
				const $owlPrev = $slider.find('.owl-prev');
				const $owlNext = $slider.find('.owl-next');

				if ($owlPrev.hasClass('disabled')) {
					$sliderPrev.addClass('disabled');
				}

				if ($owlNext.hasClass('disabled')) {
					$sliderNext.addClass('disabled');
				}
			},
			onTranslate: function(event) {
				const $owlPrev = $slider.find('.owl-prev');
				const $owlNext = $slider.find('.owl-next');

				if ($owlPrev.hasClass('disabled')) {
					$sliderPrev.addClass('disabled');
				} else {
					$sliderPrev.show().removeClass('disabled');
				}

				if ($owlNext.hasClass('disabled')) {
					$sliderNext.addClass('disabled');
				} else {
					$sliderNext.show().removeClass('disabled');
				}
			},
		});

		$sliderPrev.on('click', function(event){
			const $sliderPrev = $(this);

			event.preventDefault();
			$sliderPrev.parent().parent().find('.slider__slides').trigger('prev.owl.carousel');
		});

		$sliderNext.on('click', function(event){
			const $sliderNext = $(this);

			event.preventDefault();
			$sliderNext.parent().parent().find('.slider__slides').trigger('next.owl.carousel');
		});
	});
}
