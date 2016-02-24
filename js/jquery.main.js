$(function(){

    $.each( $('.discount__form'), function(){
        new FormValidation ( $(this) );
    } );

    $.each( $('.program__sign-up'), function(){
        new FormValidation ( $(this) );
    } );

    $.each( $('.site__form'), function(){
        new FormValidation ( $(this) );
    } );

    $.each( $('.enroll__form'), function(){
        new FormValidation ( $(this) )
    } );

    $.each( $('.popup__form'), function(){
        new FormValidation ( $(this) )
    } );

    $('.swiper-container').each(function () {
        Slider($(this));
    });

    $('.popup').each(function(){
        new Popup($(this));
    });

    $('body').delegate( "input", "focus blur", function() {
        var elem = $( this );
        setTimeout(function() {
            elem.parent().toggleClass( "focused", elem.is( ":focus" ) );
        }, 0 );
    });

    $('.anchor').on({
        'click':function(){
            var elementClick = $(this).data("href");
            var destination = $(elementClick).offset().top - 100;
            jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: destination}, 800);
            return false;
        }
    });

    $('.logo').on({
        'click':function(){
            if ($(window).scrollTop() < 1){
                return false
            }
        }
    });

    var start = $(".site__header").offset().top + $(".site__header").outerHeight();
    navigation();

    $(window).scroll(function() {
        navigation();
    });

    function navigation(){
        scrolling = $(window).scrollTop();
        if (scrolling > start) {
            $('.site__header').addClass('header-fix');
        }
        else{
            $('.site__header').removeClass('header-fix');
        }
        if (scrolling > start+50) {
            $('.program__sign-up').addClass('program-fix')
        } else {
            $('.program__sign-up').removeClass('program-fix')
        }
        if($(window).scrollTop() + $(window).height() > $('.site__footer').offset().top - 20) {
            $('.program__sign-up').addClass('program-absolute')
        } else {
            $('.program__sign-up').removeClass('program-absolute')
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

var FormValidation = function (obj) {
    var _obj = obj,
        _action = _obj.find( 'form' ).attr( 'action' ),
        _inputs = _obj.find($("[required]")),
        _select = _obj.find( $("select[required]") );

    var _addEvents = function () {

            _obj.on({
                'submit': function(){

                    $.each( _inputs, function(){

                        var curItem = $(this),
                            curAttr = curItem.attr("type");

                        if ( curAttr == "checkbox" ){
                            var curCheck = this.checked;
                            if ( !curCheck ){
                                curItem.addClass("site__required-error");
                                curItem.closest("fieldset").addClass('error');
                            }

                        }
                        else if ( curItem.is("select") ){

                            if ( !curItem.parents(".site__connection-hide_true").length ){
                                if ( curItem.val() == "0" ){
                                    curItem.closest("fieldset").addClass('error');
                                }
                            }

                        }
                        else if ( curItem.val() == '' ) {

                            if ( !curItem.parents(".site__connection-hide_true").length ){
                                curItem.addClass("site__required-error");
                                curItem.closest("fieldset").addClass('error');
                            }
                        }
                        else if ( curAttr == "email" ){
                            var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                            if ( pattern.test(curItem.val()) == false ){
                                curItem.addClass("site__required-error");
                                curItem.closest("fieldset").addClass('error');
                            }
                        }

                    } );

                    if(!(_obj.find('.error').length) ){

                        if (_obj.hasClass('enroll__form')) {
                            $.ajax({
                                url: _action,
                                dataType: 'html',
                                timeout: 20000,
                                type: "GET",
                                data: {
                                    enroll: 'true',
                                    email: $('#enroll__email').val()
                                },
                                success: function (msg) {
                                    $('.enroll__form').addClass('success');
                                    $('.enroll__thanks').addClass('success');
                                },
                                error: function (XMLHttpRequest) {
                                    if (XMLHttpRequest.statusText != "abort") {
                                        alert(XMLHttpRequest.statusText);
                                    }
                                }
                            });
                            return false;
                        }

                        if (_obj.hasClass('discount__form')) {

                            var selectsVal = [];

                            $.each( $('.discount__selects-language select'), function(i){
                                selectsVal[i] = this.value;
                            } );

                            $.ajax({
                                url: 'php/form.php',
                                dataType: 'html',
                                timeout: 20000,
                                type: "GET",
                                data: {
                                    discount: 'true',
                                    name: $('#discount__name').val(),
                                    email: $('#discount__email').val(),
                                    phone: $('#discount__phone').val(),
                                    address: $('#discount__address').val(),
                                    language: selectsVal
                                },
                                success: function () {
                                    $('.discount__layout').addClass('success');
                                    $('.discount__thanks').addClass('success');
                                },
                                error: function (XMLHttpRequest) {
                                    if (XMLHttpRequest.statusText != "abort") {
                                        alert(XMLHttpRequest.statusText);
                                    }
                                }
                            });
                            return false;
                        }

                        if (_obj.hasClass('program__sign-up')) {

                            $.ajax({
                                url: 'php/program-send.php',
                                dataType: 'html',
                                timeout: 20000,
                                type: "GET",
                                data: {
                                    organization: $('#organization').val(),
                                    name: $('#contact-person').val(),
                                    site: $('#site').val(),
                                    phone: $('#phone').val(),
                                    email: $('#email').val()
                                },
                                success: function (data) {
                                    popup.core.show('thanks');
                                    setTimeout(function () {
                                        popup.core.hide('thanks')
                                    }, 3000);
                                },
                                error: function (XMLHttpRequest) {
                                    if (XMLHttpRequest.statusText != "abort") {
                                        alert(XMLHttpRequest.statusText);
                                    }
                                }
                            });
                            return false;
                        }

                        if (_obj.hasClass('popup__form')) {

                            var selectsVal = [];

                            $.each( $('.discount__selects-language select'), function(i){
                                selectsVal[i] = this.value;
                            } );

                            $.ajax({
                                url: 'php/form.php',
                                dataType: 'html',
                                timeout: 20000,
                                type: "GET",
                                data: {
                                    discount: 'true',
                                    name: $('#popup__name').val(),
                                    email: $('#popup__email').val(),
                                    phone: $('#popup__phone').val(),
                                    address: $('#popup__address').val(),
                                    language: selectsVal
                                },
                                success: function (data) {
                                    popup.core.show('thanks');
                                    setTimeout(function () {
                                        popup.core.hide('thanks')
                                    }, 3000);
                                },
                                error: function (XMLHttpRequest) {
                                    if (XMLHttpRequest.statusText != "abort") {
                                        alert(XMLHttpRequest.statusText);
                                    }
                                }
                            });
                            return false;
                        }

                    } else {
                        return false;

                    }
                }
            });
            _inputs.on({

                'focus': function(){

                    var curItem = $(this),
                        closest = curItem.closest("fieldset"),
                        innerInputs = closest.find("input");

                    if(closest.hasClass('error')){
                        curItem.removeClass("site__required-error");
                        if ( innerInputs.length > 1 ){
                            if ( !closest.find(".site__required-error").length ){
                                closest.removeClass('error');
                            }
                        } else {
                            closest.removeClass('error');
                        }
                    }

                }

            });

            _select.on({
                change: function(){
                    var curItem = $(this);
                    curItem.closest("fieldset").removeClass('error');
                }
            });

        },
        _init = function () {
            _addEvents();
        };

    _init();
};

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

var Popup = function( obj ){
    this.popup = obj;
    this.btnShow = $('.popup__open');
    this.btnClose = obj.find( '.popup__close, .popup__cancel' );
    this.wrap = obj.find($('.popup__wrap'));
    this.contents = obj.find($('.popup__content'));
    this.window = $( window );
    this.scrollConteiner = $( 'html' );
    this.timer = setTimeout( function(){},1 );

    this.init();
};
Popup.prototype = {
    init: function(){
        var self = this;
        self.core = self.core();
        self.core.build();
    },
    core: function (){
        var self = this;
        return {
            build: function (){
                self.core.controls();
            },
            controls: function(){

                $('.popup__content').on( 'click','.popup__open', function(){
                    var curItem = $(this);
                    self.contents.css( 'display', '' );
                    self.core.setPopupContent( curItem.attr( 'data-popup' ) );
                    return false;

                    //self.core.show( curItem.attr( 'data-popup' ) );
                    //self.btnClose = self.popup.find(".popup__close");
                    //$('.popup_opened').find('#order-popup__type').val( curItem.attr( 'data-type' ) );
                    //return false;

                });

                $('body').on( 'click','.popup__open', function(){
                    var curItem = $(this),
                        parentDropdown = curItem.parents(".dropdown"),
                        linkDropdown = parentDropdown.find("a[data-toggle=dropdown]");
                    parentDropdown.removeClass("open");
                    linkDropdown.attr("aria-expanded", "false");
                    self.core.show( curItem.attr( 'data-popup' ) );
                    self.btnClose = self.popup.find(".popup__close");
                    $('.popup_opened').find('#order-popup__type').val( curItem.attr( 'data-type' ) );
                    return false;
                } );

                self.wrap.on( {
                    click: function( event ){
                        event = event || window.event;

                        if (event.stopPropagation) {
                            event.stopPropagation();
                        } else {
                            event.cancelBubble = true;
                        }
                    }
                } );
                self.popup.on( {
                    click: function(){
                        self.core.hide();
                        return false;
                    }
                } );
                self.btnClose.on( {
                    click: function(){
                        self.core.hide();
                        return false;
                    }
                } );
            },
            hide: function(){
                self.popup.css ({
                    'overflow-y': "hidden"
                });
                self.scrollConteiner.css({
                    paddingRight: 0,
                    'overflow-y': "scroll"
                });
                self.popup.removeClass('popup_opened');
                self.popup.addClass('popup_hide');
                location.hash = '';
                setTimeout( function(){
                    self.popup.removeClass('popup_hide');
                }, 300 );
            },
            getScrollWidth: function (){
                var scrollDiv = document.createElement("div");
                scrollDiv.className = "popup__scrollbar-measure";
                document.body.appendChild(scrollDiv);
                var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
                document.body.removeChild(scrollDiv);
                return scrollbarWidth;
            },
            show: function( className ){

                if ( self.popup.hasClass( 'popup_opened' ) ){
                    self.core.hide();
                }

                if (self.contents.height()+120 > self.window.height()){
                    self.popup.css ({
                        'overflow-y': "scroll"
                    });
                    self.scrollConteiner.css( {
                        'overflow-y': "hidden",
                        paddingRight: 17
                    });
                }
                self.core.setPopupContent( className );
                self.popup.addClass('popup_opened');
                $('.popup_opened').find('#order-popup__name').focus();
            },
            setPopupContent: function( className ){
                self.contents = self.popup.find('.popup__content');
                var curContent = self.contents.filter( '.popup__' + className );
                self.contents.css( { display: 'none' } );
                curContent.css( { display: 'block' } );
            }

        };
    }
};
