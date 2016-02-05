(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
jQuery(document).ready(function($) {



        //Preloader Script
        $(window).load(function() {
            // makes sure the whole site is loaded
            $('#status').fadeOut(); // will first fade out the loading animation
            $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
            $('body').delay(350).css({'overflow':'visible'});
        });


        // This is the jQuery for Page Smooth Scrolling Feature
	    $(function() {
	        $('a.page-scroll').bind('click', function(event) {
	            var $anchor = $(this);
	            $('html, body').stop().animate({
	            scrollTop: $($anchor.attr('href')).offset().top
	            },
	                1500, 'easeInOutExpo');
	                event.preventDefault();
	            });
	        });


    	//Fullscreen Background Image Slideshow
        $.backstretch([
            "http://localhost:8080/img/bg/01.jpg",
            "http://localhost:8080/img/bg/02.jpg",
            "http://localhost:8080/img/bg/03.jpg"
        ], {duration: 3000, fade: 750});


        // Contact form toggle hide/show
        $("#hide").click(function(){
          $("#contact").hide();
        });
        $(document).ready(function(){
          $("#show").click(function(){
            $("#contact").slideToggle("slow,swing");
          });
        });


        // Script for the Counters for Facts Section
        $('.count').each(function() {
            var $this   = $(this);
            $this.data('target', parseInt($this.html()));
            $this.data('counted', false);
            $this.html('0');
        });

        $(window).bind('scroll', function() {
            var speed   = 3000;
            $('.count').each(function() {
                var $this   = $(this);
                if(!$this.data('counted') && $(window).scrollTop() + $(window).height() >= $this.offset().top) {
                    $this.data('counted', true);
                    $this.animate({dummy: 1}, {
                        duration: speed,
                        step:     function(now) {
                            var $this   = $(this);
                            var val     = Math.round($this.data('target') * now);
                            $this.html(val);
                            if(0 < $this.parent('.value').length) {
                                $this.parent('.value').css('width', val + '%');
                            }
                        }
                    });
                }
            });
        }).triggerHandler('scroll');

        // Reviews Carousel using Owl Carousel Plugin
            $("#owl-reviews").owlCarousel({
                navigation : false,
                slideSpeed : 300,
                paginationSpeed : 400,
                singleItem:true,
                pagination: false,
                autoHeight : true,
                autoPlay : true,
            });

        // Screenshots Carousel using Owl Carousel Plugin
            $('#owl-books').owlCarousel({
                items : 3,
                navigation : true,
                navigationText: [
          "<i class='fa fa-chevron-left fa-2x'></i>",
          "<i class='fa fa-chevron-right fa-2x'></i>"
          ],
                pagination: false,
                itemsDesktop : [1199,3],
                itemsDesktopSmall : [980,2],
                itemsTablet: [768,1],
                itemsTabletSmall: [550,1],
                itemsMobile : [ 480,1],
            });

        // Video Carousel using Owl Carousel Plugin
            $('#owl-video').owlCarousel({
                items : 6,
                navigation : true,
                navigationText: [
          "<i class='fa fa-chevron-left fa-2x'></i>",
          "<i class='fa fa-chevron-right fa-2x'></i>"
          ],
                pagination: false,
                itemsDesktop : [1199,3],
                itemsDesktopSmall : [980,2],
                itemsTablet: [768,1],
                itemsTabletSmall: [550,1],
                itemsMobile : [ 480,1]
            });

        // debugger
        // // Content Animation Effects using Wow.js Plugin
        // var wow = new WOW( {
        //     boxClass:     'wow',      // animated element css class (default is wow)
        //     animateClass: 'animated', // animation css class (default is animated)
        //     offset:       0,          // distance to the element when triggering the animation (default is 0)
        //     mobile:       true,       // trigger animations on mobile devices (default is true)
        //     live:         true        // act on asynchronously loaded content (default is true)
        //     });
        // wow.init();

        // console.log($('.mailchimp'));
        //Mailchimp Subscription Integration
        $('.mailchimp').ajaxChimp({
            callback: mailchimpCallback,
            url: "http://rpjs.us7.list-manage.com/subscribe/post?u=36e6fbd670f90424e85a36feb&amp;id=da2c575ff8" //Replace this with your own mailchimp post URL. Don t remove the "". Just paste the url inside "".
        });

        function mailchimpCallback(resp) {
          // console.log('yo');
             if (resp.result === 'success') {
                $('.subscription-success').html('<i class="fa fa-thumbs-up"></i><br/>' + resp.msg).fadeIn(1000);
                $('.subscription-error').fadeOut(500);

            } else if(resp.result === 'error') {
                $('.subscription-error').html('<i class="fa fa-warning"></i><br/>' + resp.msg).fadeIn(1000);
            }
        };
    });

},{}]},{},[1]);
