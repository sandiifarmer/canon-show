define(function(){

function Tip(text, timeout){
	this.html =
	'<div class="tip-box full">'
	+'	<div class="shade"></div>'
	+'	<div class="tip-wrap center">'
	+'		<span>'+ text +'</span>'
	+'	</div>'
	+'</div>';

	this._show();
	if( timeout ) this._autoHide( timeout );
}

Tip.prototype = {

	_show : function(){
		var self = this;
		$( document.body ).append( self.html );
	},

	hide : function(){
		var self = this;
		$(".tip-box").remove();
	},

	_autoHide : function( timeout ){
		var self = this;
		setTimeout(function(){
			self.hide();
		}, timeout);
	}
};

return Tip;

});