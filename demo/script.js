/* globals GIF */

//initial example https://codepen.io/ford/pen/RKYvNy
     // Add gif
     add_gif("/dist/img/memes/templates/truck.gif?cv=3");

let numFrames = 50;
let width = 300;
let height = 300;

c = document.getElementById('meme_canvas')
var ctx = c.getContext('2d')
c.width = width;
c.height = height;

let gif = new GIF({
  workers: 2,
  quality: 10
});

c = document.getElementById('meme_canvas')
var ctx = c.getContext('2d')

// or copy the pixels from a canvas context
gif.addFrame(ctx, {copy: true});

gif.on('finished', function(blob) {
    window.open(URL.createObjectURL(blob));
  });
  
  gif.render();
