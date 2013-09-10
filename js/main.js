// requestAnim shim layer by Paul Irish
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function(callback, element){
            window.setTimeout(callback, 1000 / 60);
          };
})();

var myArray = [];
var index = 0;

// The audio element
audioElement = document.getElementById('audio');
count = 0;
// Create new Audio Context and an audio analyzer
audioContext = new webkitAudioContext();
analyser = audioContext.createAnalyser();
// Initialize and start drawing
// when the audio starts playing
window.onload = init;
audioElement.addEventListener('play', draw);


function magic() {
	var myJsonString = JSON.stringify(myArray);
	console.log(myJsonString);
}

function init() {
  // Take input from audioElement
  source = audioContext.createMediaElementSource(audioElement);
  // Connect the stream to an analyzer
  source.connect(analyser);
  // Connect the analyzer to the speakers
  analyser.connect(audioContext.destination);
        //analyser.smoothingTimeConstant = 0.3;
  analyser.fftSize = 512;
  // Start the animation
  draw();
}

function draw() {
  // See http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  requestAnimFrame(draw);
  // New typed array for the raw frequency data
  freqData = new Uint8Array(analyser.frequencyBinCount);

  if (count % 300 === 0) {

    var object = {
      id: index,
      fft: freqData
    }

    myArray[index] = object;

  	// myArray.push({
   //    data: freqData
   //  });

    index++;

  }

  // Put the raw frequency into the newly created array
  analyser.getByteFrequencyData(freqData);
  count++;
}