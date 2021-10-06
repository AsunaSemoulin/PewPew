document.getElementById("restartBtn").style.display = "none";

document.getElementById("startBtn").addEventListener("click", () => {
    document.getElementById("startBtn").remove();

    play();
})

document.getElementById("restartBtn").addEventListener("click", () => {
    document.getElementById("restartBtn").style.display = "none";

    play();
})

let play = () => {
    let app = new PIXI.Application({ width: 400, height: 400 });
    document.body.appendChild(app.view);  

    let score = 0;

    let playerSpeed = 10;
    let projectileSpeed = 10;
    
    let projectiles = [];
    
    let target = PIXI.Sprite.from("./assets/img/target.png");
    app.stage.addChild(target);
    
    let ship = PIXI.Sprite.from("./assets/img/player.png");
    app.stage.addChild(ship);
    
    ship.y = 400 - 32;
    
    let scoreText = new PIXI.Text('This is a PixiJS text',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
    app.stage.addChild(scoreText);

    let gameLoop = () => {
        updateBullets();
        scoreText.text = "Score: " + score;
    }
    
    let createBullet = () => {
        let projectile = new PIXI.Sprite.from("./assets/img/projectile.png");
        app.stage.addChild(projectile);
        projectile.x = ship.x + projectile.width / 2;
        projectile.y = ship.y - projectile.height;
    
        return projectile;
    }
    
    let updateBullets = (delta) => {
        for (let i = 0; i < projectiles.length; i++) {
            projectiles[i].position.y -= projectileSpeed;

            aBox = projectiles[i].getBounds();
            bBox = target.getBounds();

            if (aBox.x + aBox.width > bBox.x && aBox.x < bBox.x + bBox.width && aBox.y + aBox.height > bBox.y && aBox.y < bBox.y + bBox.height) {
                app.stage.removeChild(projectiles[i]);
                app.stage.removeChild(target);
                score++;
                setTarget();
                app.stage.addChild(target);
            }

            if (score >= 10) {
                let winText = new PIXI.Text("You win", {fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align : "center"});
                winText.x = 200;
                winText.y = 200;
                app.stage.addChild(winText);

                let die = () => {
                    score = 0;
                    document.body.removeChild(app.view);
                    document.getElementById("restartBtn").style.display = "block";
                }
                setTimeout(die, 2000);
            }
        }
    }
    
    let setTarget = () => {
        target.y = 100;
        target.x = Math.random() * 400;
    }

    app.ticker.add(gameLoop);
    
    document.addEventListener("keydown", (e) => {
        if (e.keyCode === 39) {
            if (ship.x >= 400) {
                ship.x = 0 + ship.width;
            } else {
                ship.x += playerSpeed;
            }
        }
        if (e.keyCode === 37) {
            if (ship.x <= 0) {
                ship.x = 400 - ship.width;
            } else {
                ship.x -= playerSpeed;
            }
        }
        if (e.keyCode === 32) {
            projectiles.push(createBullet());
        }
    })

    setTarget();
}
