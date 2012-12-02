;
Play.player.Playlist = function() {
	
	var _container;
	
	var _noSongs;
	
	var _playlist;	
	
	return {
		
		addSong: function( data ) {
			
			var song = {
				artist: data.artist, 
				title: data.name,
            	videoId: data.code,
            	rg: null
			}; 
		
			_playlist.push( song );
	
			var sequence = parseInt( jQuery( "ul li a", this.getContainer() ).length );
			
			this.displaySong( sequence, song );
			
			this.calculateNoSongs();
			
		},
		
		calculateNoSongs: function() {
			
			_noSongs = _playlist.length;
		},
		
		displayPlaylist: function() {
		
			var that = this;
			
			if ( _playlist ) {
				
				var maxReplayGain = 0;
				
				jQuery.each( _playlist, function( sequence, song ){
					
					if ( maxReplayGain < song.rg ) {
						maxReplayGain = song.rg;
					}
					
					that.displaySong( sequence, song );
				});
				
				Play.Player.getVolume().setMaxReplayGain( maxReplayGain );
				
				this.initSortable();
			}
			
			return this;
		},
		
		displaySong: function( sequence, song ) {
			
			jQuery( "ul", this.getContainer() ).append(
				jQuery( "<li>", {
					html: jQuery( "<a>", {
						"class": "seq" + sequence,
						click: function(){
							Play.Player.setSequence( jQuery( this ).data().sequence ).play();
						},
						data: { 
							sequence: sequence,
							data: song
						},
						href: "javascript:void(0);",
						text: song.artist + " - " + song.title,
						title: song.artist + " - " + song.title
					} )
				} )
			);
		},
		
		getContainer: function() {
			
			if ( _container == undefined ) {
				_container = jQuery( "#playlist" );
			}
			
			return _container;
		},
		
		getNoSongs: function() {
			return _noSongs;
		},
		
		getPlaylist: function() {
			return _playlist;
		},
		
		getSong: function( sequence ) {
			return _playlist[sequence];
		},
		
		highlightSong: function( sequence ) {
			
			jQuery( "a", this.getContainer() ).removeClass( "active" );
			
			jQuery( ".seq" + sequence, this.getContainer() ).addClass( "active" );
			
			return this;
		},
		
		initSortable: function() {
			
			var that = this;
			
			jQuery( "ul", this.getContainer() ).sortable( {
				axis: "y",
				containment: "parent",
				helper: "clone",
				update: function() {
					that.reorder();
				}
			} );
			
		},
		
		load: function() {
			
			this.setPlaylist();
		
			this.calculateNoSongs();
			
			this.displayPlaylist();
		
			return this;
		},
		
		reorder: function() {
			
			var hasActiveClass = false;
			
			jQuery( "a", this.getContainer() ).each( function( sequence ) {
				
				if ( jQuery( this ).hasClass( "active" ) ) {
					hasActiveClass = true;
				}
				
				jQuery( this ).removeClass()
							  .addClass( "seq" + sequence )
							  .data( { sequence: sequence } );
				
				if ( hasActiveClass ) {
					jQuery( this ).addClass( "active" );
				}
				
				hasActiveClass = false;
				
				_playlist[sequence] = jQuery( this ).data( "data" );

			} );
			
			if ( jQuery( "a.active", this.getContainer() ).length > 0 ) { 
				Play.Player.setSequence( jQuery( "a.active", this.getContainer() ).data().sequence );
			}
		},
		
		setPlaylist: function() {
			
			_playlist = 
			[
			 	{
			 		artist: "Kiki Lesendric i Piloti", 
					title: "Prvi maj",
					videoId: "1UudSlFL2U4"
				}
			];
	
		}
		
	};
};