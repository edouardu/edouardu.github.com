
$(document).ready(function(){
	// FADETO.JS
	$.getScript('/static/js/jquery.text.fadeto.js', function () {
	    $(function () {
	      var
	        $demo = $('#titleright'),
	        strings = JSON.parse($demo.attr('data-strings')).targets,
	        randomString;

	      randomString = function () {
	        return strings[Math.floor(Math.random() * strings.length)];
	      };

	      $demo.fadeTo(randomString());
	      setInterval(function () {
	        $demo.fadeTo(randomString());
	      }, 3000);
	    });
	  });

	// OKHOVER.JS
	$.getScript('/static/js/okhover.min.js', function () {
  	$(function(){
    $('li').okhover({
        fadeIn: true,
        fadeOut: true,
        fadeInDuration: 5000,
        zIndex: 420,
        el: 'body'
    });
});
  });
})