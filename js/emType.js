(function($){
  $.fn.typeAppend = function(string, callback) {
    // define delay variable with inital value randomized
    var delay = 500;

    // function to apend given character to given element
    function appendLetter(el, char) {
      el.append(char);
    }

    // Loop through string and set timeout to call appendLetter on each character, increasing the delay with each iteration
    for( i = 0; i < string.length; i++ ) {
      setTimeout(appendLetter, delay, this, string[i]);
      delay += (Math.random() * 100);
    }
    // set timeout for callback function with final delay value
    setTimeout(callback, delay);
    return //$(this);
  };

  $.fn.backspace = function(n, callback) {
    // define delay variable with inital value randomized
    var delay = 500;

    // function to remove the last character from the text value of a given element
    function removeLetter(el) {
      // set elements existing text value to variable 'content'
      var content = el.text();
      // slice content from index 0 to (length - 1), store in variable 'newContent'
      var newContent = content.slice(0, -1);
      // set element text value to equal newContent
      el.text(newContent);
    }
    // loop for n iterations, setting timeout to call removeLetter, increasing the delay with each iteration
    for( i = 0; i <= n; i ++ ) {
      setTimeout(removeLetter, delay, this);
      delay += (Math.random() * 200);
    }
    // set timeout for callback function with final delay value
    setTimeout(callback, delay);
    return $(this);
  };

  $.fn.typeExisting = function() {
    // run function for each element found by the jQuery selector this function was called on
    $(this).each(function(){
      // set jQuery object for current element to variable 'el'
      el = $(this);
      // set current elements text value to variable 'string'
      var string = el.text();
      // clear current elements text value
      el.text("");
      // define delay variable with initial value randomized
      var delay = 500;

      // function to append given character to given element
      function appendLetter(el, char) {
        el.append(char);
      }

      // Loop through string and set timeout to call appendLetter on each character, increasing the delay with each iteration
      for( i = 0; i < string.length; i++ ) {
        setTimeout(appendLetter, delay, el, string[i]);
        delay += (Math.random() * 200);
      }
    });
  };
}(jQuery));
