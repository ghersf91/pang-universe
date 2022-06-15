window.onload = () => {
    document.getElementById('start-button').onclick = () => {
        document.querySelector('.start-game').setAttribute('class', 'start-game hide')
        document.querySelector('canvas').classList.toggle('hide')

        startGame()
    }

    document.getElementById('game-over-button').onclick = () => {
        document.querySelector('.game-over').setAttribute('class', 'game-over hide')
        document.querySelector('canvas').classList.toggle('hide')

        startGame()
    }

    document.getElementById('you-win-button').onclick = () => {
        document.querySelector('.you-win').setAttribute('class', 'you-win hide')
        document.querySelector('canvas').classList.toggle('hide')

        startGame()
    }
}

function startGame() {
    bangApp.init('#bang')
}

const bangApp = {
    name: 'Bang application',
    author: 'Carolina Arlone, Ghers Fisman',
    version: '1.0.0',
    license: undefined,
    description: 'Canvas app for basic pang game',
    canvasSize: {
        w: undefined,
        h: undefined
    },
    intervalId: undefined,
    fps: 60,
    lives: [],
    bullets: [],
    balls: [],
    extraLifes: [],
    framesCounter: 0,
    ctx: undefined,

    init(bangId) {
        this.ctx = document.querySelector(bangId).getContext('2d')
        this.reset()
        this.setDimensions(bangId)
        this.createAll()
        this.createBall()
        this.drawAll()
        this.setEventListeners()
        console.log(this.lives)
    },

    setDimensions(bangId) {
        this.canvasSize = {
            w: 1400,
            h: 650
        }
        document.querySelector(bangId).setAttribute('width', this.canvasSize.w)
        document.querySelector(bangId).setAttribute('height', this.canvasSize.h)
    },

    drawBackground() {
        this.ctx.fillStyle = 'dodgerblue'
        this.ctx.fillRect(0, 0, this.canvasSize.w, this.canvasSize.h)

        this.ctx.fillStyle = 'saddlebrown'
        this.ctx.fillRect(0, 612.5, this.canvasSize.w, this.canvasSize.h / 8)

        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(this.canvasSize.w * 0.15, 0, this.canvasSize.w * 0.70, this.canvasSize.h / 8)

    },

    drawAll() {
        this.intervalId = setInterval(() => {
            this.clearAll()
            this.drawBackground()
            this.drawLives()
            this.player.draw()
            this.bullets.forEach(element => element.draw());
            this.clearBullets()
            this.balls.forEach(element => element.draw());
            this.extraLifes.forEach(element => element.draw());
            this.bulletBallColission();
            this.ballPlayerColission();
            this.generateExtraLifes();
            this.drawExtraLife();
            this.clearExtraLifes();
            this.playerExtraLifeColission();
            this.framesCounter > 5000 ? this.framesCounter = 0 : this.framesCounter++;
        }, 1000/this.fps)        
    },

    drawExtraLife() {
        this.extraLifes.forEach(element =>  {
            element.draw()
    })
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.canvasSize.w, this.canvasSize.h)
    },

    createAll() {
        this.player = new Player(this.ctx, 450, 80, 120) // cambiar números a relativos
    },

    createBall() {
        const newBall = new Ball(this.ctx, this.canvasSize, 600, 5, 200, 200, 15)  // cambiar números a relativos
        this.balls.push(newBall)
    },

    createMediumBallRight(ballPos) {
        const newMediumBall = new Ball(this.ctx, this.canvasSize, ballPos.x, ballPos.y, 100, 100, 16)  // cambiar números a relativos
        this.balls.push(newMediumBall)
    },

    createMediumBallLeft(ballPos) {
        const newMediumBall = new Ball(this.ctx, this.canvasSize, ballPos.x, ballPos.y, 100, 100, -16)  // cambiar números a relativos
        this.balls.push(newMediumBall)
    },

    createSmallBallLeft(ballPos) {
        const newSmallBall = new Ball(this.ctx, this.canvasSize, ballPos.x, ballPos.y, 50, 50, -18)  // cambiar números a relativos
        this.balls.push(newSmallBall)
    },

    createSmallBallRight(ballPos) {
        const newSmallBall = new Ball(this.ctx, this.canvasSize, ballPos.x, ballPos.y, 50, 50, 18)  // cambiar números a relativos
        this.balls.push(newSmallBall)
    },

    generateExtraLifes() {
        if (this.framesCounter % 200 === 0 && this.framesCounter !== 0) {
        this.extraLifes.push(new ExtraLife(this.ctx, Math.floor(Math.random() * (this.canvasSize.w - 0 + 1) + 0)))
        }
    },

    clearExtraLifes() {
        this.extraLifes = this.extraLifes.filter(xlife => xlife.extraLifePos.y < this.canvasSize.h)
    },

    setEventListeners() {
        document.onkeydown = e => {
            const { key } = e
            switch (key) {
                case 'ArrowLeft':
                    this.player.moveLeft()
                    break;
                case 'ArrowRight':
                    this.player.moveRight()
                    break;
                case ' ':
                    this.bullets.push(new Bullet(this.ctx, this.player.playerPos.x + this.player.playerSize.w / 2, this.player.playerPos.y))
                    break;
            }
        }
    },

    drawLives() {
        switch (this.lives.length) {
            case 0:
               selectHeartImage = './images/three-hearts.png'
                break;
            case 1:
                selectHeartImage = './images/two-hearts.png'
                break;
            case 2:
                selectHeartImage = './images/one-heart.png'
                break;
            default:
                break;
        }

        this.livesInstance = new Image ()
        this.livesInstance.src = selectHeartImage
        this.ctx.drawImage(this.livesInstance, 50, 8, 35, 35) // cambiar números a relativos

    },

    clearBullets() {
        this.bullets = this.bullets.filter(bullet => bullet.bulletPos.y > 0 - bullet.bulletSize.h)
    },

    restart() {
        this.bullets = []
        this.balls = []
        this.extraLifes = []
        this.createAll()
        this.createBall()
    },

    reset() {
        clearInterval(this.intervalId)
        this.lives = []
        this.bullets = []
        this.balls = []
        this.extraLifes = []
    },

    bulletBallColission() {
        this.balls.forEach((eachBall, index) => {
            this.bullets.forEach(eachBullet => {
                if (eachBall.ballPos.x < eachBullet.bulletPos.x + eachBullet.bulletSize.w &&
                    eachBall.ballPos.x + eachBall.ballSize.w > eachBullet.bulletPos.x &&
                    eachBall.ballPos.y < eachBullet.bulletPos.y + eachBullet.bulletSize.h &&
                    eachBall.ballSize.h + eachBall.ballPos.y > eachBullet.bulletPos.y) {
                    if (eachBall.ballSize.w === 200) {
                        this.createMediumBallRight(this.balls[index].ballPos)
                        this.createMediumBallLeft(this.balls[index].ballPos)
                        this.balls.splice(index, 1)
                    } else if (eachBall.ballSize.w === 100) {
                        this.createSmallBallRight(this.balls[index].ballPos)
                        this.createSmallBallLeft(this.balls[index].ballPos)
                        this.balls.splice(index, 1)
                    } else {
                        if (this.balls.length > 1) {
                            this.balls.splice(index, 1)
                        } else {
                            this.balls.splice(index, 1)
                            document.querySelector('canvas').setAttribute('class', 'hide')
                            document.querySelector('.you-win').classList.toggle('hide')
                            this.reset()
                        }
                    }
                    this.bullets.shift()
                }
            })
        })
    },

    ballPlayerColission() {
        this.balls.forEach((eachBall) => {
            if (eachBall.ballPos.x < this.player.playerPos.x + this.player.playerSize.w &&
                eachBall.ballPos.x + eachBall.ballSize.w > this.player.playerPos.x &&
                eachBall.ballPos.y < this.player.playerPos.y + this.player.playerSize.h &&
                eachBall.ballSize.h + eachBall.ballPos.y > this.player.playerPos.y) {
                this.lives.push('impact')
                this.restart()
                if (this.lives.length === this.player.lives) {
                    document.querySelector('canvas').setAttribute('class', 'hide')
                    document.querySelector('.game-over').classList.toggle('hide')
                    this.reset()
                    console.log('game over')
                } else {
                    console.log(this.lives)
                }
            }
        })
    },

    playerExtraLifeColission() {
        this.extraLifes.forEach((eachExtraLife) => {
            if (eachExtraLife.extraLifePos.x < this.player.playerPos.x + this.player.playerSize.w &&
                eachExtraLife.extraLifePos.x + eachExtraLife.extraLifeSize.w > this.player.playerPos.x &&
                eachExtraLife.extraLifePos.y < this.player.playerPos.y + this.player.playerSize.h &&
                eachExtraLife.extraLifeSize.h + eachExtraLife.extraLifePos.y > this.player.playerPos.y) {
                if (this.lives.length > 0) {
                    this.lives.shift()
                    this.extraLifes.shift()
                }  
                }

    })
}
}





