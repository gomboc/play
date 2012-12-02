;
general.utils = {
		
	formatTime: function( time ) {
	
		var min = Math.floor( time / 60 );
		var sec = Math.floor( time - min * 60 );
	
		var str = ( min < 10 ? "0" : "" ) + min + ":" + ( sec < 10 ? "0" : "" ) + sec;
		
		return str;
		
	}
};