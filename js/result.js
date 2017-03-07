define(function(){

function Result(){
	this.PASS = 25;
	this.opt = !!(window.cfg.score >= this.PASS);
	this.html = 
	'<div class="rs-box full">'
	+'	<div class="shade"></div>'
	+'	<div class="rs-wrap center">'
	+'		<p>'+ window.cfg.score +'</p>'
	+'		<div class="rs-lottery"></div>'
	+'		<div class="rs-again">再玩一次</div>'
	+'		<div class="rs-share">通知好友</div>'
	+'		<div class="rs-redirect"></div>'
	+'	</div>'
	+'</div>';

	this._run();
	this._setTitle();
}

Result.prototype = {

	_run : function(){
		var self = this;
		$( document.body ).append( self.html );
		var className = self.opt ? 'rs-red' : 'rs-blue';
		$('.rs-box').addClass( className );

		self._bind();
	},

	_bind : function(){
		var self = this;
		$('.rs-lottery').on('click', function(){
			window.modules.sound.hit();
			self._remove();
			require(['lottery'], function(Lottery){ new Lottery(); });
		});
		$('.rs-again').on('click', function(){
			window.modules.sound.hit();
			window.modules.game.start();
			self._remove();
		});
		$('.rs-redirect').on('click', function(){
			window.modules.sound.hit();
			location = window.cfg.redirect;
		});
		$('.rs-share').on('click', function(){
			window.modules.sound.hit();
			require(['share'], function(Share){ new Share(); });
		});

	},

	_remove : function(){
		var self = this;
		$('.rs-box').remove();
	},

	_setTitle : function(){
		var self = this;
		// if( self.opt ){
		// 	document.title = '我打小精灵得了'+ window.cfg.score +'分，你能超过我吗？';
		// }else{
		// 	document.title = '我让小精灵跑了，谁能帮个忙？';
		// }
		document.title = '最萌舒压神器，“打”她还有礼啦？';
	}
};

return Result;

});