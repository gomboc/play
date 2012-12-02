;
function onYouTubePlayerReady() 
{
	new Play.Application();
};

Play.Application = function()
{
	Play.Layout.init();
			
	Play.Player.init();
};