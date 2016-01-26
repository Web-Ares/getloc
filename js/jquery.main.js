$(function(){

    $('.swiper-container').each(function () {
        Slider($(this));
    });

    start = $(".site__header").offset().top + $(".site__header").outerHeight();
    navigation();

    $(window).scroll(function() {
        navigation();
    })

    function navigation(){
        scrolling = $(window).scrollTop();
        if (scrolling > start) {
            $('.site__header').addClass('header-fix')
        }
        else{
            $('.site__header').removeClass('header-fix')
        }
    }

} );

var Slider = function (obj) {

    //private properties
    var _self = this,
        _next = obj.parent().find($('.swiper-button-next')),
        _prev = obj.parent().find($('.swiper-button-prev')),
        _paginator = obj.find($('.swiper-pagination')),
        _obj = obj;

    //private methods
    var _addEvents = function () {

        },
        _init = function () {
            _addEvents();
        };
    if (_obj.hasClass('people__slider')) {
        var _swiper = new Swiper(_obj, {
            slidesPerView: 3,
            spaceBetween: 45,
            loop: true,
            nextButton: _next,
            prevButton: _prev
        });
    }

    //public properties

    //public methods

    _init();
};