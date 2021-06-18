// init canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// init audio
Audio.prototype.stop = function () {
    this.pause();
    this.currentTime = 0;
}

Audio.prototype.rePlay = function () {
    this.pause();
    this.currentTime = 0;
    this.volume = 0.09;
    this.play();
}
var audio = {
    theme: new Audio('assets/sounds/main-theme.mp3'),
    jump: new Audio('assets/sounds/smb_jump-small.wav'),
    bump: new Audio('assets/sounds/smb_bump.wav'),
    coin: new Audio('assets/sounds/smb_coin.wav'),
    worldClear: new Audio('assets/sounds/world_clear.wav')
}

audio.theme.loop = true;

// view port camera
const currentViewPort = {
    x: 0,
    y: 0,
}



// init parameter
// break animation;
let shouldBreak = false;

// init sprite image
const spriteImage = new Image();
const spriteBackground = new Image();
spriteBackground.src = "assets/background.png";
const haui = new Image();
haui.src = "assets/school.png";
const fpt = new Image();
fpt.src = "assets/company.png";
const angular = new Image();
angular.src = "assets/angular.png";
const react = new Image();
react.src = "assets/React.png";
const htmlcssjs = new Image();
htmlcssjs.src = "assets/htmlcssjs.png";
const winning = new Image();
winning.src = "assets/winning.png";
spriteImage.src = "assets/marioSprite.png";
const listBricks = new ListBrick();

// init const
// window with height
let w = window.innerWidth;
let h = window.innerHeight;
let screenH;
if (w > h) {
    if (h <= 768);
    w = 1920;
    h = 1080;
    screenH = (h * 8) / 12;
} else {
    screenH = (h * 9) / 12;
}
// const screenH = (h * 8) / 12;
const screenWDisplay = (w * 11) / 12;
const screenW = 3400;
const groundWidth = 40;
const gravity = 2.3;
const boxSize = 50;
const masat = 0.7;
const masatAir = boxSize / 50;
const wHitBoxPlayer = boxSize * 9 / 10;
const unit = 1; // ~ 1px when box size is 50px;
const speed = boxSize / 6;
const speedAir = (speed * 3) / 4;
const textDescriptionY = screenH > 1000 ? screenH - 500 : 50;
const sprPosition = {
    player_idle: { x: 0, y: 0 },
    player_jump: { x: 0, y: 35 },
    player_run: [{
        x: 0,
        y: 0
    },
    {
        x: 35,
        y: 0
    },
    ],
    coin: { x: 180, y: 0, width: 31, height: 37, gameWidth: 44.3, gameHeight: boxSize },
    coinDark: { x: 211, y: 0, width: 31, height: 37, gameWidth: 44.3, gameHeight: boxSize },
    coinDarker: { x: 241, y: 0, width: 31, height: 37, gameWidth: 44.3, gameHeight: boxSize },
    brick: { x: 140, y: 0, width: 35, height: 35, gameWidth: boxSize, gameHeight: boxSize },
    background: { x: 0, y: 0, width: 1000, height: 1000, gameWidth: 1000, gameHeight: 1000 },
    sky: { x: 0, y: 0, width: 1000, height: 500, gameWidth: 1000, gameHeight: 500 },
}

const listText = [{
    text: '2013 - 2018 Ha Noi University of Industry',
    y: textDescriptionY,
    x: 50,
},
{
    text: '2018 - 2021 FPT Software',
    y: textDescriptionY,
    x: 1200,
},
{
    text: 'Experience (Years)',
    y: textDescriptionY,
    x: 2200,
},
{
    text: '4 (Years)',
    y: textDescriptionY,
    x: 2565,
},
{
    text: '1 (Years)',
    y: textDescriptionY,
    x: 2767,
},
{
    text: '3 (Years)',
    y: textDescriptionY,
    x: 2960,
},
]
console.log(groundWidth, haui.height)
const listImgDecor = [{
    src: haui,
    y: screenH - groundWidth - 470,
    x: 230,
}, {
    src: fpt,
    y: screenH - groundWidth - 483,
    x: 1500,
}, {
    src: htmlcssjs,
    y: screenH - 500,
    x: 2565,
}, {
    src: react,
    y: screenH - 500,
    x: 2767,
}, {
    src: angular,
    y: screenH - 500,
    x: 2960,
}, {
    src: angular,
    y: screenH - 500,
    x: 2960,
}, {
    src: winning,
    y: screenH - groundWidth - 448,
    x: 3300,
},]




// animation constant
requestAnimation = (self) => {
    const returnValue = self.listValue[self.index];
    if (self.frameIndex < self.framePerSprite) {
        self.frameIndex++;
    } else {
        self.frameIndex = 0;
        if (self.index < self.listValue.length - 1) {
            self.index++;
        } else {
            self.index = 0;
        }
    }

    return returnValue;
};

function openInstruction() {
    anime.timeline({
        targets: '.game-instruction',
    })
        .add({
            width: [0, '80%'],
            height: [0, '50%'],
            padding: 25,
        })
        .add({
            width: ['80%', 0,],
            height: ['50%', 0,],
            padding: 0,
            delay: 5000
        })
}

function crateTextAnim(text) {
    listValue = []
    for (let i = 0; i < text.length; i++) {
        if (i !== text.length - 1) {
            listValue.push(text.substring(0, i) + '|');
        }
    }
    return listValue
}
const animationConstant = {
    commonAnim: {
        frameIndex: 0,
        index: 0,
        getAnim: () => { return requestAnimation(this) },
    },

    coinAnim: {
        ...this.commonAnim,
        framePerSprite: 10,
        listValue: [sprPosition.coinDark, sprPosition.coin, sprPosition.coinDark, sprPosition.coinDarker],
        get getAnim() { return requestAnimation(this) },
    },
    commonTextAnim: {},
};

canvas.setAttribute("width", screenWDisplay + "px");
canvas.setAttribute("height", screenH + "px");
let player = new Player(
    450,
    screenH - boxSize * 2,
    0,
    0,
    boxSize,
    boxSize
);
renderplayer();

function createMatrix(x, y, obj) {
    let yArr = [];
    for (let yI = 0; yI < y; yI++) {
        let xArr = [];
        for (let xI = 0; xI < x; xI++) {
            xArr.push(obj);
        }
        yArr.push(xArr);
    }

    return yArr;
}

//#region Object for game
const objType = {
    brick: 1,
    coin: 2,
    house: 3,
}

function BrickObj(xPos, yPos, type, width, height) {
    this.type = type;
    this.xOrigin = xPos;
    this.yOrigin = yPos;
    this.isShow = true;
    this.height = height;
    this.width = width;
    this.getYBottom = () => {
        return this.y + this.height;
    }
    this.getXRight = () => {
        return this.x + this.width;
    }
    this.onCollision = (params) => {
        switch (this.type) {
            case objType.coin:
                // alert('');
                this.isShow = false;
                audio.coin.rePlay();
                break;

            default:
                break;
        }
    }
    this.x = xPos;
    this.y = yPos;
    this.broken = false;
}

function Player(x, y, vx, vy, width, height) {
    let runStart = 0;
    let anim1 = false;
    this.jumping = true;
    this.x = x;
    this.y = y;
    this.xLastFr = x;
    this.yLastFr = y;
    this.getYBottom = (y) => {
        y = y === undefined ? this.y : y;
        return y + boxSize;
    }
    this.getXRight = (x) => {
        x = x === undefined ? this.x : x;
        return x + wHitBoxPlayer;
    }
    this.getXLeft = (x) => {
        x = x === undefined ? this.x : x;
        return x + boxSize - wHitBoxPlayer;
    }
    this.width = width;
    this.height = height;
    this.vx = vx || 0;
    this.vy = vy || 0;
    this.vxLastFr = this.vx;
    this.pressingLeft = false;
    this.pressingRight = false;
    this.isRight = true;
    this.getSpritePosition = () => {
        let returnPosition = {
            x: 0,
            y: 0,
        }
        if (this.jumping) {
            returnPosition = { ...sprPosition.player_jump }
        } else if (this.pressingLeft || this.pressingRight) {
            if (runStart === 4) {
                anim1 = !anim1;
                runStart = 0;
                // anim1 = false;
            } else {
                runStart++;
            }
            returnPosition = { ...sprPosition.player_run[anim1 ? 0 : 1] }
        } else {
            returnPosition = { ...sprPosition.player_idle }
        }

        if (this.isRight) {
            returnPosition.x += 70;
        }
        return returnPosition;
    }
    this.findCollision = ({ nextX }) => {
        const allBricks = listBricks && listBricks.getAll();
        const plYBottom = this.getYBottom();
        const collisionToBox = {
            top: false,
            right: false,
            bottom: false,
            left: false,
        }
        const lastFrYBottom = this.getYBottom(this.yLastFr);
        if (allBricks && allBricks.length) {
            for (const el of allBricks) {
                if (!el.isShow) {
                    continue;
                }
                if (!nextX) {
                    // top
                    if (!collisionToBox.top && this.vy > 0 && (lastFrYBottom <= el.y && plYBottom > el.y) && (this.getXRight() > el.x && this.getXLeft() < el.getXRight())) {
                        collisionToBox.top = el;
                        el.onCollision();
                    }

                    // bottom
                    if (this.vy < 0 && (this.y < el.getYBottom() && this.getYBottom(this.yLastFr) > el.getYBottom()) && (this.getXRight() > el.x && this.getXLeft() <= el.getXRight())) {
                        collisionToBox.bottom = el;
                        el.onCollision();
                    }
                }

                // left right
                if (nextX) {
                    // case box left
                    if (Math.round(this.vxLastFr) > 0 &&
                        (this.getXRight(nextX) > el.x && this.getXRight() < el.getXRight() ||
                            el.getXRight() > this.getXRight(nextX) && this.getXRight(nextX) > el.x) &&
                        (this.getYBottom() > el.y && this.y < el.getYBottom())) {
                        collisionToBox.left = el;
                        el.onCollision();
                    }
                    if (Math.round(this.vxLastFr) < 0 &&
                        (nextX < el.getXRight() && this.x > el.getXRight() ||
                            el.x < nextX && nextX < el.getXRight()) &&
                        (this.getYBottom() > el.y && this.y < el.getYBottom())
                    ) {
                        collisionToBox.right = el;
                        el.onCollision();
                    }
                }
            }
            return collisionToBox;
        }
    }
    this.shouldStopFallDown = (collisionBox) => {
        let shouldStop = false;

        // case meet ground
        if (this.y > screenH - this.height - groundWidth) {
            // this.vy = 0;
            this.y = screenH - this.height - groundWidth;
            shouldStop = true;
        }
        // case meet box
        else {
            if (!!collisionBox.top && collisionBox.top.type === objType.brick) {
                // alert(collisionBox.top.y)
                this.y = collisionBox.top.y - boxSize;
                shouldStop = true;
            }
        }

        if (shouldStop) {
            this.vy = 0;
            this.jumping = false;
        } else {
            this.jumping = true;
        }
    }
    this.shouldStopFlyUp = (collisionBox) => {
        if (collisionBox.bottom && collisionBox.bottom.type === objType.brick) {
            this.vy = height / 12
            audio.bump.rePlay();
        }
    }
    this.shouldStopLeftRight = (collisionBox) => {
        // check should stop right
        if (collisionBox.left && collisionBox.left.type === objType.brick || (this.getXLeft() <= 0 && this.vx < 0)) {
            this.vx = 0;
            return true
        }

        if (collisionBox.right && collisionBox.right.type === objType.brick || this.getXRight() >= screenW && this.vx > 0) {
            this.vx = 0;
            if (this.getXRight() >= screenW) {
                pauseGame();
                hideGame();
                audio.worldClear.volume = 0.09;
                audio.worldClear.play();
                document.getElementById('mainInfomation').classList.remove('hidden');
                anime({
                    targets: ['#infoText'],
                    duration: 1000,
                    width: [0, '250px'],
                    easing: 'steps(30)'
                });
                setTimeout(() => {
                    document.getElementById('mainInfomation').classList.add('hidden');
                    setTimeout(() => {
                        document.getElementById('workSection').classList.remove('hidden');
                        anime({
                            targets: ['#workSection'],
                            opacity: [0, 1],
                            easing: 'easeInOutQuad',
                        });
                    }, 0);

                }, 2000);
            }
            return true
        }

        return false;
    }

    this.recalculate = () => {
        // calculateX
        if (this.pressingLeft) {
            this.vx = -speed;
        }
        if (this.pressingRight) {
            this.vx = speed;
        }
        if (!this.jumping) {
            this.vx *= masat;
        } else if (this.pressingLeft || this.pressingRight) {
            this.vx *= masat;
        }
        const nextX = this.x + vx;
        let collisionBox = this.findCollision({ nextX });
        if (!this.shouldStopLeftRight(collisionBox) && this.vxLastFr !== 0) {
            this.x += this.vx;
        }

        // calculate Y
        this.vy += gravity;
        this.y += this.vy;
        collisionBox = this.findCollision({});
        this.shouldStopFallDown(collisionBox);
        this.shouldStopFlyUp(collisionBox);

        this.xLastFr = this.x;
        this.yLastFr = this.y;
        this.vxLastFr = this.vx;
    };
    this.jump = () => {
        if (!this.jumping && !this.pressingJump) {
            audio.jump.rePlay();
            this.vy = -this.height / 1.5;
            this.jumping = true;
        }
        this.pressingJump = true;
    };
    this.goLeft = () => {
        if (player.vx < unit * 12) {
            this.pressingLeft = true;
            this.pressingRight = false;
            this.isRight = false;
        }
    };
    this.goRight = () => {
        if (player.vx > -unit * 12) {
            this.pressingLeft = false;
            this.pressingRight = true;
            this.isRight = true;
        }
    };
}

//#endregion

//#region draw object 
/**
 * Draw brick
 * @param xPos position in map 
 * @param yPos position in map 
 */
function drawBrick(brickObject, spriteAnimation) {
    if (!brickObject.isShow) {
        return;
    }
    let positionConst;
    switch (brickObject.type) {
        case 1:
            positionConst = sprPosition.brick;
            break;
        case 2:
            positionConst = spriteAnimation;
            break;

        default:
            positionConst = sprPosition.brick;
            break;
    }
    const sprPos = { ...positionConst }
    if (brickObject.type === 2) {
        // ctx.filter = "brightness(" + brickObject.bright + "%)";
    }
    // debugger;
    ctx.drawImage(spriteImage, sprPos.x, sprPos.y, sprPos.width, sprPos.height, brickObject.x, brickObject.y, sprPos.gameWidth, sprPos.gameHeight);
    if (brickObject.type === 2) {
        // ctx.filter = "brightness(100%)";
    }
}
//#endregion

//#region public function

//#endregion

//#region  mainflow
function renderplayer() {
    const sprPos = player.getSpritePosition();
    ctx.drawImage(spriteImage, sprPos.x, sprPos.y, 35, 35, player.x, player.y, player.width, player.height);
}

//#region background
function drawBackground() {
    const sprPos = sprPosition.background;
    for (i = 0; i * sprPos.gameWidth <= screenW; i++) {
        ctx.drawImage(spriteBackground, sprPos.x, sprPos.y, sprPos.width, sprPos.height, i * sprPos.gameWidth, screenH - sprPos.gameHeight, sprPos.gameWidth, sprPos.gameHeight);
    }
}

function drawBuilding() {
    for (const element of listImgDecor) {
        ctx.drawImage(element.src, element.x, element.y);
    }
}
//#endregion
function drawText(ctx, text, x = 0, y = 0, font = "30px Consolas, monospace") {
    if (!ctx || !text) {
        return;
    }
    // draw text
    ctx.font = font;
    ctx.fillStyle = "white";
    ctx.fillText(text, x, y);
    ctx.strokeStyle = "black";
    ctx.strokeText(text, x, y);
}

function drawAllText(ctx) {
    // draw list text descriptions
    for (const el of listText) {
        drawText(ctx, el.text, el.x, el.y);
    }
}


function animate() {
    // call again next time we can draw
    // currentview

    if (!shouldBreak) {
        setTimeout(() => {
            requestAnimationFrame(animate);
            // camera move
            if (player.x > (screenWDisplay) / 2 && player.x < 3000) {
                // currentViewPort.x = player.x - screenWDisplay;
                const nextXViewPort = player.x - screenWDisplay / 2;
                // currentViewPort.x - nextXViewPort;
                ctx.translate((currentViewPort.x - nextXViewPort), 0);
                // currentViewPort.x = nextXViewPort;
                currentViewPort.x = nextXViewPort;
            }

            //clear before render
            ctx.clearRect(0, 0, screenW, screenH);
            // draw background.
            drawBackground();
            drawBuilding();
            // draw all text;
            drawAllText(ctx);

            // draw brick
            listBricks.drawAllBrick();
            // recalculate position and render player
            player.recalculate();
            renderplayer();
        }, 1000 / 60);
    }
}

function rerenderScene() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
}

function ListBrick() {
    // const baseBrickPosY = (height) => screenH - height * boxSize;
    this.listBrick = [];

    // fromW from left to estimate number of brick;
    // fromH from bottom to estimate number of brick;
    this.addBrick = (fromW, fromH, numberOfBrick, type) => {
        const posY = screenH - fromH * boxSize;
        const posX = fromW * boxSize;
        let newPosX = 0;
        let width = 0;
        let height = 0;
        for (let i = 0; i < numberOfBrick; i++) {
            switch (type) {
                case 1:
                    newPosX = posX + i * boxSize;
                    width = sprPosition.brick.width;
                    height = sprPosition.brick.height;
                    break;
                case 2:
                    newPosX = posX + i * boxSize + 3;
                    width = sprPosition.coin.width;
                    height = sprPosition.coin.height;
                    break;
                default:
                    newPosX = posX + i * boxSize;
                    break;
            }
            this.listBrick.push(new BrickObj(newPosX, posY, type, width, height));
        }
    }

    this.drawAllBrick = () => {
        const position = animationConstant.coinAnim.getAnim;
        for (const el of this.listBrick) {
            drawBrick({ ...el, }, position);
        }
    }

    this.getAll = () => {
        return this.listBrick;
    }
}

function playerJump() {
    player.jump();
}

function initDefaultBricks() {
    // listBricks = new ListBrick();
    // matrixBridge.reverse();
    const matrixBridge = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]
    for (let i = 0; i < matrixBridge.length; i++) {
        for (let j = 0; j < matrixBridge[i].length; j++) {
            if (matrixBridge[i][j])
                listBricks.addBrick(j + 1, matrixBridge.length - i + 1, 1, matrixBridge[i][j]);
        }
    }
    listBricks.drawAllBrick();
}

function initGame() {
    let commonInfo = document.getElementById("commonInfomation");
    let gameContainer = document.getElementById("gameContainer");
    anime.timeline({
        duration: 500,
        easing: 'easeOutExpo',
    }).add({
        targets: gameContainer,
        opacity: [0, 1],
        begin: () => {
            gameContainer.classList.remove("hidden");
        },
        borderRadius: ['50%', 0],
        delay: 300,
        offset: 100,
        complete: () => {
            openInstruction();
        },
    })




    shouldBreak = true;
    // player = new Player(screenWDisplay / 3, screenH / 3, 0, 0, boxSize, boxSize);
    ctx.clearRect(0, 0, screenH, screenW);
    ctx.fillStyle = "#fff2f2";
    ctx.fillRect(player.x, player.y, player.width, player.height);

    initDefaultBricks();
    setTimeout(() => {
        // TODO: to play sound
        audio.theme.volume = 0.09;
        audio.theme.play();
        shouldBreak = false;
        // rerenderScene();
        renderplayer();
        animate();
        // ctx.transform(null, null, null, null, 100, 0);
    }, 100);
    window.addEventListener("keydown", e => {
        switch (e.code) {
            case "Space":
                player.jump();
                e.preventDefault();
                break;
            case "ArrowLeft":
                player.goLeft();
                e.preventDefault();
                break;
            case "ArrowRight":
                player.goRight();
                e.preventDefault();
                break;
            case "ArrowUp":
                e.preventDefault();
                break;
            case "ArrowDown":
                e.preventDefault();
                break;
            default:
                break;
        }
    });
    window.addEventListener("keyup", e => {
        e.preventDefault();
        switch (e.code) {
            case "Space":
                player.pressingJump = false;
                break;
            case "ArrowLeft":
                player.pressingLeft = false;
                break;
            case "ArrowRight":
                player.pressingRight = false;
                break;
            default:
                break;
        }
    });
}

function pauseGame() {
    shouldBreak = true;
    audio.theme.stop();
}

function continueGame() {
    shouldBreak = false;
    audio.theme.volume = 0.09;
    audio.theme.play();
}

//#endregion mainflow