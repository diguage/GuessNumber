define(function(require) {
    var $ = require('jquery');
	var GuessNumber = require("./GuessNumber");

	var guess = new GuessNumber(201212);

	//guess.setNumberScopeWithNumberLength(2);
	document.getElementById("showNumber").value = guess.getGuess();

	alert("Scope："+guess._numberScope+"，Max："+guess._maxNumber+"，Min："+guess._minNumber+"，Now："+guess._nowNumber+"，Count："+guess._count);
	$("#maxButton").click(function(){
		guess.toSmaller();
		document.getElementById("showNumber").value = guess.getGuess();
	});

	$("#minButton").click(function(){
		guess.toLarger();
		document.getElementById("showNumber").value = guess.getGuess();
	});

})
