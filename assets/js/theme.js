(function ($) {
    "use strict";


    if ($('.accrodion-grp').length) {
        var accrodionGrp = $('.accrodion-grp');
        accrodionGrp.each(function () {
            var accrodionName = $(this).data('grp-name');
            var Self = $(this);
            var accordion = Self.find('.accrodion');
            Self.addClass(accrodionName);
            Self.find('.accrodion .accrodion-content').hide();
            Self.find('.accrodion.active').find('.accrodion-content').show();
            accordion.each(function () {
                $(this).find('.accrodion-title').on('click', function () {
                    if ($(this).parent().hasClass('active') === false) {
                        $('.accrodion-grp.' + accrodionName).find('.accrodion').removeClass('active');
                        $('.accrodion-grp.' + accrodionName).find('.accrodion').find('.accrodion-content').slideUp();
                        $(this).parent().addClass('active');
                        $(this).parent().find('.accrodion-content').slideDown();
                    };


                });
            });
        });

    };

    if ($('.range-slider-price').length) {

        var priceRange = document.getElementById('range-slider-price');

        noUiSlider.create(priceRange, {
            start: [30, 150],
            limit: 200,
            behaviour: 'drag',
            connect: true,
            range: {
                'min': 10,
                'max': 200
            }
        });

        var limitFieldMin = document.getElementById('min-value-rangeslider');
        var limitFieldMax = document.getElementById('max-value-rangeslider');

        priceRange.noUiSlider.on('update', function(values, handle) {
            (handle ? $(limitFieldMax) : $(limitFieldMin)).text(values[handle]);
        });
    };

    if($('.tour-sidebar__sorter-toggler').length) {
        $('.tour-sidebar__sorter-toggler').on('click', function () {
            $(this).toggleClass('toggled');
            $(this).parent().parent().find('.tour-sidebar__sorter-content').slideToggle();
        });
    }
    
    if ($('.contact-form-validated').length) {
        $('.contact-form-validated').validate({ // initialize the plugin
            rules: {
                name: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true
                },
                subject: {
                    required: true
                }
            },
            submitHandler: function (form) {
                // sending value with ajax request
                $.post($(form).attr('action'), $(form).serialize(), function (response) {
                    $(form).parent().find('.result').append(response);
                    $(form).find('input[type="text"]').val('');
                    $(form).find('input[type="email"]').val('');
                    $(form).find('textarea').val('');
                    console.log(response);
                });
                return false;
            }
        });
    }

    if ($('.mc-form').length) {

        $('.mc-form').each(function () {
            var Self = $(this);
            var mcURL = Self.data('url');
            var mcResp = Self.parent().find('.mc-form__response');

            Self.ajaxChimp({
                url: mcURL,
                callback: function (resp) {
                    // appending response
                    mcResp.append(function () {
                        return '<p class="mc-message">' + resp.msg + '</p>';
                    })
                    // making things based on response
                    if (resp.result === 'success') {
                        // Do stuff
                        Self.removeClass('errored').addClass('successed');
                        mcResp.removeClass('errored').addClass('successed');
                        Self.find('input').val('');

                        mcResp.find('p').fadeOut(10000);

                    }
                    if (resp.result === 'error') {
                        Self.removeClass('successed').addClass('errored');
                        mcResp.removeClass('successed').addClass('errored');
                        Self.find('input').val('');

                        mcResp.find('p').fadeOut(10000);

                    }
                }
            });

        });
    }

    //Submenu Dropdown Toggle

    if ($('.main-nav__main-navigation li.dropdown ul').length) {
        $('.main-nav__main-navigation li.dropdown').children('a').append('<button class="dropdown-btn"><i class="fa fa-angle-right"></i></button>');
    }

    // mobile menu

    if ($('.main-nav__main-navigation').length) {
        let mobileNavContainer = $('.mobile-nav__container');
        let mainNavContent = $('.main-nav__main-navigation').html();

        mobileNavContainer.append(mainNavContent);

        //Dropdown Button
        mobileNavContainer.find('li.dropdown .dropdown-btn').on('click', function (e) {
            $(this).toggleClass('open');
            $(this).parent().parent().children('ul').slideToggle(500);
            e.preventDefault();
        });

    }

    if ($('.stricky').length) {
        $('.stricky').addClass('original').clone(true).insertAfter('.stricky').addClass('stricked-menu').removeClass('original');
    }


    if ($('.side-menu__toggler').length) {
        $('.side-menu__toggler').on('click', function (e) {
            $('.side-menu__block').toggleClass('active');
            e.preventDefault();
        });
    }

    if ($('.side-menu__block-overlay').length) {
        $('.side-menu__block-overlay').on('click', function (e) {
            $('.side-menu__block').removeClass('active');
            e.preventDefault();
        });
    }


    if ($('.scroll-to-target').length) {
        $(".scroll-to-target").on('click', function () {
            var target = $(this).attr('data-target');
            // animate
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 1000);

            return false;

        });
    }
    if ($('.wow').length) {
        var wow = new WOW({
            boxClass: 'wow', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 250, // distance to the element when triggering the animation (default is 0)
            mobile: true, // trigger animations on mobile devices (default is true)
            live: true // act on asynchronously loaded content (default is true)
        });
        wow.init();
    }

    function SmoothMenuScroll() {
        var anchor = $('.scrollToLink');
        if (anchor.length) {
            anchor.children('a').bind('click', function (event) {
                if ($(window).scrollTop() > 10) {
                    var headerH = '67';
                } else {
                    var headerH = '100';
                }
                var target = $(this);
                $('html, body').stop().animate({
                    scrollTop: $(target.attr('href')).offset().top - headerH + 'px'
                }, 1200, 'easeInOutExpo');
                anchor.removeClass('current');
                target.parent().addClass('current');
                event.preventDefault();
            });
        }
    }
    SmoothMenuScroll();

    function OnePageMenuScroll() {
        var windscroll = $(window).scrollTop();
        if (windscroll >= 100) {
            var menuAnchor = $('.one-page-scroll-menu .scrollToLink').children('a');
            menuAnchor.each(function () {
                // grabing section id dynamically
                var sections = $(this).attr('href');
                $(sections).each(function () {
                    // checking is scroll bar are in section
                    if ($(this).offset().top <= windscroll + 100) {
                        // grabing the dynamic id of section
                        var Sectionid = $(sections).attr('id');
                        // removing current class from others
                        $('.one-page-scroll-menu').find('li').removeClass('current');
                        // adding current class to related navigation
                        $('.one-page-scroll-menu').find('a[href*=\\#' + Sectionid + ']').parent().addClass('current');
                    }
                });
            });
        } else {
            $('.one-page-scroll-menu li.current').removeClass('current');
            $('.one-page-scroll-menu li:first').addClass('current');
        }
    }
    if ($('.search-popup__toggler').length) {
        $('.search-popup__toggler').on('click', function (e) {
            $('.search-popup').addClass('active');
            e.preventDefault();
        });
    }

    if ($('.search-popup__overlay').length) {
        $('.search-popup__overlay').on('click', function (e) {
            $('.search-popup').removeClass('active');
            e.preventDefault();
        });
    }
    if ($('.counter').length) {
        $('.counter').counterUp({
            delay: 10,
            time: 3000
        });
    }


    if ($('.img-popup').length) {
        var groups = {};
        $('.img-popup').each(function () {
            var id = parseInt($(this).attr('data-group'), 10);

            if (!groups[id]) {
                groups[id] = [];
            }

            groups[id].push(this);
        });


        $.each(groups, function () {

            $(this).magnificPopup({
                type: 'image',
                closeOnContentClick: true,
                closeBtnInside: false,
                gallery: {
                    enabled: true
                }
            });

        });

    };

    if ($('[data-toggle="tooltip"]').length) {
        $('[data-toggle="tooltip"]').tooltip();
    }


    if ($('.video-popup').length) {
        $('.video-popup').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: true,

            fixedContentPos: false
        });
    }

    if ($('.typed-effect').length) {
        $('.typed-effect').each(function () {
            var typedStrings = $(this).data('strings');
            var typedTag = $(this).attr('id');
            var typed = new Typed('#' + typedTag, {
                typeSpeed: 100,
                backSpeed: 100,
                fadeOut: true,
                loop: true,
                strings: typedStrings.split(',')
            });
        });

    }


    $(window).on('scroll', function () {
        if ($('.stricked-menu').length) {
            var headerScrollPos = 100;
            var stricky = $('.stricked-menu');
            if ($(window).scrollTop() > headerScrollPos) {
                stricky.addClass('stricky-fixed');
            } else if ($(this).scrollTop() <= headerScrollPos) {
                stricky.removeClass('stricky-fixed');
            }
        }
        OnePageMenuScroll();
        if ($('.scroll-to-top').length) {
            var strickyScrollPos = 100;
            if ($(window).scrollTop() > strickyScrollPos) {
                $('.scroll-to-top').fadeIn(500);
            } else if ($(this).scrollTop() <= strickyScrollPos) {
                $('.scroll-to-top').fadeOut(500);
            }
        }

    });
    $(window).on('load', function () {
        
        if ($('.tour-details__gallery-thumb-carousel').length) {
            var testimonialsTwoThumbCarousel = new Swiper('.tour-details__gallery-thumb-carousel', {
                slidesPerView: 5,
                spaceBetween: 10,
                mousewheel: true,
                speed: 1400,
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
                loop: true,
                autoplay: {
                    delay: 5000,
                },
            });
        }

        if ($('.tour-details__gallery-carousel').length) {
            var testimonialsTwoCarousel = new Swiper('.tour-details__gallery-carousel', {
                observer: true,
                observeParents: true,
                speed: 1400,
                mousewheel: false,
                autoplay: {
                    delay: 5000
                },
                thumbs: {
                    swiper: testimonialsTwoThumbCarousel
                }
            });
        }
        if ($('.thm__owl-carousel').length) {
            $('.thm__owl-carousel').each(function () {
                var Self = $(this);
                var carouselOptions = Self.data('options');
                var carouselPrevSelector = Self.data('carousel-prev-btn');
                var carouselNextSelector = Self.data('carousel-next-btn');
                var thmCarousel = Self.owlCarousel(carouselOptions);
                if (carouselPrevSelector !== undefined) {
                    $(carouselPrevSelector).on('click', function () {
                        thmCarousel.trigger('prev.owl.carousel');
                        return false;
                    });
                }
                if (carouselNextSelector !== undefined) {
                    $(carouselNextSelector).on('click', function () {
                        thmCarousel.trigger('next.owl.carousel');
                        return false;
                    });
                }
            });
        }

        if ($('.side-menu__block-inner').length) {
            $('.side-menu__block-inner').mCustomScrollbar({
                axis: 'y',
                theme: 'dark'
            });
        }

        if ($('.custom-cursor__overlay').length) {

            // / cursor /
            var cursor = $(".custom-cursor__overlay .cursor"),
                follower = $(".custom-cursor__overlay .cursor-follower");

            var posX = 0,
                posY = 0;

            var mouseX = 0,
                mouseY = 0;

            TweenMax.to({}, 0.016, {
                repeat: -1,
                onRepeat: function () {
                    posX += (mouseX - posX) / 9;
                    posY += (mouseY - posY) / 9;

                    TweenMax.set(follower, {
                        css: {
                            left: posX - 22,
                            top: posY - 22
                        }
                    });

                    TweenMax.set(cursor, {
                        css: {
                            left: mouseX,
                            top: mouseY
                        }
                    });

                }
            });

            $(document).on("mousemove", function (e) {
                var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                mouseX = e.pageX;
                mouseY = e.pageY - scrollTop;
            });
            $("button, a").on("mouseenter", function () {
                cursor.addClass("active");
                follower.addClass("active");
            });
            $("button, a").on("mouseleave", function () {
                cursor.removeClass("active");
                follower.removeClass("active");
            });
            $(".custom-cursor__overlay").on("mouseenter", function () {
                cursor.addClass("close-cursor");
                follower.addClass("close-cursor");
            });
            $(".custom-cursor__overlay").on("mouseleave", function () {
                cursor.removeClass("close-cursor");
                follower.removeClass("close-cursor");
            });
        }
        if ($('.preloader').length) {
            $('.preloader').fadeOut();
        }

        if ($('.countdown-one__list').length) {
            $('.countdown-one__list').countdown({
                date: "June 7, 2020 15:03:25",
                render: function (date) {
                    this.el.innerHTML =
                        "<li> <div class='days'> <i>" + date.days + "</i> <span>Days</span> </div> </li>" +
                        "<li> <div class='hours'> <i>" + date.hours + "</i> <span>Hours</span> </div> </li>" +
                        "<li> <div class='minutes'> <i>" + date.min + "</i> <span>Minutes</span> </div> </li>" +
                        "<li> <div class='seconds'> <i>" + date.sec + "</i> <span>Seconds</span> </div> </li>";
                }
            });
        }

        if ($('.masonary-layout').length) {
            $('.masonary-layout').isotope({
                layoutMode: 'masonry',
                itemSelector: '.masonary-item',

            });
        }

        if ($('.post-filter').length) {
            var postFilterList = $('.post-filter li');
            // for first init
            $('.filter-layout').isotope({
                filter: '.filter-item',
                animationOptions: {
                    duration: 500,
                    easing: 'linear',
                    queue: false
                }
            });
            // on click filter links
            postFilterList.on('click', function () {
                var Self = $(this);
                var selector = Self.attr('data-filter');
                postFilterList.removeClass('active');
                Self.addClass('active');


                $('.filter-layout').isotope({
                    filter: selector,
                    animationOptions: {
                        duration: 500,
                        easing: 'linear',
                        queue: false
                    }
                });
                return false;
            });
        }

        if ($('.banner-two__bg').length) {
            $('.banner-two__bg-inner').each(function () {
                var Self = $(this);
                var bgSlideOptions = Self.data('options');
                var bannerTwoSlides = Self.vegas(bgSlideOptions);
            });
        }

        if ($('.home-5__bg').length) {
            $('.home-5__bg-inner').each(function () {
                var Self = $(this);
                var bgSlideOptions = Self.data('options');
                var bannerTwoSlides = Self.vegas(bgSlideOptions);
            });
        }

    });

// ...existing code...

    $(window).on('load', function () {
        // ...existing load function code...
    });

// ...existing code...

// ...existing code...

    // Add delayed developer credit with auto-hide
    setTimeout(function() {
        var developerCredit = document.createElement('p');
        developerCredit.className = 'developer-credit';
        developerCredit.style.cssText = `
            color: #fff;
            margin-top: 10px;
            text-align: center;
            opacity: 0;
            animation: fadeInOut 2s ease-in-out forwards;
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 9999;
            width: 100%;
            background: rgba(0,0,0,0.7);
            padding: 10px;
        `;
        developerCredit.innerHTML = 'Developed by Rantideb';
        
        document.body.appendChild(developerCredit);
        // Remove the element after animation
        setTimeout(function() {
            developerCredit.remove();
        }, 1000); // Remove after 1 second
    }, 5000); // Show after 5 seconds

    // Add fadeInOut animation
    var style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
        }
        @media (max-width: 767px) {
            .developer-credit {
                font-size: 14px !important;
                padding: 8px !important;
            }
        }
    `;
    document.head.appendChild(style);



// New Update
    

})(jQuery);



// New Update 

