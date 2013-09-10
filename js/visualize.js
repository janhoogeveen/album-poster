var canvas = document.getElementById("vis");
var context = canvas.getContext("2d");
var blockSize = 7;

//store the data here
var lines;

var amountOfSongs = 10;
var albumTitle = "Kid A";
var albumArtist = "Radiohead";
var reverse = false;
var songs = new Array(amountOfSongs);
var loadedSongs = 0;

var startOffset = 1000;

// var canvasWidth = 993.3,
// 		canvasHeight = 14043;

var canvasWidth = 9933,
		canvasHeight = 14043;

var dominantColor;
var colorPallete;

function drawLoop() {
	$.each(songs, function(songIndex, songData) {
		draw(songIndex, songData);
	});
}

function download() {
	var dataURL = canvas.toDataURL();
	document.getElementById("canvasImg").src = dataURL;
}

function drawMetaData() {
	//Draw the artist name
	context.fillStyle = '#ffffff';
	context.textBaseline = 'middle';
	context.textAlign = "center";
  context.font = 'normal 200px "Neutral BP"';
	context.fillText(albumArtist, 0, -150);
  context.font = 'bold 200px "Neutral BP"';
	context.fillText(albumTitle, 0, 150);
}

function draw(songIndex, songLines) {
	//Draw all the songs and lines
	$.each(songLines, function(indexLine, dataLine) {
		$.each(dataLine.fft, function(indexPoint, dataPoint) {
			var val = dataPoint;
			context.fillStyle = "rgba("+colorPallete[songIndex][0]+","+colorPallete[songIndex][1]+","+colorPallete[songIndex][2]+","+(val/255)+")";
			//context.fillStyle = colorsList[songIndex];
			context.fillRect(startOffset+(indexPoint*blockSize), 0, blockSize, blockSize);
		});
		//context.rotate(Math.PI / 459);
		context.rotate(Math.PI / 457);
	});
}

//Document object model is loaded
document.addEventListener('DOMContentLoaded',function(){

	dominantColor = getDominantColor($('img'));
	colorPallete = createPalette($('img'), amountOfSongs+1);


	context.translate(Math.floor(canvasWidth/2),Math.floor(canvasHeight/2));

	//Load all the jsons, then fire the draw function
	for (var i = 1; i < amountOfSongs+1; i++) {
		(function() {
			var itemno = i;
			$.getJSON('js/'+itemno+'.json', function(data) {
				songs[itemno-1] = data;
				loadedSongs++;
				if (loadedSongs === amountOfSongs) {
					drawMetaData();
					drawLoop();
				}
			});
		})();
	}

});