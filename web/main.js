'use strict';
 
 window.addEventListener('DOMContentLoaded', function () {
 	var selector = $('#selector').get(0);
 	$('#submit').click(function () {
 		var path = selector.options[selector.selectedIndex].value;
		$.getJSON(path, function( data ) {
			$('#output').get(0).textContent = JSON.stringify(data, undefined, '  ');
		});
 	});
 })
