define(function(){

function Ready(){
	this.html =
	'<div class="ready-box full">'
	+'	<div class="ready-logo"></div>'
	+'	<div class="ready-title"></div>'
	+'	<div class="ready-start"></div>'	
	+'	<div class="ready-intro">'
	+'		<div></div>'
	+'		<p>1.赢得25分及以上，即可参与抽奖活动</p>'
	+'		<p>2.本活动仅限中国大陆地区</p>'
	+'		<p>3.奖品请至当地佳能认证金牌店领取</p>'
	+'		<p>4.活动时间：2015年7月4日开始</p>'
	+'		<p>5.细则未尽事宜，由主办方依诚信原则补充</p>'
	+'	</div>'
	+'</div>';

	this._run();
	this._setSharePic();
}

Ready.prototype = {

	_run : function(){
		var self = this;
		$( document.body ).append( self.html );
		self._bind();
	},

	_bind : function(){
		var self = this;
		$('.ready-start').on('click', function(){
			window.modules.sound.btn();
			self._remove();
			window.modules.game.intro();
		});
	},

	show : function(){
		var self = this;
		$('.ready-box').removeClass('hide');
	},

	_remove : function(){
		var self = this;
		$('.ready-box').addClass('hide');
	},

	_setSharePic : function(){
		var self = this;
		var html =
		'<div class="share-pic-box">'
		+'	<img src="'+ window.cfg.sharePic +'">'
		+'</div>';
		$( document.body ).append( html );
		document.title = '最萌舒压神器，“打”她还有礼啦？';
		// document.title = '2015佳能金牌店酷夏节';
	}

};

return Ready;

});