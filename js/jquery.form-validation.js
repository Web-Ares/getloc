( function(){

    $( function(){

        $.each( $('.discount__form'), function(){
            new FormValidation ( $(this) )
        } );

        $.each( $('.discount__form'), function(){
            new FormValidation ( $(this) )
        } );

    } );

    var FormValidation = function (obj) {

        var _obj = obj,
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

                        } );

                        if(_obj.find('.error').length ){
                            return false;
                        }else{
                            return true;
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

} )();