  

window.onload = function() {
   
   var canvas = document.createElement("canvas"),
       c = canvas.getContext("2d"),
       width = innerWidth;
       height = innerHeight;
       canvas.width = width;
       canvas.height = height;
   document.body.appendChild(canvas);
   
   var fireworks = [];
   var particles = []; 
   
   function Firework() {
       this.y = height;
       this.x = Math.random()*width; 
       this.vy = 0; 
       this.ay = -0.5; 
       this.ranY = Math.random()*height/2;
       this.die = false; 
       this.c1 = Math.floor(Math.random()*255);
       this.c2 = Math.floor(Math.random()*255);
       this.c3 = Math.floor(Math.random()*255);
       
       this.show = function() {
          c.beginPath();
          c.fillStyle = "rgba("+this.c1+","+this.c2+","+this.c3+",1)";
          c.arc(this.x,this.y,5,0,Math.PI*2,false);
          c.fill(); 
       }
       
       this.update = function() {
          this.y += this.vy;
          this.vy += this.ay; 
          
          if(this.y <= this.ranY) {
              for(var i = 0; i < 25; i++) {
                  particles.push(new Fase2(this.x,this.y,this.c1,this.c2,this.c3));
              }  
              this.die = true;  
          }   
       }
                   
   }
   
   function Fase2(x,y,c1,c2,c3) {
       this.x = x;
       this.y = y;
       this.vx = Math.random()*10-5; 
       this.vy = Math.random()*10-5; 
       this.g = 0.1; 
       this.fade = 1; 
       this.c1 = c1;
       this.c2 = c2;
       this.c3 = c3; 
       
       this.show = function() {
          c.beginPath();
          c.arc(this.x,this.y,2.5,0,Math.PI*2,false);
          c.fillStyle = "rgba("+this.c1+","+this.c2+","+this.c3+","+this.fade+")";
          c.fill(); 
       }
       
       this.update = function() {
          this.x += this.vx;
          this.y += this.vy;
          this.vy += this.g; 
          this.fade -= 0.025; 
       } 
   }
   
   setInterval(function(){
           fireworks.push(new Firework());  
   },500); 
   
   setInterval(function(){
       
       c.fillStyle = "rgba(0,0,0,0.2)";
       c.fillRect(0,0,width,height);
        
       c.fillStyle = "white";
       c.font = "80px Arial";
       c.fillText("Happy Eid!", width/2-170, height/2-100); 
       

      
       for(var i in fireworks) {
          fireworks[i].show(); 
          fireworks[i].update();
          if(fireworks[i].die === true) {
             delete fireworks[i];
          }
       }
       
       for( i in particles) {
          particles[i].show();
          particles[i].update();
          if(particles[i].fade <= 0) {
             delete particles[i];  
          }
       }
          
   },25);
    
}
