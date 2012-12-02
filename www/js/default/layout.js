;
Play.Layout = (function(){
	
	return {
		
		content: {},
		
		header: {},
		
		footer: {},
		
		win: {},
		
		init: function() {

			this.initialDimensions()
				.windowDimensions()
				.resize()
				.windowResizeEvent();
			
			return this;
		},
		
		initialDimensions: function() {
			
			this.header = {
				height: jQuery( "#header" ).outerHeight()	
			};
			
			this.footer = {
				height: jQuery( "#footer" ).outerHeight()	
			};
			
			this.content = { 
				height: jQuery( "#content" ).height(),
				verticalPedding: jQuery( "#content" ).outerHeight() - jQuery( "#content" ).height(),
				width: jQuery( "#content" ).outerWidth()
			};
			
			return this;
		},
		
		resize: function() {
			
			var rawContentHeight = this.win.height - this.header.height - this.footer.height;
			
			var contentHeight = rawContentHeight < this.content.height ? this.content.height : rawContentHeight - this.content.verticalPedding

			jQuery( "#content" ).height( contentHeight );
			
			jQuery( "#playlist" ).height( contentHeight );
			
			return this;
		},
		
		windowDimensions: function() {
			
			this.win = { 
				height: jQuery( window ).height(),
				width:  jQuery( window ).width()
			};
			
			return this;
		},
		
		windowResizeEvent: function() {
			
			var that = this;
			
			jQuery( window ).resize( function() {
				
				that.windowDimensions()
				    .resize();
				
				Play.App.resizeLayout();
			});
			
			return this;
		}
	};	
})();