document.getElementById("startBtn").addEventListener("click", () => {
    let app = new PIXI.Application({ width: 400, height: 400 });
    document.body.appendChild(app.view);  

    let playerSpeed = 10;
    let projectileSpeed = 10;
    
    let projectiles = [];
    
    let ship = PIXI.Sprite.from("./assets/img/player.png");
    app.stage.addChild(ship);
    
    ship.y = 400 - 32;
    
    let gameLoop = () => {
        updateBullets();
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
    
    
        }
    }
    
    let setTarget = () => {
        let target = PIXI.Sprite.from("./assets/img/projectile.png");
        target.y = 100;
        target.x = 200;
    }

    app.ticker.add(gameLoop);
    
    document.addEventListener("keydown", (e) => {
        if (e.keyCode === 39) {
            if (ship.x >= 400) {
                ship.x = 0 + ship.width;
            } else {
                ship.x += projectileSpeed;
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
})