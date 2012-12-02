;
Play.Dialog = function() {
	
	var _init = false;
		
	var _dialog = jQuery( "#dialog" );
	
	var _open = null;
	
	_dialog.detach();
	
	jQuery( "#wrapper" ).append( _dialog );
	
	return {
		
		close: function() {
			
			_dialog.hide();
			
			return this;
		},
		
		init: function() {
			
			var that = this;
			
			_init = true;
			
			jQuery( "button, .close", _dialog ).mousedown( function() {
				return false;
			} );
			
			jQuery( ".add", _dialog ).click( function() {
				_open.addSongs();
				_open.clearSelected();
			} );
			
			jQuery( ".cancel, .close", _dialog ).click( function() {
				that.close();
			} );
			
			jQuery( "#dialog" ).draggable( { 
				handle: "h2", 
				cursor: "move" 
			} );
			
			jQuery( ".navigation a", jQuery( "#dialog" ) ).click( function() {
				that.navigationHandler( jQuery( this ) );
			} );
			
			jQuery( ".contentWrapper", _dialog ).mouseWheelHScroll( { stepWidth: 200 } );
			
			return this;
		},
		
		navigationHandler: function( element ) {
			
			jQuery( ".navigation a", jQuery( "#dialog" ) ).removeClass( "active" );
			
			element.addClass( "active" );
			
			if( element.hasClass( "list" ) ) {
				
				_open.getArtists();
				
				jQuery( ".listElement", jQuery( "#dialog" ) ).show();
				jQuery( ".youtubeElement", jQuery( "#dialog" ) ).hide();
				
			} else {
				
				_open.initYoutube();
				
				jQuery( ".listElement", jQuery( "#dialog" ) ).hide();
				jQuery( ".youtubeElement", jQuery( "#dialog" ) ).show();
			}			
		},
		
		open: function() {
			
			if ( _init == false ) {
				this.init();
			}
			
			this.position();
			
			_dialog.show();
			
			return this;
		},
		
		position: function() {
			
			_dialog.css( {
				left: Play.Layout.content.width / 2 - _dialog.width() / 2
			} );
		
			return this;
		},
		
		setOpen: function( open ) {
			_open = open;
		}
	};
};