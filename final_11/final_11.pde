//music
import ddf.minim.spi.*;
import ddf.minim.signals.*;
import ddf.minim.*;
import ddf.minim.analysis.*;
import ddf.minim.ugens.*;
import ddf.minim.effects.*;
Minim minim;
AudioPlayer popo;
AudioPlayer bling;
AudioPlayer bling1;
AudioPlayer dui;
AudioPlayer dui1;
AudioPlayer dui2;
AudioPlayer dui3;
AudioPlayer dui4;
AudioPlayer dui5;
AudioPlayer dui6;
AudioPlayer dui7;
AudioPlayer dui8;
AudioPlayer dui9;
AudioPlayer dui10;
AudioPlayer dui11;
AudioPlayer pig;
AudioPlayer win2;
AudioPlayer win3;

int frame=0;
//boolean a = false;
//boolean b = true;
boolean a = false;
boolean b = false;
boolean c = false;
boolean d = false;
boolean e = false;
boolean f = false;
boolean a1 = false;
boolean b1 = false;
boolean c1 = false;
boolean d1 = false;
boolean e1 = false;
boolean f1 = false;
//siwei
PImage bird;
PImage cat;
PImage dog;
PImage sihua;
PImage stu_b;
PImage stu_g;
PImage tutor;
PImage siwei_back;
PImage siweiCat;
PImage siwei_boy;
PImage siwei_girl;
PImage siwei_sihua;
PImage siwei_dog;
PImage siwei_cat;
PImage siwei_tutor;
PImage siwei_bird;

//water
PImage water_back;

PImage waterCat;
PImage water_boy;
PImage water_girl;
PImage water_sihua;
PImage water_dog;
PImage water_cat;
PImage water_tutor;
PImage water_bird;

float mx = mouseX;
float my = mouseY;

PImage enter;
PImage map;
PImage charac;

PImage check;
PImage win;
boolean isClick = false ;
boolean fromWin = false ; 
void setup() {
   enter = loadImage("enter.jpg");
  size(640, 480);
  //music
  minim = new Minim(this);
  popo= minim.loadFile("popo.mp3");
  bling = minim.loadFile("bling.mp3");
  bling1 = minim.loadFile("bling.mp3");
  dui = minim.loadFile("dui.mp3");
  dui1 = minim.loadFile("dui.mp3");
  dui2 = minim.loadFile("dui.mp3");
  dui3 = minim.loadFile("dui.mp3"); 
  dui4 = minim.loadFile("dui.mp3");
  dui5 = minim.loadFile("dui.mp3");
  dui6 = minim.loadFile("dui.mp3");
  dui7 = minim.loadFile("dui.mp3");
  dui8 = minim.loadFile("dui.mp3");
  dui9 = minim.loadFile("dui.mp3");
  dui10 = minim.loadFile("dui.mp3");
  dui11 = minim.loadFile("dui.mp3");
  pig= minim.loadFile("pig.mp3");
  win2= minim.loadFile("win.mp3");
  win3= minim.loadFile("win.mp3");
        charac =loadImage("charac.jpg");
      map = loadImage("map.png");
              bird = loadImage("bird.png");
        cat = loadImage("cat.png");
        dog = loadImage("dog.png");
        sihua = loadImage("sihua.png");
        stu_b = loadImage("stu_b.png");
        stu_g = loadImage("stu_g.png");
        tutor = loadImage("tutor.png");
        siwei_back = loadImage("siwei.jpg");

        siwei_cat = loadImage("siwei_cat.png");
        siwei_boy = loadImage("siwei_boy.png");
        siwei_girl = loadImage("siwei_girl.png");
        siwei_sihua = loadImage("siwei_sihua.png");
        siwei_dog = loadImage("siwei_dog.png");
        siwei_cat = loadImage("siwei_cat.png");
        siwei_tutor = loadImage("siwei_tutor.png"); 
        siwei_bird = loadImage("siwei_bird.png");
        check = loadImage("check.png");
        bird = loadImage("bird.png");
        cat = loadImage("cat.png");
        dog = loadImage("dog.png");
        sihua = loadImage("sihua.png");
        stu_b = loadImage("stu_b.png");
        stu_g = loadImage("stu_g.png");
        tutor = loadImage("tutor.png");

        water_back = loadImage("water.jpg");

        waterCat = loadImage("water_cat.png");
        water_boy = loadImage("water_boy.png");
        water_girl = loadImage("water_girl.png");
        water_sihua = loadImage("water_sihua.png");
        water_dog = loadImage("water_dog.png");
        water_cat = loadImage("water_cat.png");
        water_tutor = loadImage("water_tutor.png");
        water_bird = loadImage("water_bird.png");
        win= loadImage("win.jpg");

        check = loadImage("check.png");
}
void mouseReleased() {
  
  
  if ( (frame == 4 || frame == 0 || frame == 1 || frame==3 || frame==2) ){
    isClick = true ;
    
  }

  
  
    if (frame==2) {
    //cat
    if (mouseX>90 && mouseX<160 && mouseY>10 && mouseY<82) {
      dui.play(0);
      image(siwei_cat, 0, 0);
      image(check, 880, 100);
      a=true;
    }

    //dog
    else if (mouseX>250 && mouseX<320 && mouseY>420 && mouseY<492) {
      dui.play(0);
      image(siwei_dog, 0, 0);
      image(check, 885, 180);
      b=true;
    }

    //girl
    else if (mouseX>460 && mouseX<515 && mouseY>220 && mouseY<305) {
      dui.play(0);
      image(siwei_girl, 0, 0);
      image(check, 885, 260);
      c=true;
    }

    //boy
    else if (mouseX>560 && mouseX<613 && mouseY>220 && mouseY<310) {
      dui.play(0);
      image(siwei_boy, 0, 0);
      image(check, 885, 345);
      d=true;
    }

    //tutor
    else if (mouseX>100 && mouseX<160 && mouseY>320 && mouseY<408) {
      dui.play(0);
      image(siwei_tutor, 0, 0);
      image(check, 885, 433);
      e=true;
    }

    //bird
    else if (mouseX>400 && mouseX<500 && mouseY>120 && mouseY<199) {
      dui.play(0);
      image(siwei_bird, 0, 0);
      image(check, 885, 15);
      f=true;
    }

    //sihua
    else if (mouseX>360 && mouseX<415 && mouseY>210 && mouseY<296) {
      // dui.play(0);
      image(siwei_sihua, 0, 0);
      flower();
    }
  }


  if (frame==3) {
    //cat
    if (mouseX>720 && mouseX<790 && mouseY>90 && mouseY<162) {
      dui6.play(0);
      image(water_cat, 0, 0);
      image(check, 880, 100);
      a1=true;
    }

    //dog
    else if (mouseX>470 && mouseX<540 && mouseY>280 && mouseY<352) {
      dui.play(0);
      image(water_dog, 0, 0);
      image(check, 885, 180);
      b1=true;
    }

    //girl
    else if (mouseX>144 && mouseX<199 && mouseY>130 && mouseY<215) {
      dui.play(0);
      image(water_girl, 0, 0);
      image(check, 885, 260);
      c1=true;
    }

    //boy
    else if (mouseX>660 && mouseX<713 && mouseY>290 && mouseY<380) {
      dui.play(0);
      image(water_boy, 0, 0);
      image(check, 885, 345);
      d1=true;
    }

    //tutor
    else if (mouseX>80 && mouseX<140 && mouseY>410 && mouseY<498) {
      dui.play(0);
      image(water_tutor, 0, 0);
      image(check, 885, 433);
      e1=true;
    }

    //bird
    else if (mouseX>50 && mouseX<110 && mouseY>220 && mouseY<399) {
      dui.play(0);
      image(water_bird, 0, 0);
      image(check, 885, 15);
      f1=true;
    }

    //sihua
    else if (mouseX>455 && mouseX<510 && mouseY>75 && mouseY<161) {
      // dui.play(0);
      image(water_sihua, 0, 0);
      flower();
    }
  }
}

void draw() {

  if (fromWin){
   fromWin = false ;
  isClick = false ;
  }
  
  print (frame);

  int mx = mouseX;
  int my = mouseY;

  if (frame==0) {
    /*textSize(50);
     fill(#74D2FF);
     text("click to start", (width/2)-150, (height/2));*/
   
    image(enter, 0, 0);
    if (isClick && frame==0 ) {
      isClick = false;
      bling.play(0);
      frame=4;
    }
  }
  else if (frame==4) {
      // bling.play(0));
      image(charac, 0, 0);

      if (isClick && frame==4) {
        isClick = false ;
        bling1.play(0);
        frame=1;
      }
    }

    else if (frame==1) {
      frameRate(59);
      image(map, 0, 0);


      if ( isClick && frame==1 && mouseX< 500) {
        isClick = false;
        frame=2;
        print("left i am here!");
        popo.play(0);
        //siwei


        cha();
      }
      else if (isClick && frame==1 &&mouseX>500) {
        isClick = false;
        frame=3;
        print("right i am here!");

       // pig.play(0);

        water();



        //if

        //a = true;
      }
    }


    else if (frame==2) {
      //win2.pause();
      popo.play();

      if ((a==true && b==true && c==true && d==true && e==true && f==true ) ) {
       frameRate(0.13);
        image(win, 0, 0);
      
   
        popo.pause();
         win2.play(0);
        frame = 1;
        fromWin = true;
       
        a=false;  b=false;  c=false ;d=false ; e=false; f=false ;
       
      }
    }

    else if (frame==3) {
      //win2.pause();
      pig.play();
       
      if ((a1==true && b1==true && c1==true && d1==true && e1==true && f1==true)  ) { 
        
        win= loadImage("win.jpg");
        frameRate(0.13);
 
        image(win, 0, 0);
        pig.pause(); 
        win3.play(0);
         a1=false;  b1=false;  c1=false ;d1=false ; e1=false; f1=false ;
   
         frame = 1;
         fromWin = true ;
      
      }
    //  if(a1== false&& b1==false&&  c1==false &&d1==false && e1==false&& f1==false && mousePressed) {frame = 1;}
      
    }
}

void cha() {
  background(255);

  image(siwei_back, 0, 0);

  image(cat, 90, 10);//70*72
  image(cat, 870, 85);

  image(bird, 440, 120);//60*79
  image(bird, 873, 5);

  image(dog, 250, 420);//70*72
  image(dog, 870, 160);

  image(sihua, 360, 210);//55*86
  // image(sihua,880,255);

  image(stu_g, 460, 220);//55*85
  image(stu_g, 880, 235);

  image(stu_b, 560, 220);//53*90
  image(stu_b, 885, 315);

  image(tutor, 100, 320);//60*88
  image(tutor, 880, 403);
}

void mousePressed() {
// Radian
}

void water() {
  background(255);

  image(water_back, 0, 0);

  image(cat, 720, 90);//70*72
  image(cat, 870, 85);

  image(bird, 50, 220);//60*79
  image(bird, 873, 5);

  image(dog, 470, 280);//70*72
  image(dog, 870, 160);

  image(sihua, 455, 75);//55*86
  // image(sihua,880,255);

  image(stu_g, 144, 130);//55*85
  image(stu_g, 880, 235);

  image(stu_b, 660, 290);//53*90
  image(stu_b, 885, 315);

  image(tutor, 80, 410);//60*88
  image(tutor, 880, 403);
}
void flower (){
  
}

