(function(){
    'use strict';

    $(function(){
        
        $.each( $( '.search form' ), function(){
            new Autocomplete( $( this ) );
        } );
        
    });

    var Autocomplete  = function (obj) {
        this.obj = obj;
        this.input = obj.find('input[type=search]');

        this.init();
    };
    Autocomplete.prototype = {
        init: function () {
            var self = this;

            self.core = self.core();
            self.core.build();
        },
        core: function () {
            var self = this;

            return {
                addEvents: function () {
                    self.input.on({
                        'keyup': function(I){
                            switch(I.keyCode) {
                                case 13:
                                    self.obj.submit();
                                    $('.search__result').remove();
                                    break;
                                case 32:
                                case 27:
                                case 38:
                                case 40:
                                    break;
                                default:

                                    self.valueInput = $(this).val();
                                    var count = 0;
                                    if(self.valueInput.length>0){
                                        self.core.ajaxRequest($(this),self.valueInput.length);
                                    }else{
                                        if($(this).val()==''){
                                            $('.search__result').remove();
                                            self.suggestSelected = 0;
                                        }
                                    }
                                    break;
                            }

                        },
                        'keydown': function(I){
                            switch(I.keyCode) {
                                case 27:
                                    $('.search__result').remove();
                                    self.suggestSelected = 0;
                                    return false;
                                    break;
                                case 38:
                                case 40:
                                    I.preventDefault();
                                    if(self.countItems>0){
                                        self.core.keyActivate(I.keyCode);
                                        if(self.suggestSelected == self.countItems){
                                            self.suggestSelected = 0
                                        }
                                    }
                                    self.core.scrollNiceScroll();
                                    break;
                            }
                        }
                    });
                    $('html').click(function(){
                        $('.search__result').remove();
                        self.suggestSelected = 0;
                    });

                    $(document).on(
                        "click",
                        "body",
                        function( event ){
                            event = event || window.event;

                            if (event.stopPropagation) {
                                event.stopPropagation();
                            } else {
                                event.cancelBubble = true;
                            }
                        }
                    );
                    $(document).on(
                        "click",
                        ".search__result-item",
                        function(){
                            var curItem = $(this),
                                curText = curItem.text();
                            self.input.val(curText);
                            $('.search__result').remove();
                            self.suggestSelected = 0;
                            self.obj.submit();
                        }
                    );
                    $(document).on(
                        "keydown",
                        ".search__result-item",
                        function(I){
                            switch(I.keyCode) {
                                case 13:

                                    $(this).trigger('click');
                                    break;
                            }
                        }
                    );
                },
                declareVariables: function(){
                    self.request = new XMLHttpRequest();
                    self.suggestSelected = 0;
                },
                ajaxRequest: function(input,n){
                    var path = self.obj.attr('data-autocomplite');
                    self.request.abort();
                    self.request = $.ajax({
                        url: path,
                        data: 'value='+ input.val(),
                        dataType: 'json',
                        timeout: 20000,
                        type: "GET",
                        success: function (msg) {
                            var $new_arr = [],
                                count=0;
                            for (var key in msg) {
                                var val = msg[key];

                                if (input[0].value.length>0) {
                                    $new_arr.push(val) ;
                                }

                            }

                            if($new_arr.length){

                                $('.search__result').remove();
                                count=$new_arr.length;

                                var resultStr='<div class="search__result">';
                                for(var i=0;i<=count-1;i++){

                                    resultStr += '<div  class="search__result-item">'+$new_arr[i].caption+'</div>';
                                }
                                resultStr+='</div>';
                                if(!self.obj.find('.search__result').length==1){
                                    self.obj.append(resultStr);
                                }
                                self.countItems = $('.search__result-item').length;
                                self.core.addScroll();
                            }
                        },
                        error: function (XMLHttpRequest) {
                            if (XMLHttpRequest.statusText != "abort") {
                                alert("При попытке отправить сообщение произошла неизвестная ошибка. \n Попробуй еще раз через несколько минут.");
                            }
                        }
                    });

                    return false;
                },
                keyActivate: function(n){
                    $('.search__result-item').eq(self.suggestSelected-1).removeClass('active');

                    if(n == 40 && self.suggestSelected < self.countItems){
                        self.suggestSelected++;

                    }else if(n == 38 && self.suggestSelected > 0){
                        self.suggestSelected--;
                    }

                    if( self.suggestSelected > 0){
                        $('.search__result-item').eq(self.suggestSelected-1).addClass('active');
                        self.input.val( $('.search__result-item').eq(self.suggestSelected-1).text() );
                    } else {
                        self.input.val(self.valueInput);
                    }
                },
                addScroll: function(){
                    $('.search__result').niceScroll({
                        cursorcolor:"#ebebeb",
                        cursoropacitymin: "1",
                        cursorborderradius: "5px",
                        cursorborder: "none",
                        cursorwidth: "5px",
                        enablekeyboard: true
                    });
                },
                scrollNiceScroll: function(){
                    if($('.search__result-item').filter('.active').length){
                        if($('.search__result-item').filter('.active').position().top>=$('.search__result').innerHeight()){
                            $('.search__result').getNiceScroll(0).doScrollTop($('.search__result-item').filter('.active').position().top+$('.search__result-item').filter('.active').innerHeight(), -1);
                        }else if($('.search__result-item').filter('.active').position().top+$('.search__result-item').filter('.active').innerHeight()<=0) {
                            $('.search__result').getNiceScroll(0).doScrollTop($('.search__result-item').filter('.active').position().top + $('.search__result-item').filter('.active').innerHeight(), 1);
                        }
                    }

                },
                build: function () {
                    self.core.declareVariables();
                    self.core.addEvents();
                }
            };
        }
    };
    
})();

