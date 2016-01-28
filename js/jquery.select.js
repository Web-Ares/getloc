var selects2 = [];
$(function(){

    $( 'select' ).each( function(i){
        selects2[i] = new AresSelect2( {
            obj: $( this ),
            optionType: 1,
            showType: 2,
            selects: selects2
        } );
    } );

    $.each( $('.discount__language'), function(){
        new Lenguages ( $(this) )
    } );

} );

var AresSelect2 = function( params ){
    this.obj = params.obj;
    this.selects = params.selects;
    this.optionType = params.optionType || 0;
    this.showType = params.showType || 1;
    this.visible = params.visible || 5;

    this.init();
};
    AresSelect2.prototype = {
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
                    self.wrap = $( '<div class="ares-select"></div>' );
                    self.cover = $( '.discount__language' );
                    self.window = $( window );
                    self.opened = false;

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
                    self.obj.find( 'option' ).each( function(){
                        var curItem = $( this );

                        if( curItem.attr( 'selected' ) == 'selected' ){
                            curText = curItem.text();
                        }
                    } );

                    if( curText == '' ){
                        curText =  self.obj.find( 'option').eq( 0 ).text();
                    }
                    self.text.text( curText );
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

                    if ( self.wrap.parents(".discount__selects-language").length ){
                        self.obj.find( 'option' ).each( function(i){
                            if ( i==0 ){
                                var curItem = $( this );
                                if( i == curIndex ){
                                    list.append( '<li class="active">' + curItem.text() + '</li>' );
                                } else {
                                    list.append( '<li>' + curItem.text() + '</li>' );
                                }
                            } else {
                                var curItem = $( this),
                                    src = curItem.data('src');
                                if( i == curIndex ){
                                    list.append( '<li class="active"><img src="'+src+'">' + curItem.text() + '</li>' );
                                } else {
                                    list.append( '<li><img src="'+src+'">' + curItem.text() + '</li>' );
                                }
                            }
                        } );

                    } else {
                        self.obj.find( 'option' ).each( function(i){
                            var curItem = $( this );
                            if( i == curIndex ){
                                list.append( '<li class="active">' + curItem.text() + '</li>' );
                            } else {
                                list.append( '<li>' + curItem.text() + '</li>' );
                            }
                        } );
                    }

                    self.popup.append( list );
                    self.wrap.append( self.popup );

                    self.popup.css( {
                        width: self.wrap.outerWidth(),
                        left: 0,
                        top: self.wrap.outerHeight()
                    } );

                    maxHeight = self.popup.outerHeight();
                    if( maxHeight > self.popup.find( 'li' ).eq( 0 ).outerHeight() * self.visible ){
                        self.popup.height(self.popup.find( 'li' ).eq( 0 ).outerHeight() * self.visible);
                        $('#ares-select__popup' + id).niceScroll({
                            cursorcolor:"#ebebeb",
                            cursoropacitymin: "1",
                            cursorborderradius: "5px",
                            cursorborder: "none",
                            cursorwidth: "5px"
                        });
                    }

                    if( self.showType == 1 ){
                        self.popup.css( {
                            display: 'none'
                        } );
                        self.popup.slideDown( 300, function(){
                            if( self.scroll ) {
                                self.popup.getNiceScroll().resize();
                            }
                        } );
                    } else if( self.showType == 2 ) {
                        self.popup.css( {
                            opacity: 1
                        } );
                        self.popup.animate( { opacity: 1 },300, function(){
                            if( self.scroll ) {
                                self.popup.getNiceScroll().resize();
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

                            self.obj.val( self.obj.find( 'option' ).eq( index).attr( 'value' ) );
                            self.obj.trigger( 'change' );
                            self.core.hidePopup();
                            if ( self.obj.val() == "0" ){
                                self.wrap.removeClass( 'ares-select_selected' );
                            } else {
                                self.wrap.addClass( 'ares-select_selected' );
                            }

                        }
                    } );

                },

                hidePopup: function(){
                    self.opened = false;
                    if( !self.showType ){
                        self.popup.css( {
                            display: 'none'
                        } );
                    } else if( self.showType == 1 ){
                        self.popup.stop( true, false ).slideUp( 300, function(){
                            self.popup.remove();
                        } );
                    } else if( self.showType == 2 ) {
                        self.popup.stop( true, false ).fadeOut( 100, function(){
                            self.popup.remove();
                        } );
                    }
                    self.wrap.removeClass('active');
                },
                controls: function() {
                    self.obj.on( 'change', function() {
                        if ( self.wrap.parents(".discount__selects-language").length ){
                            self.text.text( $( this ).find( 'option:selected' ).text() );

                            var txt = $( this ).find( 'option:selected' ).text(),
                                src = null;
                            if ( $( this ).find( 'option:selected' ).data('src') == undefined ){
                                self.text.html(txt);
                            } else {
                                src = $( this ).find( 'option:selected' ).data('src');
                                self.text.html('<img src="'+src+'">' + txt + '');
                            }

                        } else {
                            self.text.text( $( this ).find( 'option:selected' ).text() );
                        }
                    } );

                    if( self.optionType == 1 && !self.device ){
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
                                    self.wrap.removeClass('active');
                                    self.core.hidePopup();
                                } else {
                                    self.wrap.addClass('active');
                                    self.core.showPopup();
                                }

                            }
                        } );
                        $( 'body' ).on( {
                            'click': function(){
                                if( self.opened ){
                                    self.wrap.removeClass('active');
                                    self.core.hidePopup();
                                }
                            }
                        } );
                    }

                }
            };
        }
    };

var Lenguages = function (obj) {

    var _obj = obj,
        _addButton = _obj.find( '.discount__languadge-add'),
        _selectsWrapper = _obj.find( '.discount__selects-language'),
        _arrLanguages = _selectsWrapper.data( 'language' ).languages;

    var _addEvents = function () {
            _addButton.on({
                click: function(){
                    _addLanguage();
                    return false;
                }
            });

            _obj.on( 'change', 'select', function(){
                _fillSelects();
            } );
            _obj.on( 'click', '.discount__languadge-delete', function(){
                _removeSelect( $( this ).parent() );
                return false;
            } );

        },
        _addLanguage = function(){
            var selectAmount = _obj.find( 'select' ).length,
                selectWrap = $( '<div class="discount__language-wrapper">\
                                     <select name="lang_'+selectAmount+'" required>\
                                        <option value="0" selected>Выберите язык</option>\
                                     </select>\
                                     <a href="#" class="discount__languadge-delete"></a>\
                                </div>' );

            _selectsWrapper.append( selectWrap );
            _initNewSelect( selectWrap.find( 'select' ) );
            _fillSelects();
            
            if ( selectAmount == _arrLanguages.length - 1 ){
                _addButton.css( 'display', 'none' );
            }
        },
        _fillSelects = function(){

            var values = [];

            $.each( _obj.find( 'select' ), function( i ) {
                values[ i ] = parseInt( this.value );
            } );

            $.each( _obj.find( 'select' ), function( i ) {

                var curSelect = $( this );

                curSelect.find( 'option:not(:first)').remove();

                $.each( _arrLanguages, function() {
                    var curLanguage = this,
                        curLanguageID = curLanguage.id,
                        checker = false;

                    $.each( values, function(j){
                        if( curLanguageID == this ) {
                            checker = true;

                            if ( i == j ) {
                                curSelect.append( '<option value="' + curLanguageID + '" data-src="' + curLanguage.src + '" selected>' + curLanguage.name + '</option>' );
                            }

                            return false;
                        }
                    } );

                    if( !checker ) {
                        curSelect.append( '<option value="' + curLanguageID + '" data-src="' + this.src + '">' + this.name + '</option>' );
                    }

                } );

            } );

        },
        _init = function () {
            _addEvents();
            _fillSelects();
        },
        _initNewSelect = function( select ){
            selects2[ selects2.length ] = new AresSelect2( {
                obj: select,
                optionType: 1,
                showType: 2,
                selects: selects2
            } );
        },
        _removeSelect = function( parent ){
            var selectID = _obj.find( 'select' ).index( parent.find( 'select' ) );
            selects2.splice( selectID, 1 );
            parent.remove();
            _fillSelects();
            _addButton.css( 'display', 'inline-block' );
        };

    _init();
};