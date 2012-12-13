define(function(require) {
    var $ = require('jquery');
	var GuessNumber = require("./GuessNumber");

	var guess = new GuessNumber(201212);

	//guess.setNumberScopeWithNumberLength(2);
	//document.getElementById("showNumber").value = guess.getGuess();

	var min = Math.round(new Date(0).getTime() / (1000*3600*24));
	var max = Math.round(new Date().getTime() / (1000*3600*24));
	var type = 2; //1 代表数字；2 代表日期
	function resultToString(num, type) {
		if(type === 1) {
			return num;
		} else if (type === 2) {
			var tmp = new Date(num * 1000 * 3600 * 24);
			return tmp.getFullYear()+"年"+(tmp.getMonth()+1)+"月"+tmp.getDate()+"日";
		}
	}
	guess.start(min, max);
	document.getElementById("showNumber").value = resultToString(guess.getGuess(), 2);
	//alert("Scope："+guess._numberScope+"，Max："+guess._maxNumber+"，Min："+guess._minNumber+"，Now："+guess._nowNumber+"，Count："+guess._count);
	$("#maxButton").click(function(){
		guess.toSmaller();
		document.getElementById("showNumber").value = resultToString(guess.getGuess(), 2);
	});

	$("#minButton").click(function(){
		guess.toLarger();
		document.getElementById("showNumber").value = resultToString(guess.getGuess(), 2);
	});

})
