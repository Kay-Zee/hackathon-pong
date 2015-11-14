$(function() {
  var svgContainer = document.getElementById("svg");
  var paper = Raphael(svgContainer, 1200, 600);
  var socket = io();

  var player = {
    x: 5,
    y: 250
  }

  var ball = {
    x: 100,
    y: 300
  }
  
  paper
    .rect(0, 0, 1200, 600, 1)
    .attr({
      fill: '#fff',
      stroke: '#000',
      'stroke-width': 10,
      'stroke-opacity': 1
    });

   var playerRect = paper
    .rect(5, 250, 10, 100, 1)
    .attr({
       fill: '#223fa3', 
       stroke: '#000',
       'stroke-width': 2
    });
  var ballCircle = paper
    .circle(100, 300, 10)
    .attr({
       fill: '#f00'
    });
  var moving = [0, 0]
  var currentRotation = 0;

  function draw() {
    player = playerRect.getBBox();
    ball = ballCircle.getBBox();
    var rotation = Math.atan2(player.y-ball.y, ball.x-player.x) *180 / Math.PI ;
    console.log(rotation);
    playerRect = playerRect.animate({
      transform: "...T"+moving[0]+","+moving[1]+"R"+rotation
    }, 100);


    // playerRect = playerRect.animate({
    //   transform: "...r"+rotation
    // });

  };

  function rotate() {

  }

  /**
   * Input
   */
  
  function keydown(key) {
    switch (key) {
      case 38:    moving[1] = -10;  break
      case 40:  moving[1] = +10; break
      case 37:  moving[0] = -10; break
      case 39: moving[0] = +10; break
    }
  }
  function keyup(key) {
    switch (key) {
      case 38:    moving[1] = 0; break
      case 40:  moving[1] = 0; break
      case 37:  moving[0] = 0; break
      case 39: moving[0] = 0; break
    }
  }

  document.body.addEventListener('keydown', function(e) {
    keydown(e.keyCode)
  }, false);
  document.body.addEventListener('keyup', function(e) {
    keyup(e.keyCode)
  }, false);

  setInterval(draw, 100);

});



