define("GuessNumber/main/1.0.1/GuessNumber-debug", [], function(require, exports, module){
	/**
	* numberScope 需要猜测的数字范围
	*/
	function GuessNumber(numberScope){
		this._maxNumber = -1; // 猜测范围中，最大的数
		this._minNumber = 0; // 猜测范围中，最小的数
		this._nowNumber = -1; // 目前猜测出来的数
		this._count = 0;  // 需要猜测的次数
		this._times = 0;  // 猜测的次数
		this._result = 0; // 猜测结果
		this._complete = false; // 猜测是否完成
		this._success = false; // 猜测是否成功。
	
		this.setNumberScope(numberScope); //设置猜数范围，这里默认从0开始.

	}
	
	GuessNumber.prototype = {
		constructor: GuessNumber,
	
		//设置数字范围
		setNumberScope: function(numberScope){
			if(numberScope < 0){
				alert("数字范围不能小于0！");
				return;
			}
			this._numberScope = numberScope;
			this.start(this._minNumber, numberScope);
		},
	
		//根据数字长度，设定数字访问
		setNumberScopeWithNumberLength: function(numLength){
			this.setNumberScope(Math.pow(10, numLength));
		},

		// 设置最小的数
		setMinNumber: function(minNumber) {
			this.start(minNumber);
		},
	
		//开始游戏，初始化一些必要的数据。主要是为方便重新设定最小值。所以将最小值作为第一个参数
		start: function(minNumber, maxNumber) {
			var inMinNum = this._minNumber;
			var inMaxNum = this._numberScope;
			this._minNumber = -1;
			this._maxNumber = 1;

			// 当minNumber为0时，需要特殊处理一下。
			var minNumberStr = minNumber + ""; 
			if (minNumberStr != "") {
				inMinNum = minNumber;
			}

			if (maxNumber) {
				inMaxNum = maxNumber;
				this._numberScope = maxNumber;
			}
			
			this._complete = false;
			this._success = false;
			this._times = 0;
			
			this.changeFields(inMaxNum, inMinNum);
			this.setCount();
		},

		// 计算所需猜测的次数
		setCount: function() {
			this._count = Math.ceil(Math.log(this._maxNumber - this._minNumber) / Math.log(2)) + 1;
		},

		// 获取总的猜测次数
		getCount: function() {
			if (this._count === 0) {
				this.setCount();
			}
			return this._count;
		},
	
		//猜测的数字太小，调大数字
		toLarger: function(){
			this.changeFields(this._maxNumber, this._nowNumber);
		},
	
		//猜测的数字太大，调小数字
		toSmaller: function(){
			this.changeFields(this._nowNumber, this._minNumber);
		},
	
		//计算数字大小，修改相应值
		changeFields: function(maxNumber, minNumber){

			if(maxNumber <= minNumber || maxNumber == this._minNumber + 1) {
				if(!this._complete) {
					this.complete();
				}				
				return;
			}
			if(this._maxNumber !== maxNumber) {
				this._maxNumber = maxNumber;
			}
	
			if(this._minNumber !== minNumber) {
				this._minNumber = minNumber;
			}
	
			this._nowNumber = Math.round((this._maxNumber + this._minNumber) / 2);
			this._times ++;
		},
	
		//提前完成猜数
		complete: function() {
			this._complete = true;
			if (this._maxNumber === this._minNumber) {
				this._success = true;
				this._result = this._maxNumber;
			} else if (this._maxNumber < this._minNumber) {
				this._success = false;
				this._result = "Sorry! I failed.";
			} else {
				this._success = true;
				this._result = this._nowNumber = Math.round((this._maxNumber + this._minNumber) / 2);
				if (this._nowNumber == this._minNumber + 1) {
					this._nowNumber = this._minNumber;
				}
			}
		},
	
		//获取结果
		getResult: function() {
			if(!this._success) {
				return "Sorrry! I failed.";
			}
			return this._result;
		},

		// 获取猜测的数
		getGuess: function() {
			if(this._nowNumber == this._minNumber) {
				return Math.round((this._maxNumber + this._minNumber) / 2);
			}
			return this._nowNumber;
		},
		
		//获取猜测次数
		getTimes: function() {
			if(this._times === 0) {
				this.start();
			}
			return this._times;
		},
	
		//显示结果，因为闭包问题。这个方法不能使用
	//	join: function(textId, maxButtonId, minButtonId){
	//		document.getElementById(textId).value = this._nowNumber;
	//		var smaller = this.toSmaller;
	//		//document.getElementById(maxButtonId).attachEvent("onclick", function(){
	//		document.getElementById(maxButtonId).onclick = this.toSmaller;
	//	//	document.getElementById(maxButtonId).onclick = function(){
	//	//		smaller();
	//	//		document.getElementById(textId).value = this._nowNumber;
	//	//	};
	//		//document.getElementById(minButtonId).attachEvent("onclick", function(){
	//		document.getElementById(minButtonId).onclick = this.toLarger;
	//	//	document.getElementById(minButtonId).onclick = function(){
	//	//		this.toLarger();
	//	//		document.getElementById(textId).value = this._nowNumber;
	//	//	};
	//
	//		document.getElementById(textId).value = this._nowNumber;
	//
	//	}
	}

	module.exports = GuessNumber;
});

define("GuessNumber/main/1.0.1/main-debug", ["./GuessNumber-debug", "gallery/jquery/1.8.2/jquery-debug"], function(require) {
    var $ = require('gallery/jquery/1.8.2/jquery-debug');
	var GuessNumber = require('./GuessNumber-debug');
	
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
	
	function showResult() {
		if(guess._complete){
			// 为了简化处理结果，把结果展示暂时写到这里。
			if(guess._success) {
				alert("您猜测的结果是：" + formatResult(guess.getGuess(), type));
			} else {
				alert("猜测失败。要不，咱试试其他的？");
			}
			
			return;
		}
		document.getElementById("showNumber").value = formatResult(guess.getGuess(), type);
		document.getElementById("showTimes").innerHTML = guess.getTimes();
		document.getElementById("showCount").innerHTML = guess.getCount();
	}

	var guess = new GuessNumber(100);

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
	showResult();

	$("#guessType").change(function(){
		type = $(this).val();
		guess.start(scopeArr[type].min, scopeArr[type].max);
		showResult();
	});
	//alert("Scope："+guess._numberScope+"，Max："+guess._maxNumber+"，Min："+guess._minNumber+"，Now："+guess._nowNumber+"，Count："+guess._count);
	$("#maxButton").click(function(){
		guess.toSmaller();
		showResult();
	});

	$("#minButton").click(function(){
		guess.toLarger();
		showResult();
	});
	
	$("#initButton").click(function(){
		guess.start(scopeArr[type].min, scopeArr[type].max);
		showResult();
	});
});