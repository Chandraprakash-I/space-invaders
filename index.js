const grid=document.querySelector('.grid');
const result=document.querySelector('.result');
let shooterPosition=202;
let invadersPosition=[
  0,1,2,3,4,5,6,7,8,9,
  15,16,17,18,19,20,21,22,23,24,
  30,31,32,33,34,35,36,37,38,39
];
const squares=[];
let isGoingRight=true;
let direction=1;
let width=15;
const aliensRemoved=[];
let results=0;

function draw(){
  //grid
  for(let i=0; i<(width*width); i++){
    let square=document.createElement('div');
    square.id=i;
    squares.push(square);
    grid.appendChild(square);
    
  }

  //shooter
  squares[shooterPosition].classList.add('shooter');

  //aliens
  for(let i=0; i<invadersPosition.length; i++){
    
      squares[invadersPosition[i]].classList.add('alien');
    }
  
}
draw();
//shooter ,shooter movement
//invader,invader movement
//laser,laser movement

function moveShooter(e){
  let key=e.key;
  switch(key){
    case "ArrowLeft":
      if(shooterPosition%width!=0){
        squares[shooterPosition].classList.remove('shooter');
        shooterPosition-=1;
        squares[shooterPosition].classList.add('shooter');
      }
      break;
    case "ArrowRight":
        if(shooterPosition%width<width-1){
          squares[shooterPosition].classList.remove('shooter');
          shooterPosition+=1;
          squares[shooterPosition].classList.add('shooter');
        }
        break;
  }
  
}
document.addEventListener('keydown',moveShooter);
function remove(){
  for(let i=0; i<invadersPosition.length; i++){
    squares[invadersPosition[i]].classList.remove('alien');
  }
}


function add(){
  for(let i=0; i<invadersPosition.length; i++){
    if(!aliensRemoved.includes(i)){
      squares[invadersPosition[i]].classList.add('alien');
    }
  }
}

let id;
function moveInvaders(){

  
  let leftEdge=invadersPosition[0]%width==0;
  let rightEdge=invadersPosition[invadersPosition.length-1]%width==width-1;
  remove();
   
  if(rightEdge && isGoingRight){
    for(let i=0; i<invadersPosition.length; i++){
      invadersPosition[i]+=width+1;   
    }
    direction=-1;
    isGoingRight=false;
  }

  if(leftEdge && !isGoingRight){
    for(let i=0; i<invadersPosition.length; i++){
      invadersPosition[i]+=(width-1);
    }
    direction=1;
    isGoingRight=true;
  }

  for(let i=0; i<invadersPosition.length; i++){
    invadersPosition[i]+=direction;
  }
  add();
  

  if(squares[shooterPosition].classList.contains('alien')){
    document.querySelector('.result').innerHTML='Game Over';
    clearInterval(id);
  }
  
  if(aliensRemoved.length==invadersPosition.length){
    document.querySelector('.result').innerHTML='You Win';
  }
}
id=setInterval(moveInvaders,600);

function laser(e){
 
let laserIndex=shooterPosition;
let laserInterval;
let key=e.key;

  function moveLaser(){
    squares[laserIndex].classList.remove('laser');
    laserIndex-=width;
  
    squares[laserIndex].classList.add('laser'); 
    if(laserIndex<14){
      console.log(laserIndex);
      squares[laserIndex].classList.remove('laser');
      clearInterval(laserInterval);
      
    }
    
    if(squares[laserIndex].classList.contains('alien')){
      squares[laserIndex].classList.remove('laser');
      squares[laserIndex].classList.remove('alien');
      squares[laserIndex].classList.add('boom');

      setTimeout(()=>{
        squares[laserIndex].classList.remove('boom');
      },300);
      clearInterval(laserInterval);

      let alienRemoved=invadersPosition.indexOf(laserIndex);
      aliensRemoved.push(alienRemoved);
      results++;
      result.innerHTML=results;
    }
   }
   
 switch (key){
  case 'ArrowUp':
    laserIndex=shooterPosition;
    laserInterval=setInterval(moveLaser,100);
    break;
 }
  
}
document.addEventListener('keydown',laser);
setTimeout(()=>{
  if(aliensRemoved.length!=invadersPosition.length){
    document.querySelector('.result').innerHTML='You Lose';
  }
 clearInterval(id);
},45000);