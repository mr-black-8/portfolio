$(document).ready( function() {

  $('#1').typeAppend('var Michael = {', function(){
    $('#2').typeAppend('about: function() {', function(){
      $('#3').typeAppend('if( currentUser.approved === true ) {', function(){
        $('#4').typeAppend('display( awsomeBlurb );', function(){
          $('#5').typeAppend('} else {', function(){
            $('#6').typeAppend('display( "currentUser not yet approved" )', function(){
              $('#7').typeAppend('}', function(){
                $('#8').typeAppend('},')
              })
            })
          })
        })
      })
    })
  })

  $('#9').typeAppend('gallery: function() {', function(){
    $('#10').typeAppend('for( var i = 0; i < projects.length; i++ ) {', function(){
      $('#11').typeAppend('if( projects[i].complete ) {', function(){
        $('#12').typeAppend('display( projects[i] );', function(){
          $('#13').typeAppend('} else {', function(){
            $('#14').typeAppend('display( "Michael, finish off " + projects[i].name + " already!" );', function(){
              $('#15').typeAppend('}', function(){
                $('#16').typeAppend('}', function(){
                  $('#17').typeAppend('},', function(){
                    $('.notepad span').each(function(i, block){
                      hljs.highlightBlock(block);
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  })

  $('#18').typeAppend('contact: function() {', function(){
    $('#19').typeAppend('if( currentUser.approved === true ) {', function(){
      $('#20').typeAppend('display( contactDetails );', function(){
        $('#21').typeAppend('} else {', function(){
          $('#22').typeAppend('display( "currentUser not yet approved" );', function(){
            $('#23').typeAppend('}', function(){
              $('#24').typeAppend('}', function(){
                $('#25').typeAppend('};')
              })
            })
          })
        })
      })
    })
  })

  $('#menuBtn').on('click', function(){
    if($('.menu').css('left') == '0px') {
      hideMenu();
    } else {
      showMenu();
    }

  });

  $('.exitBtn').on('click', function(){
    clearSplash();
  });

  $('#aboutBtn').on('click', function(){
    clearSplash();
    $('.splash-about').css('display', 'flex');
    hideMenu();
  });
  $('#projectsBtn').on('click', function(){
    clearSplash();
    $('.splash-projects').css('display', 'flex');
    $('.projectsCar').slick('setPosition');
    hideMenu();
  });
  $('#contactBtn').on('click', function(){
    clearSplash();
    $('.splash-contact').css('display', 'flex');
    hideMenu();
  });

  $('.main').resize( checkLines );


  $('.projectsCar').slick({
    arrows: true,
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true
  });

  $('input').on('keypress', function(e){
    if(e.which === 13) {
      var input = this.value
      switch (this.value) {
        case 'Michael.about()':
          this.value = '';
          $('.splash-about').css('display', 'flex');
          break;
        case 'Michael.gallery()':
          this.value = '';
          $('.splash-projects').css('display', 'flex');
          $('.projectsCar').slick('setPosition');
          break;
        case 'Michael.contact()':
          this.value = '';
          $('.splash-contact').css('display', 'flex');
          break;
        default:

      }
    }
  })

});

function checkLines() {
  padHeight = $('.lineNums').css('height');
  lines = parseInt(padHeight) / 22;
  $('.lineNums').text('');
  for(var i = 1; i <= lines; i++) {
    $('.lineNums').append(i + ' ');
  }
}

function clearSplash() {
  $('.splash-about').css('display', 'none')
  $('.splash-projects').css('display', 'none')
  $('.splash-contact').css('display', 'none')
}

function showMenu() {
  $('.menu').css('left', '0px');
  $('#menuBtn').removeClass('fa-bars fa-2x').addClass('fa-times fa-2x');
}

function hideMenu() {
  $('.menu').css('left', '-150px');
  $('#menuBtn').removeClass('fa-times fa-2x').addClass('fa-bars fa-2x');
}
