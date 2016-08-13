var inputHistory = [];
var historyCount = 0;
var tempInput = '';

$(document).ready( function() {

  $('#1').typeAppend('var Michael = {', function(){
    $('#2').typeAppend('about: function() {', function(){
      $('#3').typeAppend('if( currentUser.approved === true ) {', function(){
        $('#4').typeAppend('display( awesomeBlurb );', function(){
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
    adaptiveHeight: true,
  });

  // up: 38
  // down: 40
  $('input').on('keydown', function(e){
    if(e.which === 8) {
      tempInput = tempInput.slice(0, -1);
    }

    if(e.which === 38) {
      e.preventDefault()
      if(inputHistory.length > 0) {
        if(historyCount < inputHistory.length) {
          historyCount += 1;
        }
        this.value = inputHistory[historyCount - 1];
      }
    }
    if(e.which === 40) {
      e.preventDefault()
      if(historyCount > 1) {
        historyCount -= 1
        this.value = inputHistory[historyCount - 1];
      } else if(historyCount === 1) {
        historyCount -= 1
        this.value = tempInput;
      } else {
        this.value = tempInput;
      }
    }
  });

  $('input').on('keypress', function(e){
    if(e.which > 30 && e.which < 127) {
      tempInput += e.key;
    }
    if(e.which === 13) {
      tempInput = '';
      inputHistory.unshift(this.value);
      historyCount = 0;
      var input = this.value.replace(/(;$)/, '');
      this.value = '';

      var scriptCheck = /(<script>)|([</>])/g.test(input);
      var sayCheck = /(^Michael\.say\(['"])/.test(input);
      var displayCheck = /(^display)/.test(input);

      if (scriptCheck) {
        showError('Don\'t try any funny business...');
      } else if (displayCheck) {
        showError('Access has been restricted');
      } else if (sayCheck) {
        input = input.replace(/(^Michael\.say\(['"])/, '');
        input = input.replace(/(['"]\)$)/, '')
        showSay(input);
      } else {
        switch (input) {
          case 'Michael.about()':
            $('.splash-about').css('display', 'flex');
            break;
          case 'Michael.gallery()':
            $('.splash-projects').css('display', 'flex');
            $('.projectsCar').slick('setPosition');
            break;
          case 'Michael.contact()':
            $('.splash-contact').css('display', 'flex');
            break;
          case 'Michael':
          case 'display':
          case 'awesomeBlurb':
          case 'currentUser':
          case 'projects':
          case 'contactDetails':
            showError('Access has been restricted');
            break;
          default:
            var msg = 'Uncaught ReferenceError: ' + input + ' is not defined'
            showError(msg);
            break;
        }
      }

      $('header img').css('display', 'none');
    }
  });
});

$(document).on('keydown', function(e){
  if (e.which === 27) {
    clearSplash();
  }
});

function checkLines() {
  padHeight = $('.noteContent').css('height');
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
  $('header img').css('display', 'none');
  $('.menu').css('left', '0px');
  $('#menuBtn').removeClass('fa-bars fa-2x').addClass('fa-times fa-2x');
}

function hideMenu() {
  $('.menu').css('left', '-150px');
  $('#menuBtn').removeClass('fa-times fa-2x').addClass('fa-bars fa-2x');
}

function showError(msg) {
  var $cross = $('<i class="fa fa-times-circle" aria-hidden="true"></i>')
  var text = document.createTextNode(msg);
  $('.console').html('');
  $('.console').append($cross, text);
  $('.console').css('color', 'maroon');
  $('.console').css('opacity', '1');
  window.setTimeout(function(){
    $('.console').css('opacity', '0');
  }, 5000);
  window.setTimeout(function(){
    $('.console').html('-');
  }, 6000);
}

function showSay(msg) {
  var $tick = $('<i class="fa fa-commenting" aria-hidden="true"></i>')
  var text = document.createTextNode(msg);
  $('.console').html('');
  $('.console').append($tick, text);
  $('.console').css('color', 'palegreen');
  $('.console').css('opacity', '1');
  window.setTimeout(function(){
    $('.console').css('opacity', '0');
  }, 5000);
  window.setTimeout(function(){
    $('.console').html('-');
  }, 6000);
}
