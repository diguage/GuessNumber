define("GuessNumber/main/1.0.1/GuessNumber",[],function(e,t,n){function r(e){this._maxNumber=-1,this._minNumber=0,this._nowNumber=-1,this._count=0,this._times=0,this._result=0,this._complete=!1,this._success=!1,this.setNumberScope(e)}r.prototype={constructor:r,setNumberScope:function(e){if(e<0){alert("数字范围不能小于0！");return}this._numberScope=e,this.start(this._minNumber,e)},setNumberScopeWithNumberLength:function(e){this.setNumberScope(Math.pow(10,e))},setMinNumber:function(e){this.start(e)},start:function(e,t){var n=this._minNumber,r=this._numberScope;this._minNumber=-1,this._maxNumber=1;var i=e+"";i!=""&&(n=e),t&&(r=t,this._numberScope=t),this._complete=!1,this._success=!1,this._times=0,this.changeFields(r,n),this.setCount()},setCount:function(){this._count=Math.ceil(Math.log(this._maxNumber-this._minNumber)/Math.log(2))+1},getCount:function(){return this._count===0&&this.setCount(),this._count},toLarger:function(){this.changeFields(this._maxNumber,this._nowNumber)},toSmaller:function(){this.changeFields(this._nowNumber,this._minNumber)},changeFields:function(e,t){if(e<=t||e==this._minNumber+1){this._complete||this.complete();return}this._maxNumber!==e&&(this._maxNumber=e),this._minNumber!==t&&(this._minNumber=t),this._nowNumber=Math.round((this._maxNumber+this._minNumber)/2),this._times++},complete:function(){this._complete=!0,this._maxNumber===this._minNumber?(this._success=!0,this._result=this._maxNumber):this._maxNumber<this._minNumber?(this._success=!1,this._result="Sorry! I failed."):(this._success=!0,this._result=this._nowNumber=Math.round((this._maxNumber+this._minNumber)/2),this._nowNumber==this._minNumber+1&&(this._nowNumber=this._minNumber))},getResult:function(){return this._success?this._result:"Sorrry! I failed."},getGuess:function(){return this._nowNumber==this._minNumber?Math.round((this._maxNumber+this._minNumber)/2):this._nowNumber},getTimes:function(){return this._times===0&&this.start(),this._times}},n.exports=r}),define("GuessNumber/main/1.0.1/main",["./GuessNumber","gallery/jquery/1.8.2/jquery"],function(e){function r(e,t){if(t==1){var n=new Date(e*1e3*3600*24);return n.getFullYear()+"年"+(n.getMonth()+1)+"月"+n.getDate()+"日"}var r=e+"",i=r.length,s="";for(var o=i;o>=0;o-=4){var u=o-4>0?o-4:0;s=r.substring(u,o)+s,o>4&&(s="-"+s)}return s}function i(){if(s._complete){s._success?alert("您猜测的结果是："+r(s.getGuess(),u)):alert("猜测失败。要不，咱试试其他的？");return}document.getElementById("showNumber").value=r(s.getGuess(),u),document.getElementById("showTimes").innerHTML=s.getTimes(),document.getElementById("showCount").innerHTML=s.getCount()}var t=e("gallery/jquery/1.8.2/jquery"),n=e("./GuessNumber"),s=new n(100),o=[{min:0,max:100,tip:""},{min:Math.round((new Date(0)).getTime()/864e5),max:Math.round((new Date).getTime()/864e5),tip:""},{min:Math.pow(10,10),max:2*Math.pow(10,10),tip:""}],u=0;s.start(o[u].min,o[u].max),i(),t("#guessType").change(function(){u=t(this).val(),s.start(o[u].min,o[u].max),i()}),t("#maxButton").click(function(){s.toSmaller(),i()}),t("#minButton").click(function(){s.toLarger(),i()}),t("#initButton").click(function(){s.start(o[u].min,o[u].max),i()})});