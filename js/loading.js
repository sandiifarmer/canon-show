define(function(){

function Loading( opt ){
	this.opt = opt || {};
	this.success = this.opt.success || function(){};
	this.html =
	'<div class="loading-box full">'
	+'	<div class="loading-preload"></div>'
	+'	<div class="loading-wrap center">'
	+'		<div class="loading-pic"></div>'
	+'		<div class="loading-bar">'
	+'			<div class="loading-inner full trans02"></div>'
	+'		</div>'
	+'		<div class="loading-text">加载中.. 0%</div>'
	+'	</div>'
	+'</div>';
	this.beginMoment = new Date().getTime();
	this.MINSPAN = 1500;

	this._run();
}

Loading.prototype = {

	_run : function(){
		var self = this;
		$( document.body ).append( self.html );
		self._append();
	},

	_append : function(){
		var self = this;
		var src = window.cfg.preload;
		var len = src.length;
		for(var i = 0; i < len; i++){
			var html = '<img class="preload" src="" data-src="'+ src[i] +'">';
			$('.loading-preload').append( html );
		}
		self._preloadImg();
	},

	_preloadImg : function(){
		var self = this;
		var img = $('.preload');
		var len = img.length;
		var loaded = 0;
		img
			.on("load", function(e){
	            loaded++;
	           	process();
	            if( loaded == len ) self._done();
	        })
	        .on("error", function(e){
	            loaded++;
	            error( this );
	            if( loaded == len ) self._done();
	        })
	        .each(function(i){
	            $(this).attr({ src : $(this).attr("data-src") });
	        });

        function process(){
        	var ratio = Math.round( loaded / len * 100 ) + "%";
        	$('.loading-inner').css({width : ratio});
        	$('.loading-text').text( '加载中.. ' + ratio );
       	}
        function error( img ){
        	var src = $( img ).attr("data-src");
        	console.log( "Load resource fail : " + src ); 
        }
	},

	_done : function(){
		var self = this;
		self._setLag( exek );
		function exek(){
			self.opt.success();
	    	setTimeout(function(){
	    		$('.loading-box').remove();
	    	}, 500);
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
	}

};

return Loading;

});