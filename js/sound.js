define(function(){

function Sound(){
	this.html =
	'<div class="sound-box hide">'
	+'	<audio src="'+ window.cfg.audio.btn +'" id="sound-btn" preload></audio>'
	+'	<audio src="'+ window.cfg.audio.hit +'" id="sound-hit" preload></audio>'
	+'	<audio src="'+ window.cfg.audio.bg +'" id="sound-bg" preload loop></audio>'
	+'</div>';

	this._init();
}

Sound.prototype = {

	_init : function(){ $( document.body ).append( this.html ); },
	btn : function(){ this._play( 'sound-btn' ); },
	hit : function(){ this._play( 'sound-hit' ); },
	bgPlay : function(){ this._play( 'sound-bg' ); },
	bgStop : function(){ this._stop( 'sound-bg' ); },
	_play : function( id ){ document.getElementById( id ).play(); },
	_stop : function( id ){ document.getElementById( id ).pause(); }

};

return Sound;

});