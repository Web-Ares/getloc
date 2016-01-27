$(function(){

    $('.swiper-container').each(function () {
        Slider($(this));
    });

    $('.site').delegate( "input", "focus blur", function() {
        var elem = $( this );
        setTimeout(function() {
            elem.parent().toggleClass( "focused", elem.is( ":focus" ) );
        }, 0 );
    });

    $('.promo__more').on({
        'click':function(){
            var elementClick = $(this).attr("href");
            var destination = $(elementClick).offset().top - 100;
            jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 800);
            return false;
        }
    });

    $.widget( "custom.iconselectmenu", $.ui.selectmenu, {
        _renderItem: function( ul, item ) {
            var li = $( "<li>", { text: item.label } );

            if ( item.disabled ) {
                li.addClass( "ui-state-disabled" );
            }

            $( "<span>", {
                style: item.element.attr( "data-style" ),
                "class": "ui-icon " + item.element.attr( "data-class" )
            })
                .appendTo( li );

            return li.appendTo( ul );
        }
    });

    $( ".discount__languadge" )
        .iconselectmenu()
        .iconselectmenu( "menuWidget")
        .addClass( "ui-menu-icons flag" );

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