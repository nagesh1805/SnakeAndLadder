let snakeCells=[{head:99,tail:80},{head:94,tail:26},{head:91,tail:73},{head:83,tail:57},{head:69,tail:32},{head:59,tail:1},{head:56,tail:48},{head:25,tail:3},];
let ladderCells=[{top:81,bottom:62},{top:84,bottom:28},{top:90,bottom:71},{top:67,bottom:51},{top:63,bottom:42},{top:44,bottom:36},{top:38,bottom:20},{top:31,bottom:9},{top:14,bottom:4}];
let ldr_width=30;
let ldr;
let die;
let plyr1,plyr2;
let grid;
let turn;
let game_started;
let game_over;
let locations={};

let num_plyrs=0;
let snake_heads={99:80,94:26,91:73,83:57,69:32,56:48,59:1,25:3};
let ladder_foots={4:14,9:31,20:38,28:84,36:44,42:63,51:67,62:81,71:90};
let climbing=0;
let swallowing=0;
let yelCol='yellow';
let playCol='gray';
let pg1;
let pg2;
let congrats;
let n;
let snakes_list;
let t;
let roll;
let active_plyr,inactive_plyr;
let active_emoji;
let animation_progress;
let moving;
let snake_colors=['aqua','red','blueviolet','chocolate','maroon','lawngreen','orange','purple'];
let mySound,buzzer;
var p2;
let toss_time;
let mouse_just_clicked=false;
let dots=1;
let buzzer_alert;
let player_emojis=[{1:"🐼",2:"🐻"}];

function preload() {
  soundFormats('mp3','wav');
  mySound = loadSound('dice_sound2.mp3');
  buzzer = loadSound('buzzer.wav');
}
function setup() {
  createCanvas(600, 700);
  locations[0]={x:50,y:550};
  game_started=false;
  game_over=false;
  animation_progress=false;
  moving=false;
  buzzer_alert=false;
  congrats="";
  roll="ROLL";
  snakes_list={};
  t=-5;
  toss_time=0;
  turn=1;

  
  let k=1;
  let i=1;
  let j=10;
  while (j>0){
    locations[k]={x:i*50,y:j*50};
    if(k%10==0){
         j=j-1;
    }
    else{
      if(floor(k/10)%2==0){
        i=i+1;
       }
      else{
         i=i-1;
      }
    }
    k++;

  }
  let emojis=random(player_emojis);
  plyr1=new Player(emojis[1],0);
  plyr2=new Player(emojis[2],1);
  die= new Die(6,600,300);
  grid=new Grid(plyr1,plyr2,locations,snakeCells,ladderCells);
  active_plyr=plyr1;
  inactive_plyr=plyr2;
  active_emoji=plyr1.emoji;
  
  
  
  
  var sketch2 = function(p){
          p.setup=function() {
              p.createCanvas(600, 60,p.WEBGL);
              p.pg=p.createGraphics(30,30);


          }

          p.draw=function() {

            if(mouse_just_clicked && !game_over){
                   p.background(0);
                  p.pg.push();
                 p.pg.noStroke();
                 p.pg.rect(0,0,30,30,10);
        
                 p.pg.pop();
                   p.push();
                 // p.pg.stroke('black');
                  p.pg.strokeWeight(5);
                  dots=random([1,2,3,4,5,6]);
                  switch(dots){
                    case 1:
                      p.pg.point(15,15);
                      break;

                    case 2:
                      p.pg.point(10,15);
                      p.pg.point(20,15);
                      break;

                    case 3:
                      p.pg.point(6,15);
                      p.pg.point(15,15);
                      p.pg.point(24,15);
                      break;

                    case 4:
                      p.pg.point(10,10);
                      p.pg.point(20,10);
                      p.pg.point(10,20);
                      p.pg.point(20,20);
                      break;

                    case 5:
                      p.pg.point(10,10);
                      p.pg.point(20,10);
                      p.pg.point(10,20);
                      p.pg.point(20,20);
                      p.pg.point(15,15);
                      break;

                    case 6:
                      p.pg.point(6,10);
                      p.pg.point(15,10);
                      p.pg.point(24,10);  
                      p.pg.point(6,20);
                      p.pg.point(15,20);
                      p.pg.point(24,20);
                      break;

                }
                p.pop();

                p.texture(p.pg);
                  p.rotateX(p.frameCount * 1);
                p.rotateY(p.frameCount * 1);
                    p.rotateZ(p.frameCount * 1);
                p.push();
              p.noStroke();
                p.box(30);    
              p.pop();
            }

          else{
                  p.background(0);
                 // p.pg.strokeWeight(1);
                 p.pg.push();
                 p.pg.noStroke();
                 p.pg.rect(0,0,30,30,10);
                 p.pg.pop();
            
                 p.push();
                 //p.pg.stroke('black');
                 p.pg.strokeWeight(5);


                  switch(die.dots){
                          case 1:
                            p.pg.point(15,15);
                            break;

                          case 2:
                            p.pg.point(10,15);
                            p.pg.point(20,15);
                            break;

                          case 3:
                            p.pg.point(6,15);
                            p.pg.point(15,15);
                            p.pg.point(24,15);
                            break;

                          case 4:
                            p.pg.point(10,10);
                            p.pg.point(20,10);
                            p.pg.point(10,20);
                            p.pg.point(20,20);
                            break;

                          case 5:
                            p.pg.point(10,10);
                            p.pg.point(20,10);
                            p.pg.point(10,20);
                            p.pg.point(20,20);
                            p.pg.point(15,15);
                            break;

                          case 6:
                            p.pg.point(6,10);
                            p.pg.point(15,10);
                            p.pg.point(24,10);  
                            p.pg.point(6,20);
                            p.pg.point(15,20);
                            p.pg.point(24,20);
                            break;

                 }
            p.pop();

            p.texture(p.pg);
              p.push();
              p.noStroke();
                p.box(30);    
              p.pop();  
          }

      }



  }


  p2=new p5(sketch2);
  die.show(); 


}
function contains(a,k){
  for (let i=0;i<a.length;i++){
    if (a[i]==k){
      return true;
    }
  }
  return false;
}
function draw() {
  //noLoop();
  if(!mouse_just_clicked){
      background(0);
        die.show();  

        if(!animation_progress & !game_over){
          
            textSize(30);
           text(active_emoji,285,650);

        }


        if (mouseX>300-20 && mouseX<300+20 && mouseY>680-20 && mouseY<680+20){
          yelCol='orange';
        }
        else{
          yelCol='yellow';
        }
        push();
        noStroke();
        textSize(20);
        fill('magenta');
        text(congrats,230,25);
        if(game_over){
            if(mouseX>250 && mouseX<350 && mouseY>570 && mouseY<600){
              playCol='darkgray';
            }
            else{
              playCol='gray';
            }
            fill(playCol);
            rect(250,570,100,30,10);
            textSize(18);
            fill('black');
            text("Play Again!",254,590);
            roll="";
        }
        pop();

        if (contains([4,9,20,28,36,42,51,62,71],active_plyr.loc ) && active_plyr.loc==active_plyr.prev && t<=10){
         // console.log(active_plyr);
          animation_progress=true;
          roll="";
          if(t>=0){
              textSize(50);
              text(active_plyr.emoji,(1-t/10)*locations[active_plyr.loc].x+(t/10)*locations[ladder_foots[active_plyr.loc]].x,(1-t/10)*locations[active_plyr.loc].y+(t/10)*locations[ladder_foots[active_plyr.loc]].y+ldr_width);
              if(t==10){
                active_plyr.loc=ladder_foots[active_plyr.loc];
                active_plyr.prev=ladder_foots[active_plyr.loc];
                   animation_progress=false
                   roll="ROLL";
              }

          }
          else{
            textSize(50);
            text(active_plyr.emoji,locations[active_plyr.loc].x,locations[active_plyr.loc].y+50);
          }
          text(inactive_plyr.emoji,locations[inactive_plyr.loc].x,locations[inactive_plyr.loc].y+50);
          t=t+1;

        }
        else if (contains([99,94,91,83,69,56,59,25],active_plyr.loc )&& active_plyr.loc==active_plyr.prev && t<=100){
          animation_progress=true;
          roll="";
          if(t>=0){

              let l=dist(locations[active_plyr.loc].x,locations[active_plyr.loc].y,locations[snake_heads[active_plyr.loc]].x,locations[snake_heads[active_plyr.loc]].y);
              let theta=atan((locations[snake_heads[active_plyr.loc]].y-locations[active_plyr.loc].y)/(locations[snake_heads[active_plyr.loc]].x-locations[active_plyr.loc].x));  

    

              let x1=locations[active_plyr.loc].x+25;
              let y1=locations[active_plyr.loc].y+25;
              let x4=locations[snake_heads[active_plyr.loc]].x+25;
              let y4=locations[snake_heads[active_plyr.loc]].y+25;
              let x2=(locations[active_plyr.loc].x + locations[snake_heads[active_plyr.loc]].x)/2+(l/2)*cos(theta+PI/2)+25;
              let y2=(locations[active_plyr.loc].y + locations[snake_heads[active_plyr.loc]].y)/2+(l/2)*sin(theta+PI/2)+25;
              let x3=(locations[active_plyr.loc].x + locations[snake_heads[active_plyr.loc]].x)/2-(l/2)*cos(theta+PI/2)+25;
              let y3=(locations[active_plyr.loc].y + locations[snake_heads[active_plyr.loc]].y)/2-(l/2)*sin(theta+PI/2)+25;

              let x=pow(1-t/100,3)*x1+3*pow(1-t/100,2)*(t/100)*x2+3*(1-t/100)*pow(t/100,2)*x3+pow(t/100,3)*x4;
              let y=pow(1-t/100,3)*y1+3*pow(1-t/100,2)*(t/100)*y2+3*(1-t/100)*pow(t/100,2)*y3+pow(t/100,3)*y4;
            t=t+1;
              textSize(50);
              push();
            noStroke();
            if(floor(t/10)%2==0){
              fill(snakes_list[active_plyr.loc].color);
            }
            else{
              fill('black');
            }

              circle(x,y,l/8);
              if(t>=100){
                active_plyr.loc=snake_heads[active_plyr.loc];
                 active_plyr.prev=snake_heads[active_plyr.loc];
                   animation_progress=false
                   roll="ROLL";
              }

          }
          else{
            textSize(50);
            text(active_plyr.emoji,locations[active_plyr.loc].x,locations[active_plyr.loc].y+50);
          }
          text(inactive_plyr.emoji,locations[inactive_plyr.loc].x,locations[inactive_plyr.loc].y+50);
          t=t+1;

        }
   
    
  }
  
  
  
  
  
  if(mouse_just_clicked){
    toss_time=toss_time+1;
    if(toss_time>=10){
      mouse_just_clicked=false;
      toss_time=0;
    }
    if (toss_time==1){
      yelCol='black';
    }
    else{
      yelCol='orange';
    }
      fill(yelCol);
      push()
    noStroke();
      circle(300,680,40);

      fill('red');
      textSize(10);
      text(roll,288,685);
        pop();
    
  }

  
}


function mouseClicked(){
  if(!animation_progress && !mouse_just_clicked ){

     n=0;
      t=-5;
      if (mouseX>300-20 && mouseX<300+20 && mouseY>680-20 && mouseY<680+20 && !game_over){
       // move_path=[];
        mouse_just_clicked=true;
        die.roll();
        yelCol='black';
        game_started=true;
        mySound.play();
        if (turn == 1){
          plyr1.makeMove(die.dots);
          turn=2;
          active_plyr=plyr1;
          inactive_plyr=plyr2;
          active_emoji=plyr2.emoji;
        }
        else{
          plyr2.makeMove(die.dots);
          turn=1;
          active_plyr=plyr2;
          inactive_plyr=plyr1;
          active_emoji=plyr1.emoji;
        }
      }
      if(game_over && mouseX>250 && mouseX<350 && mouseY>570 && mouseY<600){
        //setup();
        //first_game=false;
        game_started=false;
        plyr1.loc=0;
        plyr1.prev=0;
        plyr2.loc=0;
        plyr2.prev=0;
        players=random(player_emojis);
        plyr1.set_emoji(players[1],0);
        plyr2.set_emoji(players[2],1);
        active_plyr=plyr1;
        inactive_plyr=plyr2;
        active_emoji=plyr1.emoji;
        game_over=false;
        animation_progress=false;
        moving=false;
        congrats="";
        roll="ROLL";
        t=-5;
        toss_time=0;
         buzzer_alert=false;
        turn=1;
        
      }
     }
  
 // grid.show();
 // die.show();
}



class Player{
  constructor(emoji,plyr_num){
    this.loc=0
    this.emoji=emoji;
    this.prev=0;
    this.player_number=plyr_num;
  }
  makeMove(k){
    if(this.loc+k<=100){
       this.prev=this.loc;
       this.loc=this.loc+k;
       if (this.loc==100){
         game_over=true;
         congrats="Congratulations! 🏆"+this.emoji;
       }
    }
    else{
        //buzzer.play();
        buzzer_alert=true;
    }


  }
  
  set_emoji(emoji,n){
    this.emoji=emoji;
    this.player_number=n;
  }
  
  show(){
     if(!animation_progress){
        textSize(50);
        if(!game_started){
           text(this.emoji,locations[this.loc].x+this.player_number*50,locations[this.loc].y+50);
        }
        else{
           if(this.prev<this.loc){
                 // move_path.push({x:locations[this.prev].x,y:locations[this.prev].y});
              frameRate(10);
              text(this.emoji,locations[this.prev].x,locations[this.prev].y+50);
              this.prev=this.prev+1;

           }
           else {
              text(this.emoji,locations[this.loc].x,locations[this.loc].y+50);
           }
           if(buzzer_alert){
             buzzer.play();
             buzzer_alert=false;
           }

       }
     }


      

      
  }
  


}


class Grid{
  constructor(player1,player2,cells,snakeCells,ladderCells){
    this.player1=player1;
    this.player2=player2;
    this.cells={};
    this.snakes=[];
    this.ladders=[];
    this.cells=cells;
    this.snakeCells=snakeCells;
    this.ladderCells=ladderCells;
    for (let i=0;i<snakeCells.length;i++){
      this.snakes.push(new Snake(this.cells[snakeCells[i].head].x,this.cells[snakeCells[i].head].y,this.cells[snakeCells[i].tail].x,this.cells[snakeCells[i].tail].y));
      this.snakes[i].color=snake_colors[i];
      snakes_list[snakeCells[i].head]=this.snakes[i];
      
    }
    
    for (let i=0;i<ladderCells.length;i++){
      this.ladders.push(new Ladder(this.cells[ladderCells[i].top].x,this.cells[ladderCells[i].top].y,this.cells[ladderCells[i].bottom].x,this.cells[ladderCells[i].bottom].y));
      
    }
    
  }
  show(){
         
    strokeWeight(2);
    stroke('blue');
    push();
    for(let i=1;i<=11;i++){
         line(50,i*50,550,i*50);
      }
      for(let j=1;j<=11;j++){
          line(j*50,50,j*50,550);
      }
    
      for(let i=1;i<=100;i++){
            let cols=['lightpink','lightsalmon'];
            fill(color(cols[i%2]));
            rect(locations[i].x,locations[i].y,50,50);
      }    
    
    textSize(15);
    fill('green');
      noStroke();
    for(let i=1;i<=100;i++){
      text(str(i),locations[i].x,locations[i].y+50);
    }    
    
    for ( let i=0;i<this.snakes.length;i++){
       this.snakes[i].show();
    }

    for ( let i=0;i<this.ladders.length;i++){
      this.ladders[i].show();
    }

    pop();
     if(turn==1){
       this.player1.show();
       this.player2.show();
    }
    else{
       this.player2.show();
       this.player1.show();
    }
  


  }
}


class Die{
  constructor(dots,x,y){
    this.dots=dots;
    this.x=x;
    this.y=y;
  }
  show(){
    grid.show();
    push();
    noStroke();
    if(animation_progress || game_over){
       fill('black');
    }
    else{
      fill(yelCol);
    }
    
    circle(300,680,40);
    fill('red');
    textSize(10);
    text(roll,288,685);
    pop();
  
  }
  
  roll(){
    this.dots=random([1,2,3,4,5,6]);
  }
  
}


class Ladder {
  
  constructor(x1,y1,x2,y2){
    this.x1=x1;
    this.y1=y1;
    this.x2=x2;
    this.y2=y2;
    this.theta=atan((y2-y1)/(x2-x1));
    this.l=dist(x1,y1,x2,y2);
    
  }
  
  show(){
    stroke('black');
    strokeWeight(5);
    if(this.theta>0){
      line(this.x1+ldr_width/2,this.y1+ldr_width,this.x2+ldr_width/2,this.y2+ldr_width);
      line(this.x1+ldr_width,this.y1+ldr_width/4,this.x2+ldr_width,this.y2+ldr_width/4);
       let pts1=[];
      let pts2=[];
      let n =floor(this.l/15);
      for(let i=0;i<=n;i++){
        pts1.push({x:(this.x1+ldr_width/2)*(i/n)+(this.x2+ldr_width/2)*(1-i/n),y:(this.y1+ldr_width)*(i/n)+(this.y2+ldr_width)*(1-i/n)});
      }
      for(let i=0;i<=n;i++){
        pts2.push({x:(this.x1+ldr_width)*(i/n)+(this.x2+ldr_width)*(1-i/n),y:(this.y1+ldr_width/4)*(i/n)+(this.y2+ldr_width/4)*(1-i/n)});
      }
      

      for (let i=1;i<pts1.length-1;i++){
        line(pts1[i].x,pts1[i].y,pts2[i].x,pts2[i].y);
      }
      
    }
  else{
      line(this.x1+ldr_width/2,this.y1+ldr_width,this.x2+ldr_width/2,this.y2+ldr_width);
      line(this.x1+ldr_width,this.y1+3*ldr_width/2,this.x2+ldr_width,this.y2+3*ldr_width/2);
    
      let pts1=[];
      let pts2=[];
      let n =floor(this.l/20);
      for(let i=0;i<=n;i++){
        pts1.push({x:(this.x1+ldr_width/2)*(i/n)+(this.x2+ldr_width/2)*(1-i/n),y:(this.y1+ldr_width)*(i/n)+(this.y2+ldr_width)*(1-i/n)});
      }
      for(let i=0;i<=n;i++){
        pts2.push({x:(this.x1+ldr_width)*(i/n)+(this.x2+ldr_width)*(1-i/n),y:(this.y1+3*ldr_width/2)*(i/n)+(this.y2+3*ldr_width/2)*(1-i/n)});
      }
      

      for (let i=1;i<pts1.length-1;i++){
        line(pts1[i].x,pts1[i].y,pts2[i].x,pts2[i].y);
      }    

      }

    
  }
}

class Snake{
  
   constructor(x1,y1,x2,y2){
    this.x1=x1;
    this.y1=y1;
    this.x2=x2;
    this.y2=y2;
    this.theta=atan((y2-y1)/(x2-x1));
    this.l=dist(x1,y1,x2,y2);
    this.color=color('red');

    
  }
  
  show(){
    stroke(this.color);
    push();
    strokeWeight(this.l/15);
    fill(this.color);
    strokeWeight(1);
    circle(this.x1+25,this.y1+25,this.l/10);
    pop();
    noFill();
  //  bezier(this.x1+25,this.y1+25,(this.x1+this.x2)/2+(this.l/2)*cos(this.theta+PI/2)+25,(this.y1+this.y2)/2+(this.l/2)*sin(this.theta+PI/2)+25,(this.x1+this.x2)/2-(this.l/2)*cos(this.theta+PI/2)+25,(this.y1+this.y2)/2-(this.l/2)*sin(this.theta+PI/2)+25,this.x2+25,this.y2+25);

        let x1=this.x1+25;
        let y1=this.y1+25;
        let x4=this.x2+25;
        let y4=this.y2+25;
        let x2=(this.x1+this.x2)/2+(this.l/2)*cos(this.theta+PI/2)+25;
        let y2=(this.y1+this.y2)/2+(this.l/2)*sin(this.theta+PI/2)+25;
        let x3=(this.x1+this.x2)/2-(this.l/2)*cos(this.theta+PI/2)+25;
        let y3=(this.y1+this.y2)/2-(this.l/2)*sin(this.theta+PI/2)+25;
    
    let tt=1;
    
    for(tt=1;tt<=100;tt++){
   

        let xx1=pow(1-(tt-1)/100,3)*x1+3*pow(1-(tt-1)/100,2)*((tt-1)/100)*x2+3*(1-(tt-1)/100)*pow((tt-1)/100,2)*x3+pow((tt-1)/100,3)*x4;
        let yy1=pow(1-(tt-1)/100,3)*y1+3*pow(1-(tt-1)/100,2)*((tt-1)/100)*y2+3*(1-(tt-1)/100)*pow((tt-1)/100,2)*y3+pow((tt-1)/100,3)*y4;
      
      
        let xx2=pow(1-tt/100,3)*x1+3*pow(1-tt/100,2)*(tt/100)*x2+3*(1-tt/100)*pow(tt/100,2)*x3+pow(tt/100,3)*x4;
        let yy2=pow(1-tt/100,3)*y1+3*pow(1-tt/100,2)*(tt/100)*y2+3*(1-tt/100)*pow(tt/100,2)*y3+pow(tt/100,3)*y4;
      
        textSize(50);
       // text(active_plyr.emoji,x,y);
      if(tt<=60){
        strokeWeight(this.l/15);
      }
      else{
        strokeWeight(1+this.l/15*(1-(tt-60)/40));
      }


      if(floor(tt/10)%2 === 0){
         stroke(this.color);
      }
      else{
         stroke('black');
      }

       // circle(x,y,l/8);
      line(xx1,yy1,xx2,yy2);    
      
    }

    

    
    push();
    stroke('white');
    strokeWeight(this.l/30);
    point(this.x1+25-this.l/40,this.y1+25-this.l/20);
    point(this.x1+25+this.l/40,this.y1+25-this.l/20);
    stroke('black');
    strokeWeight(this.l/50);
    point(this.x1+25-this.l/40,this.y1+25-this.l/25);
    point(this.x1+25+this.l/40,this.y1+25-this.l/25);
    pop();
    push();
    stroke(0,0,0,150);
    strokeWeight(this.l/100);
    noFill();
    arc(this.x1+25,this.y1+25,this.l/15,this.l/10,PI/3,PI-PI/3);
    pop();
    
    
  }
}




