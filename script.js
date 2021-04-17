//select which wall type you want. Look below for more info. Options are 1 or 2. 
var wallselector = 2;
// Box Width
var bw = 600;
// Box height
var bh = 600;
// Padding
var p = 0;
//square dimensions of each cell
var sqS=30;
var b = 5;
//number of boxes

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
function drawBoard(){
    for (var x = 0; x <= bw; x += sqS) {
        context.moveTo(0.5 + x + p, p);
        context.lineTo(0.5 + x + p, bh + p);
    }

    for (var x = 0; x <= bh; x += sqS) {
        context.moveTo(p, 0.5 + x + p);
        context.lineTo(bw + p, 0.5 + x + p);
    }
    context.strokeStyle = "grey";
    context.stroke();
}

function getRandomInt(max) { //random number generator
  return Math.floor(Math.random() * Math.floor(max));
}

function drawWall() { //draws walls 
  if (canvas.getContext('2d')) {
    context.fillRect(0+p,0+p,bw-p,bh-p);
    context.clearRect(0+p+sqS,0+p+sqS,bw-2*sqS-p,bh-2*sqS-p);
  if(wallselector==1){ //still finishing up some bugs but this is random wall selector. 5 are pre-determined and randomally selected, the last 2 actual random wall pieces
    for (var z = 0; z < b; z += 1){
      var wr=getRandomInt(4);
      var wx=getRandomInt(8); 
      var wy=getRandomInt(8);
      var ws=getRandomInt(8); //random quadrant selector
      if(ws==0){ //top
        context.fillRect(0+10*sqS,0+sqS,sqS,5*sqS); //top
      }
      if(ws==1){ //middle vertical
        context.fillRect(0+10*sqS,0+9*sqS,sqS,5*sqS); //middle vertical
      }
      if(ws==2){ //middle horizontal
        context.fillRect(0+9*sqS,0+10*sqS,4*sqS,1*sqS); //middle horizontal
      }
      if(ws==3){ //left
        context.fillRect(0+1*sqS,0+10*sqS,4*sqS,1*sqS); //left
      }
      if(ws==4){ //right
            context.fillRect(0+17*sqS,0+10*sqS,2*sqS,1*sqS); //right
      }
      if(ws==5){ //bottom
        context.fillRect(0+10*sqS,0+17*sqS,1*sqS,2*sqS); //bottom
      }
      if(ws==6){ //random horizontal piece
        context.fillRect(wx*sqS,wy*sqS,wr*sqS+sqS,1*sqS)
      }
      if(ws==7){ //randon vertical piece
        context.fillRect(wx*sqS,wy*sqS,1*sqS,wr*sqS+sqS)
      }
    }
  }
  if(wallselector==2){ //pre-determined walls, not randomly selected
  context.fillRect(0+10*sqS,0+sqS,sqS,5*sqS); //top
    context.fillRect(0+10*sqS,0+9*sqS,sqS,5*sqS); //middle vertical
    context.fillRect(0+9*sqS,0+10*sqS,4*sqS,1*sqS); //middle horizontal
    context.fillRect(0+1*sqS,0+10*sqS,4*sqS,1*sqS); //left
    context.fillRect(0+17*sqS,0+10*sqS,2*sqS,1*sqS); //right
    context.fillRect(0+10*sqS,0+17*sqS,1*sqS,2*sqS); //bottom
    }
  }
}


function drawBox(){
  for (var z = 0; z < b; z += 1){ //runs for the box variable
    var rx=getRandomInt(8); //gets a random value for the x multiplier
    var ry=getRandomInt(8); //gets a random value for the y multiplier
    var c = Math.floor(Math.random()*16777215).toString(16); //random color

    context.fillStyle = "#"+c; //attaches color var to a hex value
    var s=getRandomInt(4); //random quadrant selector
    console.log(s);
    if(s==0){ //Box in Q1
      context.fillRect(0+sqS+rx*sqS,0+sqS+ry*sqS,1*sqS,1*sqS);
    }
    if(s==1){ //Box in Q2
      context.fillRect(0+sqS+rx*sqS+9*sqS,0+sqS+ry*sqS,1*sqS,1*sqS);
    }
    if(s==2){ //Box in Q3
      context.fillRect(0+sqS+rx*sqS,0+sqS+ry*sqS+9*sqS,1*sqS,1*sqS);
    }
    if(s==3){ //Box in Q4
      context.fillRect(0+sqS+rx*sqS+9*sqS,0+sqS+ry*sqS+9*sqS,1*sqS,1*sqS);
    }
  }
  
}

drawWall();
drawBoard();
drawBox();
//_______________________

