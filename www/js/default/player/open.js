;
Play.player.Open = function() {	
	
	var _artistName = null;
	
	var _content = null;
	
	var _data = null;
	
	var _dialog = new Play.Dialog();

	var _init = false;
	
	return {

		addSong: function( element ) {
		
			Play.Player.getPlaylist().addSong( element.data() );
		},
		
		addSongs: function() {
		
			var that = this;
			
			jQuery( ".listContainer a.selected", jQuery( "#dialog" ) ).each( function() {
				that.addSong( jQuery( this ) );
			} );
		},
		
		clearListContainer: function() {
		
			jQuery( ".listContainer", jQuery( "#dialog" ) ).html( "" );
		},
		
		clearSelected: function() {
			
			jQuery( ".listContainer a.selected", jQuery( "#dialog" ) ).removeClass( "selected" );
		},
		
		displayArtists: function() {
			
			this.clearListContainer();
			
			if ( this.isDataFull() ) {
				
				var that = this;
				
				this.displayDataList();
				
				jQuery( "a", _content ).click( function() {

					that.loadArtistSongs( jQuery( this ).data( "id" ) )
						.setArtistName( jQuery( this ).data( "name" ) );
				} );
			}
		},
		
		displaySongs: function() {
			
			this.clearListContainer();
			
			if ( this.isDataFull() ) {
			
				var that = this;
				
				this.displayDataList()
					.songClickEvent();
			}
		},
		
		displayDataList: function() {
			
			var counter = 0;
			
			var list = null;
			
			_content = jQuery( ".content", jQuery( "#dialog" ) );
			
			jQuery.each( _data.data, function( key, row ) {
				
				if ( counter == 0 ) {				
					list = jQuery( "<ul>", {} );
				}
				
				list.append( jQuery( "<li>", {} ).html(
					jQuery( "<a>", {
						data: row,
						href: "javascript:void(0);",
						mousedown: function() {
							return false;
						},
						text: row.name,
						title: row.title
					} ) ) );
				
				counter++;
			
				if ( counter == 12 ) {
					jQuery( ".listContainer", _content ).append( list );
					counter = 0;
				}
			} );
			
			jQuery( ".listContainer", _content ).append( list, jQuery( "<div>", { "class": "brclear" } ) );
			
			jQuery( ".listContainer", _content ).width( jQuery( "ul", _content ).width() * jQuery( "ul", _content ).length );
			
			this.breadCumbsHandler();
			
			return this;			
		},
		
		getArtists: function() {
			
			var that = this;
		
			jQuery.ajax( { 
				data: {},
				success: function( data ) {

					_data = data;
					
					that.displayArtists();
				},
				type: "GET",
				url: "/music/artists/format/json"
			} );
		},
		
		loadArtistSongs: function( artistId ) {
			
			var that = this;
			
			jQuery.ajax( { 
				data: {
					artist: artistId
				},
				success: function( data ) {
					
					_data = data;
					
					that.displaySongs();
				},
				type: "GET",
				url: "/music/artist-songs/format/json"
			} );
			
			return this;
		},
		
		isDataFull: function() {
			
			return _data != null && _data.data != undefined && _data.data.length > 0;
		},
		
		isSelected: function( element ) {
			
			return element.hasClass( "selected" );
		},
		
		initYoutube: function() {
			
			jQuery( "#youtubeSearch" ).click( function() {
				
			} );	
			
		},
		
		breadCumbsHandler: function() {
			
			var that = this;
			
			var rootText = jQuery( ".breadcrumbs .root", jQuery( "#dialog" ) ).text();
			
			if ( _artistName == null ) {
				
				jQuery( "span.artist", jQuery( ".breadcrumbs", jQuery( "#dialog" ) ) ).remove();
				
				jQuery( ".breadcrumbs .root", jQuery( "#dialog" ) ).replaceWith(
					'<span class="root">' + rootText + '</span>'
				);
				
			} else {

				jQuery( ".breadcrumbs .root", jQuery( "#dialog" ) ).replaceWith(
					'<a class="root" href="javascript:void(0);">' + rootText + '</span>'
				);
				
				jQuery( ".breadcrumbs .root", jQuery( "#dialog" ) ).click( function() {
					that.getArtists();
				} ).mousedown( function() {
					return false;
				} );
			
				jQuery( ".breadcrumbs", jQuery( "#dialog" ) ).append( 
					jQuery( "<span>", {
						"class": "artist",
						text: " / " + _artistName
					} ) 
				);
				
				this.setArtistName( null );
			}
		},
		
		open: function() {

			if ( !_init ) {
				
				_dialog.setOpen( this );
				
				_init = true;
				
				var that = this;
				
				this.getArtists();
				
				jQuery( ".back", jQuery( "#dialog" ) ).click( function() {
					that.getArtists();
				} );
			}
			
			_dialog.open();
		},
		
		selectSong: function( element ) {
			
			element.addClass( "selected" );
		},
		
		setArtistName: function( artistName ) {
			
			_artistName = artistName;
			
			return this;
		},
		
		songClickEvent: function() {
			
			var that = this;
			
			jQuery( "a", _content ).click( function( event ) {
				
				if ( that.isSelected( jQuery( this ) ) && event.ctrlKey ) {

					that.unselectSong( jQuery( this ) );

				} else {
					
					if ( !event.ctrlKey ) {
						that.clearSelected();
					}
					
					that.selectSong( jQuery( this ) );
				}

				return false;	
				
			} ).dblclick( function() {
				
				that.addSong( jQuery( this ) );	
				
				that.clearSelected();
				
				return false;
			} );

			return this;
		},
		
		unselectSong: function( element ) {
			
			element.removeClass( "selected" );
		}
	};
};