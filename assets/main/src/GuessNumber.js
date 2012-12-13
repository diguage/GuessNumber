define(function(require, exports, module){
	/**
	* numberScope 需要猜测的数字范围
	*/
	function GuessNumber(numberScope){
		this._maxNumber = -1; // 猜测过程中，可能最大的数
		this._minNumber = 0; // 猜测过程中，可能最小的数
		this._nowNumber = -1; // 目前猜测出来的数
		this._count = 0;  // 需要猜测的次数
		this._times = 0;  // 猜测的次数
		this._result = 0; // 猜测结果
		this._complete = false; // 猜测是否完成
		this._success = false; // 猜测是否成功。
	
		this.setNumberScope(numberScope);

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

			if (minNumber) {
				inMinNum = minNumber;
			}

			if (maxNumber) {
				inMaxNum = maxNumber;
			}

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
			if(this._complete && maxNumber <= minNumber) {
				this.complete();
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
				this._result = this._nowNumber;
			}
		},
	
		//获取结果
		getResult: function() {
			if(!this._success) {
				return "Sorrry! I failed."
			}
			return this._result;
		},

		// 获取猜测的数
		getGuess: function() {
			return this._nowNumber;
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
