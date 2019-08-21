if (location.protocol === 'http:' && location.hostname !== 'localhost')
  location.protocol = 'https:';
if ('paintWorklet' in CSS) {
  CSS.paintWorklet.addModule('./javascript/confetti.js');
} else {
  document.body.innerHTML = 'You need support for <a href="https://drafts.css-houdini.org/css-paint-api/">CSS Paint API</a> to view this demo :(';
}

var count = 0;
var nodes = [];

function iterate() {
  count++;

  nodes.forEach(function(node) {
    node.style.setProperty('--movement', count);

  })

  window.requestAnimationFrame(iterate);

}

function init() {

  var emotions = 5;
  for (i = 0; i < emotions; i++) {
    var id = 'filled' + i;
    nodes[i] = document.getElementById(id);
  }

  iterate();
}

init()
