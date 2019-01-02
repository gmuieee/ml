var myGamePiece;

function startGame() {
    myGamePiece = new component(30, 30, "red", 80, 75);
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
         window.addEventListener('keydown', function (e) {
            e.preventDefault();
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
    },
    stop : function() {
        clearInterval(this.interval);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.moveAngle = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.gravity = 1;
    this.gravitySpeed = 0;
    this.bounce = 1;





    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.restore();
    }

    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.angle += this.moveAngle * Math.PI / 180;
        this.x += (this.speedX) * Math.sin(this.angle);
        this.y += (this.speedY + this.gravitySpeed)* Math.cos(this.angle);
        this.hitBottom();
        if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.moveAngle = -2; }
    if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.moveAngle = 2; }
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = -(this.gravitySpeed * this.bounce);
        }
    }
    window.addEventListener('keydown', function (e) {
            e.preventDefault();
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.moveAngle = 0;
    myGamePiece.speed = 0;
    if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.moveAngle = -1; }
    if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.moveAngle = 1; }
    myGamePiece.newPos();
    myGamePiece.update();
}
