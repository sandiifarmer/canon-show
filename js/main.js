;(function(){

var staticPath = '../';

window.cfg = {
	request : {
		getToken : '/activity/r/getToken',
		sendPhone : '/activity/r/add'
	},
	request : {
		getToken : '../data/getToken.json',
		sendPhone : '../data/sendPhone.json'
	},

	preload : [
		staticPath + 'img/game-bg.jpg',
		staticPath + 'img/game-camera-1.png',
		staticPath + 'img/game-camera-2.png',
		staticPath + 'img/game-camera-3.png',
		staticPath + 'img/game-camera-4.png',
		staticPath + 'img/game-camera-5.png',
		staticPath + 'img/game-camera-6.png',
		staticPath + 'img/game-camera-7.png',
		staticPath + 'img/game-camera-8.png',
		staticPath + 'img/game-camera-9.png',
		staticPath + 'img/game-camera-10.png',
		staticPath + 'img/game-camera-11.png',
		staticPath + 'img/game-count-1.png',
		staticPath + 'img/game-count-2.png',
		staticPath + 'img/game-count-3.png',
		staticPath + 'img/game-ctrl.png',
		staticPath + 'img/game-elf-1.png',
		staticPath + 'img/game-elf-2.png',
		staticPath + 'img/game-flash.png',
		staticPath + 'img/game-mute.png',
		staticPath + 'img/game-time-up.png',
		staticPath + 'img/game-ready.png',
		staticPath + 'img/game-score.png',
		staticPath + 'img/game-sound.png',
		staticPath + 'img/game-timer.png',
		staticPath + 'img/game-intro-arrow.png',
		staticPath + 'img/game-intro-camera.png',
		staticPath + 'img/game-intro-hand.png',
		staticPath + 'img/lt-btn.png',
		staticPath + 'img/lt-no.png',
		staticPath + 'img/lt-ok.png',
		staticPath + 'img/lt-dish.png',
		staticPath + 'img/lt-gift.png',
		staticPath + 'img/orient-rotate.png',
		staticPath + 'img/ready-bg.jpg',
		staticPath + 'img/ready-intro.png',
		staticPath + 'img/ready-logo.png',
		staticPath + 'img/ready-start.png',
		staticPath + 'img/ready-title.png',
		staticPath + 'img/rs-blue.png',
		staticPath + 'img/rs-lottery.png',
		staticPath + 'img/rs-red.png',
		staticPath + 'img/rs-redirect.png',
		staticPath + 'img/share-arrow.png',
		staticPath + 'img/share-pic.jpg'
	],
	audio : {
		btn : staticPath + 'audio/btn.mp3',
		hit : staticPath + 'audio/hit.wav',
		bg : staticPath + 'audio/bg.mp3',
	},
	sharePic : staticPath + 'img/share-pic.jpg',
	redirect : 'http://www.canon.com.cn/specialsite/spshop2015/app/index.html',
	score : 0	
};
window.modules = {};

require.config({
	baseUrl : staticPath + 'js/',
	urlArgs : 't=' + ( new Date() ).getTime(),
	paths : {}
});

var main = {};
var pageName = $('#page-name').attr('data-page-name');

var u = navigator.userAgent;
var isMobile = !!u.match(/AppleWebKit.*Mobile.*/);
var isIframe = !(window.location.href === window.parent.location.href);
if( pageName === 'pc' && isMobile ) window.location = 'game.html';
if( pageName === 'game' && !isMobile && !isIframe ) window.location = 'pc.html';

// define(['touch.min'], function(){	
// 	main[ pageName ]();
// });
main['game'] = function(){

	require(['loading','sound','ready','game'], function(Loading, Sound, Ready, Game){
		window.modules.loading = new Loading({
			success : loadModules
		});
		function loadModules(){
			window.modules.sound = new Sound();
			window.modules.ready = new Ready();
			window.modules.game = new Game();
		}
	});
	require(['orient'], function(Orient){ new Orient('h'); });
	// require(['lottery'], function(Lottery){ new Lottery(); });
};

main['pc'] = function(){
	var html =
	'<div class="pc-box center">'
	+'	<iframe width="100%" height="100%" frameborder="0" scrolling="no" src="game.html"></iframe>'
	+'</div>';
	$( document.body ).append( html );
	document.title = '最萌舒压神器，“打”她还有礼啦？';
}
main[ pageName ]();

})();
	
