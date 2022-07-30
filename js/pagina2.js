var game = new Phaser.Game(1350,650, Phaser.AUTO,'',{ preload: dados, create: cenario, update: atualiza});
var plataformas;
var portas;
var porta1;
var porta2;
var fase;
var jogador;
var inimigo;
var inimigoZ;
var fogo;
var estrela;
var estrelas=[];
var pontuacao;
var vida=3;
var textoPontos;
var textoVida;
var textoMorte;
var pontos = 0;
var teclas;
var chao1;
var chao=[];
var fogos=[];
var chao2;
var chao3;
var x1 = 0;
var x2 = 300;
var x3 =0;
var x4=80;
var x5=230;
var x6=210;
var x7 = 980;
var y1= 435;
var y2=290;
var m=0;
var c;
var somQueimadura;
var somColeta;
var somPorta;
var somPorta2;
var somMusica;
var somRevive;
var somEspaco;
var somGrito;
var somPuff;
var t=0;
var nX=0;
var nY;
var aux=0;
var aux1=0;
var tempo;
var sorteio=1;
var intervalo;
var vel;
var irEsquerda=false;
var irDireita=false;
var irCima=false;
var irBaixo=false;

function dados(){

    game.load.image('fase2','imagens/fase2.2.png');
    game.load.image('background','imagens/background5.png');
    game.load.image('plataforma_inteira','imagens/plataforma2.0.png');
    game.load.image('plataforma_flutuante','imagens/plataforma2.1.png');
    game.load.image('porta','imagens/porta2.png');
    game.load.image('chamas','imagens/chamas.png');
    game.load.image('estrela','imagens/star.png');
    game.load.spritesheet('player','imagens/ninjagirl.png',65.6,96);
    game.load.spritesheet('inimigo','imagens/explosions.png',56.5,85);
    game.load.spritesheet('inimigoZ','imagens/inimigoZ.png',108,63);

	  game.load.audio('queimadura','audio/cannon.ogg');
	  game.load.audio('pega','audio/coleta.ogg');
	  game.load.audio('portal','audio/win.ogg');
	  game.load.audio('portal2','audio/EnemyDeath.ogg');
    game.load.audio('musica','audio/song3.mp3');
    game.load.audio('revive','audio/Powerup.ogg');
    game.load.audio('puff','audio/puff.ogg');
    game.load.audio('grito','audio/grito.ogg');
    game.load.audio('space','audio/space.ogg');

}

function cenario(){

    var fase2;

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0,0,'fase2');
    game.add.sprite(0,0,'background');
    jogador= game.add.sprite(720,420,'player');
    inimigo=game.add.sprite(0,0,'inimigo');
    inimigoZ=game.add.sprite(720,0,'inimigoZ');
    fase=game.add.group();
	  fogo=game.add.group();
    plataformas= game.add.group();
    portas = game.add.group();
  	estrela=game.add.group();

	  somQueimadura=game.add.audio('queimadura',1,false);
	  somColeta=game.add.audio('pega',1,false);
	  somPorta=game.add.audio('portal',1,false);
	  somPorta2=game.add.audio('portal2',1,false);
    somMusica=game.add.audio('musica',1,true);
    somRevive=game.add.audio('revive',1,false);
    somPuff=game.add.audio('puff',1,false);
    somGrito=game.add.audio('grito',1,false);
    somEspaco=game.add.audio('space',1,false);

    setTimeout(function(){
        somMusica.play('',0,0.5,true);
    },13000);
    somEspaco.play('',0,0.5,false);

    fase2 = fase.create(650,0,'fase2');
    chao1=plataformas.create(0,600,'plataforma_inteira');

	  porta1 = portas.create(-30,30,'porta');
	  porta2=portas.create(1250,30,'porta');

    for(var i=0; i<7; i++){
      if(i<=4){
        chao[i]=plataformas.create(x1,y1,'plataforma_flutuante');
        x1+=387;
      }else{
        chao[i]=plataformas.create(x2,y2,'plataforma_flutuante');
        x2+=570;
      }
    }
    chao2=plataformas.create(-40,150,'plataforma_flutuante'); // plataforma flutuante 1+
    chao3=plataformas.create(1220,150,'plataforma_flutuante'); //plataforma flutuante 3+

	for(var i=0; i<5; i++){
		if(i<3){
			estrelas[i]=estrela.create(x4,300,'estrela');
			game.physics.arcade.enable(estrelas[i]);
			estrelas[i].enableBody=true;
		  x4 += 580;
		}else{
			estrelas[i]=estrela.create(x5,100,'estrela');
			game.physics.arcade.enable(estrelas[i]);
			estrelas[i].enableBody=true;
		  x5 += 850;
		}
	}

  for(var i=0; i<12; i++){
     if(i<6){
       fogos[i]=fogo.create(x6,540,'chamas');
       x6 += 25;
     }else{
       fogos[i]=fogo.create(x7,540,'chamas');
       x7 += 25;
     }

  }

    game.physics.arcade.enable(jogador);
    game.physics.arcade.enable(inimigo);
    game.physics.arcade.enable(inimigoZ);
    game.physics.arcade.enable(portas);
	  game.physics.arcade.enable(estrela);
    game.physics.arcade.enable(fogo);
    game.physics.arcade.enable(plataformas);

    plataformas.enableBody=true;
    jogador.enableBody=true;
    inimigo.enableBody=true;
    inimigoZ.enableBody=true;
	  estrela.enableBody=true;
    fogo.enableBody=true;
	  portas.enableBody=true;

    jogador.animations.add('left', [0,1,2,3,4,5,6,7,8],15, true);                  //animação do jogador
    jogador.animations.add('right', [13,14,15,16,17,18,19,20], 15, true);
    jogador.animations.play('right');
    jogador.animations.play('left');
    jogador.animations.stop();
    jogador.frame=10;

    inimigo.animations.add('left', [3],15, true);                  //animação do inimigo
    inimigo.animations.add('right', [3], 15, true);
    inimigo.animations.add('up', [3], 15, true);
    inimigo.animations.add('down', [3], 15, true);
    inimigo.animations.stop();
    inimigo.frame=3;

    inimigoZ.animations.add('left', [3],15, true);                  //animação do inimigo
    inimigoZ.animations.add('right', [3], 15, true);
    inimigoZ.animations.add('up', [3], 15, true);
    inimigoZ.animations.add('down', [3], 15, true);
    inimigoZ.animations.stop();
    inimigoZ.frame=3;

    inimigo.body.velocity.x=-400;
    inimigo.animations.play('left');
    irEsquerda=true;

    inimigo.body.velocity.y=-400;
    inimigo.animations.play('up');
    irCima=true;

    setInterval(function(){
      if(irEsquerda){
        inimigo.body.velocity.x=-400;
        inimigo.animations.play('left');
        irEsquerda= !irEsquerda;
      }else{
        inimigo.body.velocity.x=400;
        inimigo.animations.play('right');
        irEsquerda=!irEsquerda;
      }
      if(irCima){
        inimigo.body.velocity.y=-400;
        inimigo.animations.play('up');
        irCima= !irCima;
      }else{
        inimigo.body.velocity.y=400;
        inimigo.animations.play('down');
        irCima=!irCima;
      }
    },5000);

    inimigoZ.body.velocity.x=400;
    inimigoZ.animations.play('right');
    irDireita=true;

    inimigoZ.body.velocity.y=400;
    inimigoZ.animations.play('down');
    irBaixo=true;

    setInterval(function(){
      if(irDireita){
        inimigoZ.body.velocity.x=400;
        inimigoZ.animations.play('right');
        irDireita= !irDireita;
      }else{
        inimigoZ.body.velocity.x=-400;
        inimigoZ.animations.play('left');
        irDireita=!irDireita;
      }
      if(irBaixo){
        inimigoZ.body.velocity.y=400;
        inimigoZ.animations.play('down');
        irBaixo= !irBaixo;
      }else{
        inimigoZ.body.velocity.y=-400;
        inimigoZ.animations.play('up');
        irBaixo=!irBaixo;
      }
    },5000);

    inimigo.body.bounce.y=0.8;
    inimigo.body.bounce.x=0.8;
    inimigoZ.body.bounce.y=0.8;
    inimigoZ.body.bounce.x=0.8;
    jogador.body.gravity.y=900;
    jogador.body.bounce.y=0.2;
    jogador.body.collideWorldBounds=true;
    inimigo.body.collideWorldBounds=true;
    inimigoZ.body.collideWorldBounds=true;

    teclas = game.input.keyboard.createCursorKeys();

    textoPontos=game.add.text(800,0,'Pontuação: '+pontos,{font: '25px Arial',fill:'black'});
    textoVida=game.add.text(500,0,'Vida: '+vida,{font:'25px Arial',fill:'black'});

}

function atualiza(){

    game.physics.arcade.collide(jogador,plataformas,pisada);
    game.physics.arcade.collide(jogador,fogo,seQueima);
    game.physics.arcade.collide(inimigo,plataformas,pisada);
    game.physics.arcade.collide(inimigoZ,plataformas,pisada);
    game.physics.arcade.overlap(inimigo,jogador,seQueima);
    game.physics.arcade.overlap(inimigoZ,jogador,seQueima);
    game.physics.arcade.overlap(jogador,estrela,PegaEstrela);
    game.physics.arcade.overlap(jogador,porta1,portaPasse);
	  game.physics.arcade.overlap(jogador,porta2,portaPasse);




    //tempo=0;

    /*sorteio=Math.floor((Math.random()*6)+1);


    if(sorteio==1||sorteio==3||sorteio==5){
        inimigo.body.velocity.x=-150;
        inimigo.animations.play('left');
    }else if(sorteio==2||sorteio==4||sorteio==6){
        inimigo.body.velocity.x=150;
        inimigo.animations.play('right');
    }else{
        inimigo.body.velocity.x=0;
        inimigo.frame=3;
    }*/

    /*if(sorteio==1||sorteio==3||sorteio==5){

    intervalo=setInterval(function(){inimigo.body.velocity.x=-200;},2000);
    setTimeout(function(){clearInterval(intervalo);},1000);
  }*/
    //if(sorteio==2||sorteio==4||sorteio==6){
    //  irDireita();
    //  setTimeout(function(){
    //    inimigo.body.velocity.x=0;

    //  },2000);
    //}

    /*setInterval(function(){
      tempo=Math.floor((Math.random()*10)+0);
    },t);*/

    //setTimeout(function(){
        //nX=0;
    //inimigo.body.velocity.x=0;
    //irDireita();
    /*setInterval(function(){
       inimigo.body.velocity.x=0;
       irEsquerda();
    },(tempo*1000));*/
    //setInterval(function(){
       //inimigo.body.velocity.x=0;
       //irDireita();
    //},(tempo*1000));
    //jogador.body.velocity.x=0;

    //},3000);
    //if(nX<=5){
      //while(aux<5){
        //inimigo.body.velocity.x=0;
        //setInterval(function(){
      //    inimigo.body.velocity.x=0;
      //    irEsquerda();

       //},3000);
        //inimigo.animations.play('left');
        //aux++;
      //}
      //nX=0;
      /*setTimeout(function(){

      },2000);*/
    //}else{
      //while(aux1<5){
        //inimigo.body.velocity.x=0;
        //setInterval(function(){
      //      inimigo.body.velocity.x=0;
        //    irDireita();
        //},3000);

        //inimigo.animations.play('right');
        //aux1++;
      //}
      //setInterval(function(){
        //nX=0;
        //nX=Math.floor((Math.random()*10)+0);
      //},3000);
      //nX=0;
      /*setTimeout(function(){
        inimigo.body.velocity.x=0;
        inimigo.body.velocity.x=150;
        inimigo.animations.play('right');
      },2000);*/

    //}
    //nX=Math.floor((Math.radom()*10)+0);
    //nY=Math.floor((Math.radom()*10)+0);

    if(vida<=0){
        setTimeout(function(){
          window.location.href='gameover.html';
        },2000)
    }

    if(teclas.left.isDown){
        jogador.body.velocity.x=-150;
        jogador.animations.play('left');
    }else if(teclas.right.isDown){
        jogador.body.velocity.x=150;
        jogador.animations.play('right');
    }else{
        jogador.body.velocity.x=0;
        jogador.frame=10;
    }
    if(teclas.up.isDown&&jogador.body.touching.down){jogador.body.velocity.y=-550; }

}


function pisada(jogador,plataformas){
    if(jogador==inimigo||jogador==inimigoZ){
      somPuff.play('',0,1,false);
    }
    chao1.body.immovable=true;
    chao2.body.immovable=true;
    chao3.body.immovable=true;
    for(var i=0; i<7; i++){
        chao[i].body.immovable=true;
    }
    for(var i=0; i<12;i++){
        fogos[i].body.immovable=true;
    }
}

function PegaEstrela(person,obj){
    somColeta.play('',0,1,false);
	  obj.kill();
    pontos+=10;
    textoPontos.text = 'Pontuação: '+pontos;
}

function seQueima(){
    t++;
                                    //contador para tempo de toque e reação
    somGrito.play('',0,1,false);

    if(t>5){
      jogador.kill();
      vida--;
      t=0;
    }




    textoVida.text='Vida: '+vida;
    if(vida>0){
      jogador.revive();
    }else{
      somMusica.stop();
      textoMorte=game.add.text(450,230,'DESCANSE EM PAZ...',{font: '60px Arial',fill: 'red'});
      setTimeout(function(){
      window.location.href='gameover.html';
      },1500);
    }
}



function portaPasse(jog, door){
	if((door==porta2)&&pontos==50){
    jogador.kill();
    somPorta.play('',0,1,false);
    somMusica.stop();
    setTimeout(function(){
      window.location.href='gameWIN.html';
    },2000);
	}else if ((door==porta2)&&pontos<50){


    jogador.kill();
    setTimeout(function(){
      alert('FECHADA! PEGUE TODAS AS ESTRELAS!!!');
      jogador.revive();
      jogador.body.velocity.x=-600;
    },200);

	}

  if(door==porta1){
    somPorta2.play('',0,1,false);
    jogador.kill();
    vida--;
    if(vida>0){
       textoVida.text= 'Vida: '+vida;
       setTimeout(function(){
       somRevive.play('',0,1,false);
       jog.revive();
       jog.body.velocity.y=-650;
       },2000);
    }else{
       somMusica.stop();
       textoMorte=game.add.text(365,230,'DESCANSE EM PAZ...',{font: '60px Arial',fill: 'red'});
       setTimeout(function(){
       window.location.href='gameover.html';
     },1500);

      }
    }





    /*textoVida.text='Vida: '+vida;
    textoMorte=game.add.text(365,230,'DESCANSE EM PAZ...',{font:'60px Arial',fill:'red'});
    setTimeout(function(){
    window.location.href='gameover.html';
  },1500);*/

}


/*function sorteio(){

  Math.floor((Math.random()*6)+1);
}*/
