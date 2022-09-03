class Form {
  constructor() {
    this.greetings = createElement("h2");
    this.input = createInput("nombre");
    this.buttonImg = createImg("./images/start.png");
    this.greetings2 = createElement("h2");
  }
  display() {
    this.input.position(380, 180);
    this.input.size(180, 30);
    this.buttonImg.position(475 + 50, 250);
    this.buttonImg.size(150, 50);

    this.buttonImg.mousePressed(() => {
      console.log();

      this.input.hide();
      this.buttonImg.hide();
      player.name = this.input.value();
      playerCount += 1;
      player.index = playerCount;
      player.addPlayer();
      player.updateCount(playerCount);
      this.greetings.html("Hola " + player.name);
      this.greetings.position(300, 180);
    });
  }

  hide() {
    this.buttonImg.hide();
    this.input.hide();
    this.greetings.hide();
  }
  end() {

    var reset = createButton("Reiniciar");
    reset.position(750, 20);
    reset.mousePressed(() => {
      player.updateBikesAtEnd(0);
      player.updateCount(0);
      game.update(0);
      var playerref = database.ref("jugadores");
      playerref.remove();
      this.greetings2.hide();
      window.location.reload();
    });


      this.greetings2.html(
      "Felicidades " + player.name + " Tu clasificación es " + player.rank
    );
    this.greetings2.position(300, 185);
  }
}

if (player.rank >= 4) {
 
}