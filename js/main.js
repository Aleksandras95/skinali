(function ($)
  { "use strict"
    $("#before-after").twentytwenty({
        before_label: 'Be skinali',
        after_label: 'Su skinali'
    });
    $("#before-after-second").twentytwenty({
        before_label: 'Be skinali',
        after_label: 'Su skinali'
    });
    $("#before-after-third").twentytwenty({
        before_label: 'Be skinali',
        after_label: 'Su skinali'
    });
    $('#before-slider').slick({
        draggable: false,
        dots: true,
        dotsClass: 'before-slider__dots',
        prevArrow: $('.arrow-left'),
        nextArrow: $('.arrow-right')
    });
    //Menu 
    $('.menu-button').on('click', function () {
        $('.menu').toggleClass('menu_active')
      });
    //Select type
    $('.select_checked').on('click', function(){
        $('.select__dropdown').toggleClass('select__dropdown_open')
    });
    $('.select__option').on('click', function (){
        var value = $(this).attr('data-value');
        $('#select-type').val(value);
        $('#select_checked').text(value);
        $('.select__dropdown').toggleClass('select__dropdown_open')
    })
    //Scroll
    $("a[href^='#'").click(function (){
        var _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top -120 + "px"});
        return false;
    })
    //Modal
    $('.navbar__button').on('click', function () {
        $('.modal-wrapper, .modal-window').fadeIn();
      });
    $('.modal-wrapper').on('click', function () {
        $(this).fadeOut();
        $(this).children().fadeOut();
    });
    $('#modal-btn-close').on('click', function () {
        $('.modal-wrapper').fadeOut();
    });
    $('.modal-wrapper').children().on('click', function(e) {
        e.stopPropagation();
    });
    $('#thanks-btn-close').on('click', function () {
        $('.modal-wrapper').fadeOut();
    })
    //Validate
    $('[data-submit]').on('click', function(e) {
        e.preventDefault();
        $(this).parent('form').submit();
      })
      $.validator.addMethod("regex", function(value, element, regexp) {
        var re = new RegExp(regexp);
        return this.optional(element) || re.test(value);
      },
      "Please check your input."
      );
      
      function valEl(el) {
        el.validate({
          rules : {
            name : {
              required : true,
              regex : "[A-Za-z]"
            },
            email : {
              required : true
            },
            phone : {
              required : true,
              minlength : 9,
              maxlength : 12,
              regex : "[0-9]+"
            }
          },
          messages : {
            name : {
              required : 'Būtina įvesti vardą',
              regex : 'Įveskite vardą tinkamai'
            },
            email : {
              required : 'Būtina įvesti el. paštą',
              regex : 'Įveskite el. paštą tinkamai'
            },
            phone : {
              required : 'Būtina įvesti tel. numeri',
              regex : 'Įveskite tel. numeri tinkamai'
            }
          },
      
          submitHandler : function(form) {
            let $form = $(form);
            let $formId = $(form).attr('id');
            switch ($formId) {
              case 'modalForm' :
                $.ajax({
                  type: 'POST',
                  url: $form.attr('action'),
                  data: $form.serialize()
                })
                .done(function(){
                  console.log('Success');
                })
                .fail(function() {
                  console.log('Fail');
                })
                .always(function() {
                  setTimeout(function () {
                    $form.trigger('reset');
                    $('.modal-window').fadeOut();
                  }, 1000);
                  setTimeout( function(){
                    $('.modal-wrapper, .thanks-window').fadeIn();
                  }, 1400);
                });
                break;
            }
            return false;
          }
        })
      };
      $('.php-email-form').each(function(){
        valEl($(this));
      });
})(jQuery);