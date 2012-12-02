;
Play.player.Volume = function() {
	
	var _volumeBase = 50;
	
	var _volumeLevel = 50;
	
	return {
		
		setMaxReplayGain: function( replayGain ) {
			
			_volumeBase = 100 / Math.pow( 10, ( replayGain / 20 ) );
		
			return this;
		},
		
		setVolume: function( replayGain ) {
			
			_volumeLevel = _volumeBase * Math.pow( 10, ( replayGain / 20 ) );		
console.log( _volumeLevel );		
			Play.Player.getYtPlayer().setVolume( _volumeLevel );
		}
		
		
	};
};