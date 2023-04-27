//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 12;
let raio = diametro / 2;

//variaveis da velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;


//variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 6;
let raqueteAltura = 90;

//variaveis da raquete do oponente
let xRaqueteOponente = 588;
let yRaqueteOponente = 150;
let veloidadeYOponente;
//variavel chance do oponente errar
let chanceDeErrar = 0;

//variavel colisao
let colidiu = false;

//variaveis do placar
let meusPontos = 0;
let pontosOponente = 0;

//variaveis sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  
  mostraRaquete(xRaquete,yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete,yRaquete);
  
  mostraRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente,yRaqueteOponente);
  
  incluiPlacar();
  marcaPonto();

}

function mostraBolinha(){
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
  if(xBolinha + raio > width || xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
    ponto.play();
  }
  
  if(yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x,y){
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

/*function verificaColisaoRaquete(){
  if(xBolinha - raio < xRaquete + raqueteComprimento &&
     yBolinha - raio < yRaquete + raqueteAltura &&
     yBolinha + raio > yRaquete)
    velocidadeXBolinha *= -1;
    raquetada.play();
}*/

function verificaColisaoRaquete(x,y){
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if(colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function calculaChanceDeErrar() {
  if (pontosOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }
}

function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
  calculaChanceDeErrar();
  
  /*if(keyIsDown(87)){
    yRaqueteOponente -= 10;
  }
  
  if(keyIsDown(83)){
    yRaqueteOponente += 10;
  }*/
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  
  fill(color(255,140,0));
  rect(250,10,40,20);
  fill(255);
  text(meusPontos, 270, 26);
  
  fill(color(255,140,0));
  rect(350,10,40,20);
  fill(255);
  text(pontosOponente, 370, 26);
}

function marcaPonto(){
  if(xBolinha > 595){
    meusPontos += 1;
  }
  if (xBolinha < 5){
    pontosOponente += 1;
  }
}