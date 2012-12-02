/**
 * jQuery ( mouse wheel horizontal scroll ) 1.0
 *  
 * mouse wheel horizontal scroll
 *
 * Copyright (c) 2011  Draško Gomboc
 * 
 * Requirements:
 * 	jquery-1.6.4.min.js
 * 
 * 
 */
;( function( jQuery ) {
	
	jQuery.fn.mouseWheelHScroll = function( options ) {
		
		var settings = {
			stepWidth: 1
		};

		var options = jQuery.extend( settings, options );

		var element;
		
		var event;

		
		function getDelta( event ) {

			var delta = event.detail ? event.detail : - event.wheelDelta;
			
			return delta > 0 ? 1 : -1;
		};
		
		
		function getEventName() {
			
			if ( jQuery.browser.mozilla ) {
				return "DOMMouseScroll";
			} else {
				return "mousewheel";
			}
		};
		
		
		function getStep() {
			
			var step = 0;
			
			if ( options.stepWidth > 0 ) {
				step = Math.ceil( element.scrollLeft() / options.stepWidth );
			}
			
			return step;
		};
		
		function setEvent( e ) {
			
			event = e ? e : window.event;
		};
		
		
		function preventDefault() {
			
			if ( event.stopPropagation ) {
				event.stopPropagation();
			}
			
			if ( event.preventDefault ) {
				event.preventDefault();
			}
			
			event.cancelBubble = true;
			event.cancel 	   = true;
			event.returnValue  = false;
		};
		
		
		function scroll( e ) {
			
			setEvent( e );
			
			element.scrollLeft( options.stepWidth * ( getStep() + getDelta( event ) ) );
			 
			preventDefault();
			
			return false;
		};
		
		
		return this.each( function() {  
		
			element = jQuery( this );

			element.get( 0 ).addEventListener( getEventName(), scroll, false);
			
			return false;
		}); 
	};

} )( jQuery );