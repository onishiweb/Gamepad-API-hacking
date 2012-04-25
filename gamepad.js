// Playing around with the Gamepad API

var gamepads = document.getElementById("gamepads"),
    /* axisZ = document.getElementById("axis0"),
    axisO = document.getElementById("axis1"),
    axisT = document.getElementById("axis2"),
    axisF = document.getElementById("axis3"), */
    xboxButtons = new Array();

    xboxButtons[0] = "A",
    xboxButtons[1] = "B",
    xboxButtons[2] = "X",
    xboxButtons[3] = "Y",
    xboxButtons[4] = "LB",
    xboxButtons[5] = "RB",
    xboxButtons[6] = "LS",
    xboxButtons[7] = "RS",
    xboxButtons[8] = "START",
    xboxButtons[9] = "BACK",
    xboxButtons[10] = "XBOX",
    xboxButtons[11] = "UP",
    xboxButtons[12] = "DOWN",
    xboxButtons[13] = "LEFT",
    xboxButtons[14] = "RIGHT";


// Request animation frame

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function( callback ){
            window.setTimeout(callback, 1000 / 24);
          };
})();

// Game setup

var canvas  = document.getElementById('game'),
    ctx     = canvas.getContext('2d'),
    ship    = new Image(),
    space   = new Image();
 
space.src = "space.jpg";
ship.src  = "ship.png";

var player = {
      x: 200,
      y: 250,
      UP: false,
      DOWN: false,
      LEFT: false,
      RIGHT: false,
      render: function() {
        this.updatePosition();
        ctx.drawImage(ship,this.x,this.y);
      },
      updatePosition: function() {
        this.UP     ? this.y-- : false;
        this.DOWN   ? this.y++ : false;
        this.LEFT   ? this.x-- : false;
        this.RIGHT  ? this.x++ : false;
      }
    }

function renderGame()
{
  ctx.drawImage(space,0,0);
  player.render();
}

;(function animloop(){
  requestAnimFrame(animloop);
  renderGame();
})();









function gamepadConnected(e) {
  var gamepadId = e.gamepad.id;

    gamepads.innerHTML += "<h2>Gamepad Connected (id=" + gamepadId + ")</h2>";
}

function buttonPressed(evt, pressed)
{
    //gamepads.innerHTML += "Button pressed (id="+xboxButtons[evt.button]+")<br />";
    player[xboxButtons[evt.button]] = pressed  ? true : false;
}

function moveAnalogSticks(evt) {

    switch(evt.axis) {
        // LEFT Stick Right: 1 Left -1
        case 0:
                if (evt.value < -0.2 ) {
                    player["LEFT"] = true;
                    player["RIGHT"] = false;
                }
                else if ( evt.value > 0.2 ) {
                    player["RIGHT"] = true;
                    player["LEFT"] = false;
                }
                else if ( evt.value > -0.2 && evt.value < 0.2 ) {
                    player["LEFT"] = false; 
                    player["RIGHT"] = false;
                }
            break;
        // LEFT Stick Up -1 Down 1
        case 1:        
                if (evt.value < -0.2 ) {
                    player["UP"] = true;
                    player["DOWN"] = false;
                }
                else if ( evt.value > 0.2 ) {
                    player["DOWN"] = true;
                    player["UP"] = false;
                }
                else if ( evt.value > -0.2 && evt.value < 0.2 ) {
                    player["UP"] = false; 
                    player["DOWN"] = false;
                }
            break;
    }   

}


window.addEventListener("MozGamepadConnected", gamepadConnected, false);
window.addEventListener("MozGamepadButtonDown", function(evt) { buttonPressed(evt, true); } );
window.addEventListener("MozGamepadButtonUp", function(evt) { buttonPressed(evt, false); } );
window.addEventListener("MozGamepadAxisMove", moveAnalogSticks);