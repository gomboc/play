;

// YouTube player's state values
var UNSTARTED = -1;
var ENDED 	  =  0;
var PLAYING   =  1;
var PAUSED 	  =  2;
var BUFFERING =  3;
var VUDEOCUED =  5;

function onYtPlayerStateChange( newState ) {
	
	if ( newState == ENDED ) {
		Play.Player.stop().next();
	}
};

Play.Player = (function() {

	var _controllsContainer;
	
	var _open;
	
	var _playlist = new Play.player.Playlist();
	
	var _playTimerId = 0;
	
	var _sequence = 0;
	
	var _seekSlider;
	
	var _seekSliderSliding = false;
	
	var _volume = new Play.player.Volume();
		
	var _ytPlayer;

	return {
		
		_debug: function() {
			return {
				_controllsContainer: _controllsContainer,
				_playlist: _playlist,
				_playTimerId: _playTimerId,
				_sequence: _sequence,
				_ytPlayer: _ytPlayer
			};
		},
		
		bindEvents: function() {
		
			if ( _ytPlayer ) {
				
				var that = this;
							
				jQuery( ".prev", _controllsContainer ).click( function() {
					that.prev();
					return false;
				});
			
				jQuery( ".play", _controllsContainer ).click(function() {
					that.play();
					return false;
				});
				
				jQuery( ".pause", _controllsContainer ).click( function() {
					that.pause();
					return false;
				});
				
				jQuery( ".stop", _controllsContainer ).click( function() {
					that.stop();	
					return false;
				});
				
				jQuery( ".next", _controllsContainer ).click( function() {
					that.next();
					return false;
				});
				
				jQuery( ".open", _controllsContainer ).click( function() {
					_open.open();
				});
				
				jQuery( ".controll", _controllsContainer ).mousedown( function() { 
					return false; 
				});
				
			}
			
			return this;
		},
		
		cueVideo: function() {
			
			if( _ytPlayer.getPlayerState() != PAUSED ) {
				_ytPlayer.cueVideoById( _playlist.getSong( _sequence ).videoId, 0 );
			}
			
			return this;
		},
		
		displayInfo: function() {
			
			jQuery( ".title", _controllsContainer ).html( "" ).append(
				jQuery( "<p>", {
					text: _playlist.getSong( _sequence ).title
				}),
				jQuery( "<p>", {
					"class": "artist",
					text: _playlist.getSong( _sequence ).artist
				})
			);
			
			return this;
		},
		
		getPlaylist: function() {
			return _playlist;
		},
		
		getYtPlayer: function() {
			return _ytPlayer;
		},
		
		getVolume: function() {
			return _volume;
		},
		
		init: function() {
		
			var that = this;
			
			_open = new Play.player.Open();
			
			_controllsContainer = jQuery( "#controlls" );
			_ytPlayer = jQuery( "#ytPlayer" ).get( 0 );
						
			_seekSlider = jQuery(".seekSlider", _controllsContainer).slider( {
				change: function( event, ui ) {
					if ( event.originalEvent != undefined && event.originalEvent.type == "mouseup" ) {
						that.seekTo( ui.value );
					}
				},
				start: function() {
					_seekSliderSliding = true;
				},
				stop: function() {
					_seekSliderSliding = false;
				}
			} );

			this.loadPlaylist()
				.bindEvents()
				.ytEventHandler();
		},

		loadPlaylist: function() {
			
			_playlist.load();	
			
			return this;
		},		
		
		next: function() {
			
			if( _sequence + 1 < _playlist.getNoSongs() ){
				_sequence = _sequence + 1;
			}else{
				_sequence = 0;	
			}
			
			this.play();
			
			return this;
		},
		
		pause: function() {

			if ( _ytPlayer.getPlayerState() == 1 ) {
				_ytPlayer.pauseVideo();
			}
			
			return this;
		},
		
		play: function() {
		
			var that = this;

			this.cueVideo();
						
			_ytPlayer.playVideo();

			_volume.setVolume( _playlist.getSong( _sequence ).rg );

			_playTimerId = setInterval( this.playTimer, 500 );
			
			_playlist.highlightSong( _sequence );
			
			this.displayInfo();
			
			return this;
		},
		
		playTimer: function() {
			
			if ( _ytPlayer.getPlayerState() == 1 ) {
				
				var time = _ytPlayer.getCurrentTime();
				
				if ( !_seekSliderSliding ) {
					_seekSlider.slider( "value", 100 * _ytPlayer.getCurrentTime() / _ytPlayer.getDuration() );
				}
				
				jQuery( ".time", _controllsContainer ).text( general.utils.formatTime( time ) );
			}
			
			return this;
		},
		
		playTimerClear: function() {
			
			clearInterval( _playTimerId );
			
			jQuery( ".time", _controllsContainer ).text( "00:00" );
			
			return this;
		},

		prev: function() {
			
			if ( _sequence != 0 ) {
				_sequence = _sequence - 1;
			}
			this.play();
			
			return this;
		},
				
		seekTo: function( seekPercent ) {
	
			_ytPlayer.seekTo( seekPercent * _ytPlayer.getDuration() / 100, true );
			
			return this;
		},
		
		seekSliderReset: function() {
			
			_seekSlider.slider( "value", 0 );
			
			return this;
		},
		
		setSequence: function( sequence ) {
			
			_sequence = sequence;
			
			return this;
		},
	
		stop: function() {
			
			_ytPlayer.stopVideo();
			_ytPlayer.clearVideo();
			
			this.playTimerClear()
				.seekSliderReset();
			
			_state = "stop";
			
			return this;
		},
		
		ytEventHandler: function() {

			_ytPlayer.addEventListener( "onStateChange", "onYtPlayerStateChange" );
						
			return this;
		}
	};
}());
