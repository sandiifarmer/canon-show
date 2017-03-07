define(function(){

function Share(){
	this.html =
	'<div class="share-box full">'
	+'	<div class="shade"></div>'
	+'	<div class="share-arrow"></div>'
	+'	<div class="share-text">'
	+'		<p>请点击右上角</p>'
	+'		<p>将它发送给指定朋友</p>'
	+'		<p>或分享到朋友圈</p>'
	+'	</div>'
	+'</div>';

	this._show();
}

Share.prototype = {

	_show : function(){
		var self = this;
		$(document.body).append( self.html );
		self._bind();		
	},

	_bind : function(){
		var self = this;
		$(".share-box").on("click", function(){
			self._remove();
		});
	},

	_remove : function(){
		var self = this;
		$(".share-box").remove();
	}
};

return Share;

});