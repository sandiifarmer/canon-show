define(function(){

function Orient(ban){
	this.ban = ban;
	this.body = $( document.body );
	this.html =
	'<div class="orient-box full hide">'
	+'	<div class="orient-wrap center">'
	+'		<div></div>'
	+'		<p></p>'
	+'	</div>'
	+'</div>';

	this.run();
}

Orient.prototype = {

	run : function(){
		var self = this;
		self.body.append( self.html );

		if( self.ban == "h" ){
			self.check = self.banHorizontal;
			var key = "竖";
		}
		if( self.ban == "v" ){
			self.check = self.banVertical;
			var key = "横";
		}

		var text = "为了更好的体验，请使用"+ key +"屏浏览";
		$(".orient-wrap").children("p").text( text );

		self.check();
		return;
		window.onresize = function(){
			self.check();			
		};
	},

	banHorizontal : function(){
		var self = this;
		if( self.body.width() > self.body.height() ){
			self.show();
		}else{
			self.hide();
		}
	},

	banVertical : function(){
		var self = this;
		if( self.body.width() < self.body.height() ){
			self.show();
		}else{
			self.hide();
		}
	},

	show : function(){ $(".orient-box").removeClass("hide"); },

	hide : function(){ $(".orient-box").addClass("hide"); }

};

return Orient;

});