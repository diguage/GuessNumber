define(function(require) {
    var $ = require('jquery');
	var GuessNumber = require("./GuessNumber");
	
	//格式化显示结果
	function formatResult(num, type) {
		if (type == 1) {
			var tmp = new Date(num * 1000 * 3600 * 24);
			return tmp.getFullYear()+"年"+(tmp.getMonth()+1)+"月"+tmp.getDate()+"日";
		} else {
			var numStr = num + "";
			var strLeng = numStr.length;
			var result = "";
			for(var i = strLeng; i >= 0; i -= 4) {
				var startIndex = i-4 > 0 ? i-4 : 0;
				result = numStr.substring(startIndex, i) + result;
				if(i > 4) {
					result = "-" + result;
				}
			}
			return result;
		}
	}

	var guess = new GuessNumber(201212);

	// 定义个猜数范围数组
	var scopeArr = [{min: 0, max: 100, tip: ""}, // 小试牛刀
					{min: Math.round(new Date(0).getTime() / (1000*3600*24)), 
						max: Math.round(new Date().getTime() / (1000*3600*24)), 
						tip: ""}, // 猜猜生日
					{min:Math.pow(10, 10), max: 2*Math.pow(10, 10), 
						tip: ""} // 猜猜手机号
				   ];

	var type = 0; //1 代表日期；其余代表数字

	guess.start(scopeArr[type].min, scopeArr[type].max);
	document.getElementById("showNumber").value = formatResult(guess.getGuess(), type);

	$("#guessType").change(function(){
		type = $(this).val();
		guess.start(scopeArr[type].min, scopeArr[type].max);
		document.getElementById("showNumber").value = formatResult(guess.getGuess(), type);
	});
	
	document.getElementById("showNumber").value = formatResult(guess.getGuess(), type);
	//alert("Scope："+guess._numberScope+"，Max："+guess._maxNumber+"，Min："+guess._minNumber+"，Now："+guess._nowNumber+"，Count："+guess._count);
	$("#maxButton").click(function(){
		guess.toSmaller();
		document.getElementById("showNumber").value = formatResult(guess.getGuess(), type);
	});

	$("#minButton").click(function(){
		guess.toLarger();
		document.getElementById("showNumber").value = formatResult(guess.getGuess(), type);
	});

})
