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

    if ( $(".gallery").length ){
        var gallery = $( '.gallery' );
        new Gallery( {
            obj: gallery,
            duration: gallery.data('duration'),
            items: gallery.find( '.gallery__item' ),
            btnNext: gallery.find( '.gallery__next' ),
            btnPrev: gallery.find('.gallery__prev')
        } );
    }

    $(".gallery__next, .gallery__prev").on({
        click: function(event){
            event = event || window.event;
            event.stopPropagation();
        }
    });

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

var Gallery = function (params) {
    this.obj = params.obj;
    this.elems = {
        btnPrev: params.btnPrev,
        btnNext: params.btnNext,
        items: params.items
    };
    this.duration = params.duration || 3000;
    this.sectionNumber = 9; //this.sectionNumber must be not more then 10
    this.action = false;
    this.image = null;
    this.imgWidth = null;
    this.itemWrap = null;
    this.url = null;
    this.sections = null;

    this.init();
};
Gallery.prototype = {
    init: function () {
        var self = this;

        self.core = self.core();
        self.core.build();
    },
    core: function () {
        var self = this,
            elems = self.elems;

        return {
            build: function () {
                var count = elems.items.length,
                    i,
                    points = $( '<ul class="slider__points"></ul>' );

                for( i = 0; i < count; i++ ){
                    points.append( '<li></li>' );
                }
                self.obj.append( points );
                elems.points = points.find( 'li' );
                elems.points.eq( 0 ).addClass( 'active' );
                elems.items.eq( 0 ).addClass( 'slider__item_first-show' );

                self.core.addEvents();
                self.core.slideToNext();
                self.core.addSections();
            },

            slideToNext: function(){
                self.timer = setTimeout( function(){
                    elems.btnNext.trigger( 'click' );
                }, self.duration );
            },

            addEvents: function () {

                elems.btnPrev.on( {
                    'click': function(){
                        var index = ( ( elems.points.filter( '.active' ).index() - 1 ) == -1 ) ? (elems.points.length - 1) :( elems.points.filter( '.active' ).index() - 1 );

                        self.core.slideTo( index );
                    }
                } );
                elems.btnNext.on( {
                    'click': function(){
                        var index = ( ( elems.points.filter( '.active' ).index() + 1 ) == elems.points.length )? 0:( elems.points.filter( '.active' ).index() + 1 );

                        self.core.slideTo( index );
                    }
                } );
                elems.points.on( {
                    'click': function(){
                        var curItem = $( this );

                        if( !curItem.hasClass( 'active' ) ){
                            self.core.slideTo( curItem.index() );
                        }
                    }
                } );
                self.obj.on( {
                    'mouseover': function(){
                        clearTimeout( self.timer );
                    },
                    'mouseleave': function(){
                        self.core.slideToNext();
                    }
                } );
                $(window).on({
                    resize: function(){
                        var sliderWidth = self.obj.width(),
                            windowWidth = $(".site__content").width(),
                            windowHeight = $(".site__content").height(),
                            sliderProportion = windowWidth/windowHeight,
                            constProportion = 1366/768;
                        elems.items.each( function(){

                            var innerItems = $(this).find(".slider__sections>div");

                            self.image = $(this).find(".slider__bg img");
                            self.imgWidth = self.image.width();
                            self.itemWrap = $(this).find(".slider__bg");
                            self.url = self.image.attr("src");

                            innerItems.each(function(i){
                                var posX = -(self.imgWidth - ( (self.imgWidth/self.sectionNumber)*(self.sectionNumber-i) ));
                                if ( i==0 ){posX = 0;}
                                $(this).css( {
                                    backgroundPosition: posX+"px 0"
                                } );
                            });
                        } );

                        if ( sliderProportion > constProportion ){
                            self.obj.css({
                                "height": windowWidth/constProportion,
                                "left": "50%",
                                "margin-left": -sliderWidth/2
                            });
                        } else {
                            self.obj.attr("style", "")
                        }

                    },

                    load: function(){
                        var sliderHeight = self.obj.height(),
                            sliderWidth = self.obj.width(),
                            sliderProportion = sliderWidth/sliderHeight,
                            constProportion = 1366/768;
                        if ( sliderProportion > constProportion ){
                            self.obj.css({
                                "height": sliderWidth/constProportion,
                                "left": "50%",
                                "margin-left": -sliderWidth/2
                            });
                        } else {
                            self.obj.attr("style", "")
                        }
                    }

                });

            },

            slideTo: function(index){
                if ( !self.action ){
                    self.action = true;
                    var activeIndex = elems.points.filter( '.active' ).index(),
                        activeItem = elems.items.eq( activeIndex ),
                        activePoint = elems.points.eq( activeIndex ),
                        newItem = elems.items.eq( index),
                        newPoint = elems.points.eq( index );

                    clearTimeout( self.timer );
                    self.core.slideToNext();

                    activeItem.addClass("slider__item-finish");
                    activeItem.css({
                        "z-index": "1"
                    });

                    setTimeout( function(){
                        activeItem.removeClass( 'active' );
                        activeItem.removeClass( 'slider__item-finish' );
                        activeItem.removeClass("slider__item_first-show");
                        self.action = false;
                    },1500 );

                    activePoint.removeClass( 'active' );
                    setTimeout(function(){
                        newPoint.addClass( 'active' );
                        newItem.css({
                            "z-index": "2"
                        });
                        newItem.addClass( 'active' );
                    },500);
                }

            },

            addSections: function(){

                elems.items.each( function(){
                    self.image = $(this).find(".slider__bg img");
                    self.imgWidth = self.image.width();
                    self.itemWrap = $(this).find(".slider__bg");
                    self.url = self.image.attr("src");
                    self.sections = $( '<div class="slider__sections"/>');
                    self.core.widthCalculation();
                    self.itemWrap.append(self.sections);
                } );
            },

            widthCalculation: function(){
                for ( var i=0; i<self.sectionNumber; i++){
                    var posX = -(self.imgWidth - ( (self.imgWidth/self.sectionNumber)*(self.sectionNumber-i) )),
                        sectionWidth = 100/self.sectionNumber+"%",
                        leftPosition = 100/self.sectionNumber*i+"%";
                    if ( i==0 ){posX = 0;}
                    self.sections.append( '<div class="slider__line-'+(i+1)+'" style="background: url('+self.url+') no-repeat '+posX+'px 0; width: '+sectionWidth+'; left: '+leftPosition+'; background-size: auto 100% !important;"/>' );
                }
            }

        };
    }
};