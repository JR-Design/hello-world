(function () {
    'use strict';
    window.addEventListener("DOMContentLoaded", function (event) {
        const carousel = document.getElementById('carousel'),
            carousel__item = document.querySelectorAll('.carousel__item'),
            lightbox = document.querySelector('.lightbox'),
            lightbox__image = document.querySelectorAll('.lightbox__image'),
            title = document.querySelector('.title_carousel'),
			lightbox__icons = document.querySelector('.lightbox__icons');

        let	positionLeft = 0,
            touchstartX,
            touchmoveX = 0,
            distanceCarousel = 0,
            fix;

        // Update dimensions when the screen changes
        function deviceSize() {
            setTimeout(function() {
                carouselMouseup(event, true);
            }, 900);
        }

        window.addEventListener('orientationchange', deviceSize);
        window.addEventListener('resize', deviceSize);

        // Chekout support smartphones
		function checkMobile() {
			if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
				lightbox__icons.classList.add('active');
				return true;
			} else {
				lightbox__icons.classList.remove('active');
				return false;
			}
		}
		checkMobile();

        /*---------------------------------------------------
        Carousel
        ---------------------------------------------------*/
        // Handling event touch on the carousel
        function carouselMousedown(event) {
            carousel.classList.remove("carousel_animation");
            positionLeft = Math.round(carousel.style.transform.replace(/[^-\.0-9]/gim,'')) || 0;
			touchstartX = event.touches && event.changedTouches[0].clientX || event.clientX;
            if (checkMobile()) {
                document.addEventListener('touchmove', carouselMousemove, false);
                document.addEventListener('touchend', carouselMouseup, false);
            } else {
                document.addEventListener('mousemove', carouselMousemove, false);
                document.addEventListener('mouseup', carouselMouseup, false);
            }
            event.preventDefault();
            event.stopPropagation();
        }

        // Handling event drag of carousel
        function carouselMousemove(event) {
            touchmoveX = event.touches && event.changedTouches[0].clientX || event.clientX;
            distanceCarousel = Math.round(touchmoveX) - touchstartX;
            carousel.style.transform = "translateX(" + (positionLeft + distanceCarousel) + 'px)';
        }

        // Handling event drop of carousel
        function carouselMouseup(event, resizeCarousel) {
			document.removeEventListener("touchend", carouselMouseup);
			document.removeEventListener("touchmove", carouselMousemove);
			document.removeEventListener("mouseup", carouselMouseup);
			document.removeEventListener("mousemove", carouselMousemove);

            if (distanceCarousel === 0 && typeof resizeCarousel === "undefined") {
                startLightbox(event);
                return;
            }
            positionLeft = Math.round(carousel.style.transform.replace(/[^-\.0-9]/gim,'')) || 0;
			let positionRight = -(carousel.clientWidth - document.documentElement.clientWidth);
            carousel.classList.add("carousel_animation");
            if (typeof resizeCarousel === "undefined") {
                carousel.classList.remove("carouselPad");
            }

            let itemSize = carousel.clientWidth / 6;
            let itemSide = [
                0,
                itemSize, 
                itemSize*2,
                itemSize*3,
                itemSize*4,
                itemSize*5,
                itemSize*6
            ];

            // Limiter carousel
            if (positionLeft > 0) {
                carousel.style.transform = "translateX(" + 0 + ')';
                distanceCarousel = 0;
                return;
            } else if (positionLeft < positionRight) {
                carousel.style.transform = "translateX(" + positionRight + 'px)';
                distanceCarousel = 0;
                return;
            }
            
            for (let i = 0; i < itemSide.length; i++) {
                if (Math.abs(positionLeft) === itemSide[i]) {
                    distanceCarousel = 0;
                    return;
                }
                
                // Alignment items carousel the size of the screen
                if (Math.abs(positionLeft) < itemSide[i]) {
                    let result = (itemSide[i] - itemSide[i-1]) / 2;
                    if (Math.abs(positionLeft) > (result + itemSide[i-1])) {
                        carousel.style.transform = "translateX(" + -itemSide[i] + 'px)';
                    } else {
                        carousel.style.transform = "translateX(" + -itemSide[i-1] + 'px)';
                    }
					distanceCarousel = 0;
					return;
                }
            }
            distanceCarousel = 0;
        }

        /*---------------------------------------------------
        Lightbox
        ---------------------------------------------------*/
        // Start lightbox
        /*
        function startLightbox(event) {
            lightbox.classList.add("fullscreen_active");
            for (let i = 0; i < carousel__item.length; i++) {
                if (event.target === carousel__item[i]) {
                    lightbox__image[i].classList.add("lightbox__image_active");
                    fix = i;
                    lightbox__image[i].addEventListener('mousemove', cursor, false);
                    return;
                }
            }
        }

        // Change lightbox images on click
        function changePicturelightbox(event, offsetX) {
            for (let i = 0; i < lightbox__image.length; i++) {
                if (event.target === lightbox__image[i]) {
                    offsetX -= lightbox__image[i].offsetLeft;
                    if (offsetX > lightbox__image[i].clientWidth / 2) {
                        if (i === (lightbox__image.length - 1)) {
                            return;
                        } else {
                            lightbox__image[i].classList.remove("lightbox__image_active");
                            lightbox__image[i].nextElementSibling.classList.add("lightbox__image_active");
                            fix = i + 1;
                        }
                    } else {
                        if (i === 0) {
                            return;
                        } else {
                            lightbox__image[i].classList.remove("lightbox__image_active");
                            lightbox__image[i].previousElementSibling.classList.add("lightbox__image_active");
                            fix = i - 1;
                        }
                    }
                    lightbox__image[fix].addEventListener('mousemove', cursor, false);
                    return;
                }
            }
        }
		
		// Change cursor on hovering over a lightbox image
        function cursor(event) {
            for (let i = 0; i < lightbox__image.length; i++) {				
                if (event.clientX - lightbox__image[fix].offsetLeft > lightbox__image[fix].clientWidth / 2) {
                lightbox__image[i].style.cursor = "url(ico/right.png) 100 0, auto";
                } else {
                lightbox__image[i].style.cursor = "url(ico/left.png) 0 0, auto";
                }
            }
        }

        /*---------------------------------------------------
        Handling all event mousedown
        ---------------------------------------------------*/
		document.addEventListener('mousedown', function (event) {
            // If event mousedown is on lightbox image
            if (event.target.classList.contains("lightbox__image")) {
                let offsetX = event.clientX;
                changePicturelightbox(event, offsetX);
                return;
            }
            // If event mousedown is't on lightbox image
            if (event.target.classList.contains("lightbox")) {
                lightbox.classList.remove("fullscreen_active");
                lightbox__image[fix].removeEventListener('mousemove', cursor, false);
                lightbox__image[fix].classList.remove("lightbox__image_active");
                return;
            }
            // If event mousedown is't on item carousel
            if (event.target.classList.contains("carousel__item")) {
                title.style.transform = "translateY(-180px)";
                carouselMousedown(event);
                return;
            }
            return;
        }, false);

        /*---------------------------------------------------
        Handling all event touchstart
        ---------------------------------------------------*/
        document.addEventListener('touchstart', function (event) {
            // If event touch is on lightbox image
            /*
            if (event.target.classList.contains("lightbox__image")) {
                let offsetX = event.changedTouches[0].clientX;
                changePicturelightbox(event, offsetX);
                return;
            }
            */
            // If event touch is't on lightbox image
            if (event.target.classList.contains("lightbox")) {
                lightbox.classList.remove("fullscreen_active");
                lightbox__image[fix].removeEventListener('mousemove', cursor, false);
                lightbox__image[fix].classList.remove("lightbox__image_active");
                return;
            }
            /*
            // If event touch is't on item carousel
            if (event.target.classList.contains("carousel__item")) {
                title.style.transform = "translateY(-208px)";
                carouselMousedown(event);
                return;
            }
            */
            return;
        }, false);
    }, false);
})();
