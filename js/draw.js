$(function() {
  // var svgContainer = document.getElementById("svg");
  // var paper = Raphael(svgContainer, 1200, 600);
  // var socket = io();

  // var player = {
  //   x: 5,
  //   y: 250
  // }

  // var ball = {
  //   x: 100,
  //   y: 300
  // }
  
  // paper
  //   .rect(0, 0, 1200, 600, 1)
  //   .attr({
  //     fill: '#fff',
  //     stroke: '#000',
  //     'stroke-width': 10,
  //     'stroke-opacity': 1
  //   });


  // var ballCircle = paper
  //   .circle(100, 300, 10)
  //   .attr({
  //      fill: '#f00'
  //   });
  // 
  // var currentRotation = 0;

  // function draw() {
  //   var playerRect = paper
  //     .rect(player.x, player.y, 10, 100, 1)
  //     .attr({
  //        fill: '#223fa3', 
  //        stroke: '#000',
  //        'stroke-width': 2
  //     });

  //   console.log(currentRotation);
  //   playerRect = playerRect.animate({
  //     transform: "T"+moving[0]+","+moving[1]+"R"+currentRotation
  //   }, 100);
  //   player = playerRect.getBBox();
  //   ball = ballCircle.getBBox();
  //   currentRotation = Math.atan2(player.y-ball.y, ball.x-player.x) *180 / Math.PI ;

  //   // playerRect = playerRect.animate({
  //   //   transform: "...r"+rotation
  //   // });

  // };

  // function rotate() {

  // }

  var ctx;
  var WIDTH; 
  var HEIGHT;
  var dx = 0.5;
  var dy = 0.4;
  var x = 150;
  var y = 150;

  var player = {
    x: 5,
    y: 0
  };
  function init() {
    ctx = $('#field')[0].getContext("2d");
    WIDTH = $("#field").width()
    HEIGHT = $("#field").height()
    player.y = HEIGHT/2;
    return setInterval(draw, 10);
  }
  init();

  function clear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);



  }

  function circle(x,y,r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
  }

  function rect(x,y,w,h,a) {
    ctx.save();


    ctx.beginPath();
    ctx.translate( x+w/2, y+h/2 );
    ctx.rotate(a*Math.PI/180);
    ctx.rect(-w/2,-h/2,w,h);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function clear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
  }

  var moving = [0, 0]

  function draw() {
    clear();
    ctx.beginPath();
    ctx.rect(2,2,WIDTH-4,HEIGHT-4);
    ctx.lineWidth = 4;
    ctx.closePath();

    ctx.strokeStyle = 'black';
    ctx.stroke();
    circle(x, y, 5);
    rect(player.x, player.y, 10, 50, 20);
   
    if (x + dx > WIDTH || x + dx < 0)
      dx = -dx;
    if (y + dy > HEIGHT || y + dy < 0)
      dy = -dy;
    
    x += dx;
    y += dy;

    if (player.x + moving[0] > 0 && player.x + moving[0] < WIDTH) {
      player.x += moving[0];
    }
    if (player.y + moving[1] > 0 && player.y + moving[1] < HEIGHT) {
      player.y += moving[1];
    }
  }

  /**
   * Input
   */
  
  function keydown(key) {
    switch (key) {
      case 38:    moving[1] = -1;  break
      case 40:  moving[1] = +1; break
      case 37:  moving[0] = -1; break
      case 39: moving[0] = +1; break
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

  setInterval(draw, 10);

});



