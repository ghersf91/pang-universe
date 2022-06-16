class Ball {
    constructor(ctx, canvasSize, posX, posY, sizeW, sizeH, ballVelX) {
        this.ctx = ctx
        this.canvasSize = canvasSize
        this.ballPos = { x: posX, y: posY }
        this.ballSize = { w: sizeW, h: sizeH }
        this.ballVel = { x: ballVelX, y: -8 }
        this.bounceVel = { x: 0, y: -15 } 
        this.physics = { gravity: 0.3 }
        this.ballImage = `./images/marte.png`
        this.imageInstance = undefined

        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = this.ballImage
    }

    draw() {
        this.move()
        this.ctx.drawImage(this.imageInstance, this.ballPos.x, this.ballPos.y, this.ballSize.w, this.ballSize.h)
    }

    move() {
        this.ballVel.y += this.physics.gravity

        this.ballPos.x += this.ballVel.x
        this.ballPos.y += this.ballVel.y
        if (this.ballPos.y >= this.canvasSize.h - this.ballSize.h) {
            this.ballVel.y = this.bounceVel.y
        }

        if (this.ballPos.y <= 0) {
            this.ballVel.y *= -1
        }

        if (this.ballPos.x >= this.canvasSize.w - this.ballSize.w) {
            this.ballVel.x *= -1
        }

        if (this.ballPos.x <= 0) {
            this.ballVel.x *= -1
        }
    }
}