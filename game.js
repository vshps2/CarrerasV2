class Game {
  constructor() {}

  getState() {
    var gameStateref = database.ref("gameState");
    gameStateref.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  async start() {
    form = new Form();
    form.display();
    player = new Player();
    player.getCount();

    bike1 = createSprite(100, 200);
    bike2 = createSprite(250, 200);
    bike3 = createSprite(400, 200);
    bike4 = createSprite(550, 200);
    bike1.scale = 0.1;
    bike2.scale = 0.1;
    bike3.scale = 0.1;
    bike4.scale = 0.1;
    bike1.setCollider("circle", 0, 0, 150);
    bike2.setCollider("circle", 0, 0, 150);
    bike3.setCollider("circle", 0, 0, 150);
    bike4.setCollider("circle", 0, 0, 150);
    bike1.debug = true;
    bike2.debug = true;
    bike3.debug = true;
    bike4.debug = true;

    bikes = [bike1, bike2, bike3, bike4];

    bike1.addImage(bike1img);
    bike1.addImage("blast", blastImage);

    bike2.addImage(bike2img);
    bike2.addImage("blast", blastImage);

    bike3.addImage(bike3img);
    bike3.addImage("blast", blastImage);

    bike4.addImage(bike4img);
    bike4.addImage("blast", blastImage);
  }

  play() {
    form.hide();
    Player.getPlayersInfo();
    player.getBikesAtEnd();
    
    if (allplayers !== undefined) {
      background("#263238");
      image(trackimg, 0, -height * 4, width, height * 5);

     var index = 0;
      var x = 215;
      var y;
      for (var p in allplayers) {
        index = index + 1;
        x = allplayers[p].positionX;
        y = allplayers[p].positionY;
        bikes[index - 1].x = x;
        bikes[index - 1].y = y;

        if (player.blast && player.index === index) {
          bikes[index - 1].changeImage("blast");
          bikes[index - 1].scale = 0.3;
        }

        if (keyIsDown(UP_ARROW) && !player.blast) {
          bikes[index - 1].rotation = allplayers[p].rotation;
        }

        if (keyIsDown(LEFT_ARROW) && !player.blast) {
          bikes[index - 1].rotation = allplayers[p].rotation;
        }

        if (keyIsDown(RIGHT_ARROW) && !player.blast) {
          bikes[index - 1].rotation = allplayers[p].rotation;
        }

        if (index === player.index) {
          fill("red");
          ellipse(x, y, 60, 60);
          bikes[index - 1].shapeColor = "red";

          camera.position.x = width / 2;
          camera.position.y = bikes[index - 1].y;
        }

        this.handleBikeCollision(player.index);
      }
    }

    if (keyIsDown(UP_ARROW) && !player.blast) {
      player.positionY -= 10;
      player.distance += 10;
      player.rotation = 0;
      player.update();
    }

    if (keyIsDown(LEFT_ARROW) && !player.blast) {
      player.positionX -= 5;
      player.rotation = -25;
      player.update();
    }

    if (keyIsDown(RIGHT_ARROW) && !player.blast) {
      player.positionX += 5;
      player.rotation = 25;
      player.update();
    }

    if (player.distance > 2450) {
      gameState = 2;
      player.rank += 1;
      player.update();
      player.updateBikesAtEnd(player.rank);
    }
    drawSprites();
  }

  handleBikeCollision(index) {
    if (index - 1 === 0) {
  console.log("player1");    
      if (
        bikes[index - 1].collide(bikes[1]) ||
        bikes[index - 1].collide(bikes[2]) ||
        bikes[index - 1].collide(bikes[3])
      ) {
        player.blast = true;
        player.update();
      }
    }
    
    if (index - 1 === 1) {
  console.log("player2");
      if (
        bikes[index - 1].collide(bikes[2]) ||
        bikes[index - 1].collide(bikes[3]) ||
        bikes[index - 1].collide(bikes[0])
      ) {
        player.blast = true;
        player.update();
      }
    }
    if (index - 1 === 2) {
  console.log("player3");
      if (
        bikes[index - 1].collide(bikes[3]) ||
        bikes[index - 1].collide(bikes[0]) ||
        bikes[index - 1].collide(bikes[1])
      ) {
        player.blast = true;
        player.update();
      }
    }
    if (index - 1 === 3) {
  console.log("player4");
      if (
        bikes[index - 1].collide(bikes[0]) ||
        bikes[index - 1].collide(bikes[2]) ||
        bikes[index - 1].collide(bikes[1])
      ) {
        player.blast = true;
        player.update();
      }
    }

  }
  

  end() {
    form.end();
  }
}
