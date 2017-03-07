define(['result'], function(Result){

function Game(){
	this.html =
	'<div class="game-box full hide">'
	+'	<div class="game-ctrl">'
	+'		<div class="game-timer"><div><div></div></div></div>'
	+'		<div class="game-score">0</div>'
	+'		<div class="game-sound"></div>'
	+'	</div>'
	+'	<ul class="game-ul center">'
	+'		<li><span></span><div></div><p></p></li>'
	+'		<li><span></span><div></div><p></p></li>'
	+'		<li><span></span><div></div><p></p></li>'
	+'		<li><span></span><div></div><p></p></li>'
	+'		<li><span></span><div></div><p></p></li>'
	+'		<li><span></span><div></div><p></p></li>'
	+'		<li><span></span><div></div><p></p></li>'
	+'		<li><span></span><div></div><p></p></li>'
	+'		<li><span></span><div></div><p></p></li>'
	+'		<li><span></span><div></div><p></p></li>'
	+'		<li><span></span><div></div><p></p></li>'
	+'	</ul>'
	+'</div>';
	this.setting = {
		MAXTIME : 20,
		ELFPRICE : 1
	};
	this.score = 0;
	this.playTimer = null;
	this.music = true;
	this.playing = false;

	this._run();
}

Game.prototype = {

	_run : function(){
		var self = this;
		$( document.body ).append( self.html );
		self._bind();
		self._bindMute();
	},

	_bind : function(){
		var self = this;
		var li = $('.game-ul').children('li');
		li.on('click', function(e){
			var elf = $( e.currentTarget ).children('span');
			if( !elf.hasClass('game-hittable') ) return;
			if( elf.hasClass('game-hit') ) return;
			elf.addClass('game-hit');
			self.score += self.setting.ELFPRICE;
			$('.game-score').text( self.score );
			if( self.music ) window.modules.sound.hit();

			self._flash( elf );
		});
	},

	_flash : function( elf ){
		var self = this;
		var flash = elf.siblings('p');
		flash.addClass('game-flash');
		setTimeout(function(){
			flash.removeClass('game-flash');
		}, 500);
	},

	_bindMute : function(){
		var self = this;
		var btn = $('.game-sound');
		btn.on('click', function(){
			self.music = self.music ? false : true;
			if( self.music ){
				btn.removeClass('game-mute');
				if( !self.playing ) return;
				window.modules.sound.bgPlay();
			}else{
				btn.addClass('game-mute');
				window.modules.sound.bgStop();
			}
		});
	},

	intro : function(){
		var self = this;
		self.show();

		var html = 
		'<div class="game-intro-box full">'
		+'	<div class="shade"></div>'
		+'	<div class="game-intro-wrap center">'
		+'		<div class="game-intro-arrow"></div>'
		+'		<div class="game-intro-camera"></div>'
		+'		<div class="game-intro-hand"></div>'
		+'		<div class="game-intro-text">'
		+'			<p>点击小精灵</p>'
		+'			<p>得分赢抽奖机会</p>'
		+'		</div>'
		+'	</div>'
		+'</div>';
		$( document.body ).append( html );
		var timer = setTimeout(function(){
			start();
		}, 3000);
		$('.game-intro-box').on('click', function(){
			start();
			clearTimeout( timer );
		});
		function start(){
			$('.game-intro-box').remove();
			self.start();
		}
	},

	start : function(){
		var self = this;		
		self._initTimer();
		self._initScore();				
		self._countDown();
	},

	_initTimer : function(){
		var self = this;
		var bar = $('.game-timer').children('div').children('div');
		bar.css({width : '100%'});
	},

	_initScore : function(){
		var self = this;
		self.score = 0;
		$('.game-score').text('0');
	},

	_countDown : function(){
		var self = this;
		var num = 3;
		var interval = 1000;

		self._countScreenShow();
		var timer = setInterval(function(){

			var className = num ? ('game-count-' + num) : 'game-ready';
			if( !num ) clearInterval( timer );
			num--;
			self._countScreenAddClass( className );
			
		}, interval);

		var timeout = interval * ( num + 2 );
		setTimeout(function(){
			self._countScreenHide();
			self._play();
			self._timer();
			self.playing = true;
			if( self.music ) window.modules.sound.bgPlay();
		}, timeout);
	},

	_countScreenShow : function(){
		var self = this;
		var html =
		'<div class="game-count-box full">'
		+'	<div class="shade"></div>'
		+'	<div class="game-count-inner center"></div>'
		+'</div>';
		$( document.body ).append( html );
	},

	_countScreenAddClass : function( className ){
		var self = this;
		$('.game-count-inner').addClass( className );
	},

	_countScreenHide : function(){
		var self = this;
		$('.game-count-box').remove();
	},

	_play : function(){
		var self = this;
		var elves = $('.game-ul').children('li').children('span');

		elves.addClass( 'trans05' );
		self._playFtn( elves, 1000, 1 );
		setTimeout(function(){
			elves.removeClass( 'trans05' );
			elves.addClass( 'trans03' );
			clearInterval( self.playTimer );
			self._playFtn( elves, 600, 1 );
		}, 6000);
		setTimeout(function(){
			elves.removeClass( 'trans03' );
			elves.addClass( 'trans04' );
			clearInterval( self.playTimer );
			self._playFtn( elves, 800, 2 );
		}, 13000);
	},

	_playFtn : function( elves, interval, maxShown ){
		var self = this;
		var len = elves.length;
		self.playTimer = setInterval(function(){

			var random = self._getRandom( len );
			var elf = $( elves[ random ] );
			self._doPlay( elf, interval );

			if( maxShown === 1 ) return;
			var random2 = self._getRandom( len, random );
			var elf2 = $( elves[ random2 ] );
			self._doPlay( elf2, interval );

		}, interval);
	},

	_getRandom : function(len, ban){
		var self = this;
		var random = Math.floor( Math.random() * len );
		if( ban === undefined ) return random;
		while( random === ban ){
			random = Math.floor( Math.random() * len );
		}
		return random;
	},

	_doPlay : function( elf, interval ){
		var self = this;
		elf
			.addClass('game-show')
			.addClass('game-hittable');
		setTimeout(function(){
			elf.removeClass('game-show');
		}, interval);
		setTimeout(function(){
			elf.removeClass('game-hittable');
		}, interval * 1.2);
		setTimeout(function(){
			elf.removeClass('game-hit');
		}, interval * 2);
	},

	_timer : function(){
		var self = this;
		var bar = $('.game-timer').children('div').children('div');
		var time = 0;
		var interval = 1000;
		var timer = setInterval(function(){

			var ratio = ( self.setting.MAXTIME - time ) / self.setting.MAXTIME * 100;
			var percent = Math.floor( ratio ) + '%';
			bar.css({width : percent});
			time++;
			if( time === self.setting.MAXTIME ){
				clearInterval( timer );
				bar.css({width : 0});
				self._end();
			}

		}, interval);
	},

	_end : function(){
		var self = this;
		clearInterval( self.playTimer );

		setTimeout(function(){
			self._countScreenShow();
			self._countScreenAddClass('game-time-up');
		}, 1000);

		setTimeout(function(){
			self._countScreenHide();
			self.playing = false;
			window.modules.sound.bgStop();
			window.cfg.score = self.score;
			new Result();
		}, 2000);
	},

	show : function(){
		var self = this;
		$('.game-box').removeClass('hide');
	},

	hide : function(){
		var self = this;
		$('.game-box').addClass('hide');
	}

};

return Game;

});