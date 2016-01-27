var selects = [];
$(function(){
    $( 'select' ).each( function(i){
        selects[i] = new AresSelect( {
            obj: $( this ),
            optionType: 1,
            selects: selects
        } );
    } );
} );

var AresSelect = function( params ){
    this.obj = params.obj;
    this.selects = params.selects;
    this.curParent = this.obj.parents('.options__selects-wrap');
    this.curParent2 = this.obj.parents('.options__mini-select');
    this.curParent3 = this.obj.parents('.category-search__select');
    this.curParent4 = this.obj.parents('.options__input-txt');
    this.curParent5 = this.obj.parents('.category-search__select');
    this.optionType = params.optionType || 0;
    this.showType = params.showType || 0;
    this.visible = params.visible || 12;

    this.init();
};
    AresSelect.prototype = {
        init: function(){
            var self = this;

            self.core = self.core();
            self.core.build();
        },
        core: function(){
            var self = this;

            return {
                build: function(){
                    self.core.start();
                    self.core.controls();
                },
                start: function(){
                    self.device = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                    self.text = $( '<span class="ares-select__item"></span>' );
                    self.selControl = $( '<span class="ares-select__btn"></span>' );
                    self.wrap = $( '<div class="ares-select"></div>' );
                    self.window = $( window );
                    self.opened = false;
                    if ( self.curParent.hasClass('options__selects-wrap_car') ){
                        self.text = $( '<span class="ares-select__item" data-type="options__selects-all"></span>' );
                    }
                    if ( self.curParent4.length ){
                        self.text = $( '<input type="text" class="ares-select__item" maxlength="4">' );
                    }
                    self.core.addWraper();
                    if( !self.optionType || self.device ){
                        self.core.setMobileView();
                    } else if( self.optionType == 1 ){
                        self.core.setCustom1();
                    }

                    self.obj[ 0 ].customSelect = this;
                },
                setMobileView: function(){
                    self.wrap.addClass( 'ares-select_mobile' );
                },
                setCustom1: function(){
                    self.wrap.addClass( 'ares-select_custom' );
                },
                destroy: function(){
                    self.text.remove();
                    self.wrap.unwrap();
                },
                addWraper: function(){
                    var curText = '';

                    self.obj.css( {
                        opacity: 0
                    } );

                    self.obj.wrap( self.wrap );
                    self.wrap = self.obj.parent();
                    self.obj.before( self.text );
                    if ( self.curParent4.length ){
                        self.obj.before( self.selControl )
                    }
                    self.obj.find( 'option' ).each( function(){
                        var curItem = $( this );

                        if( curItem.attr( 'selected' ) == 'selected' ){
                            curText = curItem.text();
                        }
                    } );

                    if( curText == '' ){
                        curText =  self.obj.find( 'option').eq( 0 ).text();
                    }
                    if ( self.curParent4.length ){
                        self.text.val( curText );
                    } else {
                        self.text.text( curText );
                    }
                },

                showPopup: function(){
                    var list = $( '<ul></ul>'),
                        curScroll = self.window.scrollTop(),
                        offset = self.wrap.offset(),
                        maxHeight = 0,
                        curIndex = self.obj.find( 'option:selected' ).index(),
                        id = Math.round( Math.random() * 1000 );

                    if( self.opened ){
                        self.popup.remove();
                    }
                    self.opened = true;

                    self.popup = $( '<div class="ares-select__popup" id="ares-select__popup' + id + '"></div>' );

                    if ( self.curParent2.length ){
                        self.popup.addClass('ares-select__popup_mini')
                    }

                    if ( self.curParent.hasClass('options__selects-wrap_car') ){
                        self.popup.addClass('ares-select__popup_car');
                    }

                    if ( self.curParent3.length ){
                        self.popup.addClass('category-search__select-popup')
                    }

                    self.obj.find( 'option' ).each( function(i){
                        var curItem = $( this),
                            curClass = curItem.attr('class');

                        if( i == curIndex ){
                            list.append( '<li class="active '+curClass+'">' + curItem.text() + '</li>' );
                        } else {
                            list.append( '<li class="'+curClass+'">' + curItem.text() + '</li>' );
                        }

                    } );
                    self.popup.append( list );
                    $( 'body' ).append( self.popup );
                    self.popup.css( {
                        width: self.wrap.outerWidth(),
                        left: offset.left,
                        top: offset.top + self.wrap.outerHeight()
                    } );

                    var elemHeight = self.popup.find( 'li:not(.active)').outerHeight(),
                        activeHeight = self.popup.find('li.active').outerHeight();

                    maxHeight = self.popup.outerHeight();
                    if( maxHeight > elemHeight * (self.visible-1) + activeHeight ){
                        self.popup.height(self.popup.find( 'li' ).eq( 0 ).outerHeight() * self.visible);
                        self.scroll = new IScroll('#ares-select__popup' + id, {
                            scrollX: false,
                            scrollY: true,
                            click: true,
                            zoom:true,
                            mouseWheel: true,
                            scrollbars: 'custom',
                            probeType: 3,
                            interactiveScrollbars: true
                        });
                    }


                    if( self.showType == 1 ){
                        self.popup.css( {
                            display: 'none'
                        } );
                        self.popup.slideDown( 10, function(){
                            if( self.scroll ) {
                                self.scroll.refresh();
                            }
                        } );
                    } else if( self.showType == 2 ) {
                        self.popup.css( {
                            opacity: 0.1
                        } );
                        self.popup.animate( { opacity: 1 },1, function(){
                            if( self.scroll ) {
                                self.scroll.refresh();
                            }
                        } );
                    }
                    self.popup.find( 'li' ).on( {
                        'click': function( event ){
                            var event = event || window.event,
                                index = $( this ).index();

                            if (event.stopPropagation) {
                                event.stopPropagation()
                            } else {
                                event.cancelBubble = true
                            }
                            var curClass = $(this).attr('class');
                            self.obj.val( self.obj.find( 'option' ).eq( index).attr( 'value' ) );
                            self.obj.trigger( 'change' );
                            if ( self.curParent.hasClass('options__selects-wrap_car') ){
                                self.text.attr( 'data-type' , ''+curClass+'');
                            }
                            self.core.hidePopup();
                        }
                    } );
                    self.curParent.addClass('active');
                    self.curParent2.addClass('active');
                    self.curParent5.addClass('active');

                },
                hidePopup: function(){
                    self.opened = false;
                    if( !self.showType ){
                        self.popup.css( {
                            display: 'none'
                        } );
                    } else if( self.showType == 1 ){
                        self.popup.stop( true, false ).slideUp( 1, function(){
                            self.popup.remove();
                        } );
                    } else if( self.showType == 2 ) {
                        self.popup.stop( true, false ).fadeOut( 1, function(){
                            self.popup.remove();
                        } );
                    }

                    self.curParent.removeClass('active');
                    self.curParent2.removeClass('active');
                    self.curParent5.removeClass('active');
                },
                controls: function() {
                    self.obj.on( 'change', function() {
                        if ( self.curParent4.length ){
                            self.text.val( $( this ).find( 'option:selected' ).text() );
                        } else {
                            self.text.text( $( this ).find( 'option:selected' ).text() );
                        }
                    } );

                    if( self.optionType == 1 && !self.device ){

                        if ( self.curParent4.length ){
                            self.selControl.on( {
                                'click': function(event){
                                    var event = event || window.event;

                                    if (event.stopPropagation) {
                                        event.stopPropagation()
                                    } else {
                                        event.cancelBubble = true
                                    }

                                    $.each(self.selects, function(){
                                        if (this.obj != self.obj) {
                                            if ( this.opened ){
                                                this.core.hidePopup();
                                            }
                                        }
                                    });

                                    if( self.opened ){
                                        self.core.hidePopup();
                                    } else {
                                        self.core.showPopup();
                                    }

                                }
                            } );
                            $( 'body' ).on( {
                                'click': function(){
                                    if( self.opened ){
                                        self.core.hidePopup();
                                    }
                                }
                            } );

                        } else {
                            self.wrap.on( {
                                'click': function(event){
                                    var event = event || window.event;

                                    if (event.stopPropagation) {
                                        event.stopPropagation()
                                    } else {
                                        event.cancelBubble = true
                                    }

                                    $.each(self.selects, function(){
                                        if (this.obj != self.obj) {
                                            if ( this.opened ){
                                                this.core.hidePopup();
                                            }
                                        }
                                    });

                                    if( self.opened ){
                                        self.core.hidePopup();
                                    } else {
                                        self.core.showPopup();
                                    }

                                }
                            } );
                            $( 'body' ).on( {
                                'click': function(){
                                    if( self.opened ){
                                        self.core.hidePopup();
                                    }
                                }
                            } );
                        }
                    }

                    $(".ares-select__item").keydown(function(event) {
                        // Разрешаем: backspace, delete, tab и escape
                        if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
                                // Разрешаем: Ctrl+A
                            (event.keyCode == 65 && event.ctrlKey === true) ||
                                // Разрешаем: home, end, влево, вправо
                            (event.keyCode >= 35 && event.keyCode <= 39)) {
                            // Ничего не делаем
                            return;
                        }
                        else {
                            // Убеждаемся, что это цифра, и останавливаем событие keypress
                            if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
                                event.preventDefault();
                            }
                        }
                    });

                    $('#options-from input').on('focus', function(){
                        if($(this).val() == "От"){
                            $(this).val("")
                        }
                    });
                    $('#options-from input').on('focusout', function(){
                        if($(this).val()==""){
                            $(this).val("От")
                        }
                    });
                    $('#options-to input').on('focus', function(){
                        if($(this).val() == "До"){
                            $(this).val("")
                        }
                    });
                    $('#options-to input').on('focusout', function(){
                        if($(this).val()==""){
                            $(this).val("До")
                        }
                    });

                }
            };
        }
    };