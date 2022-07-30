var game = new Phaser.Game(1350,650, Phaser.AUTO,'',{ preload: dados, create: cenario, update: atualiza});

var plataformas;
var chao=[];
var portas;
var porta1;
var fase;
var fase1;
var estrela;
var estrelas=[];
var jogador;
var teclas;
var pontos=0;
var vida=3;
var textoPontuacao;
var textoVida;
var textoMorte;
var textoPassou;
var x1=0;
var y1=600;
var x2=80;
var x3=160;
var x4=480;
var y2=200;
var somPega;
var somPorta;
var somMusica;
var somRevive;
var somCaiu;
var front;
var front1;
var front2;

function dados(){
    game.load.image('fase1','imagens/fase1.png');
    game.load.image('background','imagens/background2.png');
    game.load.image('plataforma_bloco','imagens/plataforma2.2.png');
    game.load.image('plataforma_flutuante','imagens/plataforma2.0.1.png');
    game.load.image('porta','imagens/porta2.png');
    game.load.image('estrela','imagens/star.png');
    game.load.image('fronteira1','imagens/fronteira1.png');
    game.load.image('fronteira2','imagens/fronteira2.png');
    game.load.spritesheet('jogador','imagens/ninjagirl.png',65.6,96);

    game.load.audio('musica','audio/song5.mp3');
    game.load.audio('pega','audio/coleta.ogg');
    game.load.audio('porta1','audio/winning2.ogg');
    game.load.audio('caiu','audio/BossDeath.ogg');
    game.load.audio('revive','audio/Powerup.ogg');
}

function cenario(){

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0,0,'fase1');
    game.add.sprite(0,0,'background');
    jogador= game.add.sprite(0,420,'jogador');
    fase=game.add.group();
    fase1 = fase.create(680,0,'fase1');
    plataformas= game.add.group();
    portas = game.add.group();
    estrela=game.add.group();
    porta1 = portas.create(80,80,'porta');
    front=game.add.group();
    front1=front.create(375,645,'fronteira1');
    front2=front.create(932,645,'fronteira2');

    somPega=game.add.audio('pega',1,false);
    somPorta=game.add.audio('porta1',1,false);
    somMusica=game.add.audio('musica',1,true);
    somCaiu=game.add.audio('caiu',1,false);
    somRevive=game.add.audio('revive',1,false);

    somMusica.play('',0,1,true);

    game.physics.arcade.enable(jogador);
    game.physics.arcade.enable(plataformas);
    game.physics.arcade.enable(portas);
    game.physics.arcade.enable(estrela);
    game.physics.arcade.enable(front);
    plataformas.enableBody=true;
    jogador.enableBody=true;
    portas.enableBody=true;
    porta1.body.immovable=true;
    front1.body.enableBody=true;
    front2.body.enableBody=true;

    for(var i=0; i<5; i++){
        if(i<2){
            chao[i]=plataformas.create(x1,y1,'plataforma_bloco');
            chao[i].body.immovable=true
            x1+=550;
            y1-=50;
        }else{
            chao[i]=plataformas.create(x2,y2,'plataforma_flutuante');
            x2+=480;
            y2+=100;
        }

    }

    for(var i=0; i<7; i++){
  		if(i<5){
  			estrelas[i]=estrela.create(x3,420,'estrela');
			  game.physics.arcade.enable(estrelas[i]);
			  estrelas[i].enableBody=true;
  		  x3 += 200;
  		}else{
  			estrelas[i]=estrela.create(x4,140,'estrela');
			  game.physics.arcade.enable(estrelas[i]);
			  estrelas[i].enableBody=true;
  		  x4 += 480;
  		}
  	}


    jogador.animations.add('left', [0,1,2,3,4,5,6,7,8,9],15, true);
    jogador.animations.add('right', [12,13,14,15,16,17,18,19,20], 15, true);
    jogador.animations.play('right');
    jogador.animations.play('left');
    jogador.animations.stop();
    jogador.frame=10;

    jogador.body.gravity.y=780;
    jogador.body.bounce.y=0.2;
    jogador.body.collideWorldBounds=false;


    teclas = game.input.keyboard.createCursorKeys();
	  textoPontuacao=game.add.text(850,0,'Pontuação: '+pontos,{font: '25px Arial',fill:'black'});
    textoVida=game.add.text(550,0,'Vida: '+vida,{font: '25px Arial',fill:'black'});
}

function atualiza(){


    game.physics.arcade.collide(jogador,plataformas,pisada);  //função que relaciona a colisão do personagem com o chão
	  game.physics.arcade.collide(jogador,estrela,pegaEstrela);
    game.physics.arcade.collide(jogador,portas,passPorta);
    game.physics.arcade.overlap(jogador,front,passFront)

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

function pisada(){
    for(var i=0; i<5; i++){
        chao[i].body.immovable=true;    //função que permite ao personagem, caso toque o chão, ficar sobre ele, em equilibrio
    }
}

function pegaEstrela(jog,obj){
    somPega.play('',0,1,false);
    obj.kill();
    pontos+=10;
    textoPontuacao.text = 'Pontuação: '+pontos;
}

function passPorta(jog,port){
    somMusica.stop();
    somPorta.play('',0,1,false);
    jogador.kill();
    textoPassou=game.add.text(345,240,'VOCÊ PASSOU DE FASE!',{font: '60px Arial',fill: 'green'});
    setTimeout(function(){
      window.location.href='fase2.html';
    },3000);
}

function passFront(jog){
     jog.kill();
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
        somCaiu.play('',0,1,false);
        textoMorte=game.add.text(450,240,'DESCANSE EM PAZ...',{font: '60px Arial',fill: 'red'});
        setTimeout(function(){
        window.location.href='gameover.html';
      },1500);
     }
}
