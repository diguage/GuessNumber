define(function(require) {
    var $ = require('jquery');
	var GuessNumber = require("./GuessNumber");

	var guess = new GuessNumber(201212);

	guess.setNumberScopeWithNumberLength(2);
	guess.start();
	document.getElementById("showNumber").value = guess._nowNumber;

	alert("Scope："+guess._numberScope+"，Max："+guess._maxNumber+"，Min："+guess._minNumber+"，Now："+guess._nowNumber+"，Count："+guess._count);
	$("#maxButton").click(function(){
		guess.toSmaller();
		document.getElementById("showNumber").value = guess._nowNumber;
	});

	$("#minButton").click(function(){
		guess.toLarger();
		document.getElementById("showNumber").value = guess._nowNumber;
	});

})
