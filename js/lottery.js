define(['tip'], function(Tip){

function Lottery(){
	this.token = '';
	this.html =
	'<div class="lt-box full">'
	+'	<div class="shade"></div>'
	+'	<div class="lt-process center hide">'
	+'		<div class="lt-gift"></div>'
	+'		<div class="lt-dish"></div>'
	+'		<div class="lt-process-text">抽奖中...</div>'
	+'	</div>'
	+'	<div class="lt-no center hide">'
	+'		<div class="lt-btns">'
	+'			<div class="lt-again">再玩一次</div>'
	+'			<div class="lt-share">通知好友</div>'
	+'			<div class="lt-redirect"></div>'
	+'		</div>'
	+'	</div>'
	+'	<div class="lt-ok center hide">'
	+'		<p class="lt-title">获得精美奖品一份，请留下手机号</p>'
	+'		<input type="tel" name="lt-input" maxlength="11" autocomplete="off" class="lt-input">'
	+'		<p class="lt-phone hide"></p>'
	+'		<div class="lt-tip hide"></div>'
	+'		<div class="lt-text">'
	+'			<p class="lt-bt">领奖须知</p>'
	+'			<p class="lt-st">1、奖品包括风扇笔、屏幕擦、环保袋（随机发送），须凭中奖截屏领取，且每人限领1次；</p>'
	+'			<p class="lt-st">2、奖品请至当地<span class="white"> 佳能认证金牌店</span>领取；</p>'
	+'			<p class="lt-st">3、领奖时间：<span class="white">2015年7月4日至8月16日</span>（限周末领取）；</p>'
	+'			<p class="lt-st">4、细则未尽事宜，由主办方依诚信原则补充。</p>'
	+'		</div>'
	+'		<div class="lt-btns">'
	+'			<div class="lt-again hide">再玩一次</div>'
	+'			<div class="lt-submit">提交</div>'
	+'			<div class="lt-share hide">通知好友</div>'
	+'			<div class="lt-redirect"></div>'
	+'		</div>'
	+'	</div>'
	+'</div>';
	this.beginMoment = new Date().getTime();
	this.MINSPAN = 3000;

	this._run();
}

Lottery.prototype = {
	
	_run : function(){
		var self = this;
		$( document.body ).append( self.html );
		self._bind();
		self._process();
		self._getToken();
	},

	_bind : function(){
		var self = this;
		$('.lt-share').on('click', function(){
			window.modules.sound.hit();
			require(['share'], function(Share){ new Share(); });
		});
		$('.lt-again').on('click', function(){
			window.modules.sound.hit();
			window.modules.game.start();
			self._remove();
		});
		$('.lt-redirect').on('click', function(){
			window.modules.sound.hit();
			location = window.cfg.redirect;
		});
		$('.lt-submit').on('click', function(){
			window.modules.sound.hit();
			self._validatePhone();
		});
	},

	_process : function(){
		var self = this;
		$('.lt-process').removeClass('hide');
		$('.lt-no').addClass('hide');
		$('.lt-ok').addClass('hide');
	},

	_no : function(){
		var self = this;
		self._setLag( exek );
		function exek(){
			$('.lt-process').addClass('hide');
			$('.lt-no').removeClass('hide');
			$('.lt-ok').addClass('hide');
		}			
	},

	_ok : function(){
		var self = this;
		self._setLag( exek );
		function exek(){
			$('.lt-process').addClass('hide');
			$('.lt-no').addClass('hide');
			$('.lt-ok').removeClass('hide');
		}
	},

	_setLag : function( callback ){
		var self = this;
		var now = new Date().getTime();
		var marginTime = now - self.beginMoment;
		if( marginTime < self.MINSPAN ){
			setTimeout(function(){
				callback.call( self );
			}, self.MINSPAN - marginTime);
		}else{
			callback.call( self );
		}
	},

	_remove : function(){
		var self = this;
		$('.lt-box').remove();
	},

	_getToken : function(){
		var self = this;
		var url = window.cfg.request.getToken;
		$.get(url, function( data ){
			if( typeof data === 'string'){
				data = eval('(' + data +')');
			}
			if( data.code != 200 || !data.token ){
				self._no();
			}else{
				self.token = data.token;
				self._ok();
				self._setTitle();
			}
		});
	},

	_validatePhone : function(){
		var self = this;
		var input = $('.lt-input');
		var cellphone = $.trim( input.val() );
		if( !cellphone ){
			new Tip('请填写您的手机号', 1500);
		}else if( cellphone.length != 11 ){
			new Tip('手机号码格式不对', 1500);
		}else{
			self._sendPhone( cellphone );
		}
	},

	_sendPhone : function( cellphone ){
		var self = this;
		var tip = new Tip('提交中，请稍候..');
		var url = window.cfg.request.sendPhone;
		var param = {};
		param.token = self.token;
		param.cellphone = cellphone;
		$.post(url, param, function( data ){
			if( typeof data === 'string'){
				data = eval('(' + data +')');
			}
			tip.hide();
			if( data.code == 200 ){
				self._sendSuccess( cellphone );
			}else{
				self._no();
			}
		});
	},

	_sendSuccess : function( cellphone ){
		var self = this;
		$('.lt-input').addClass('hide');
		$('.lt-title').addClass('hide');
		$('.lt-tip').removeClass('hide');
		$('.lt-phone').text( '提交成功： ' + cellphone ).removeClass('hide');
		$('.lt-submit').addClass('hide');
		$('.lt-share').removeClass('hide');
		$('.lt-again').removeClass('hide');
	},

	_setTitle : function(){
		var self = this;
		// document.title = '我打小精灵得了'+ window.cfg.score +'分，还赢得了奖品，你可以吗？';
		document.title = '最萌舒压神器，“打”她还有礼啦？';
	}

};

return Lottery;

});