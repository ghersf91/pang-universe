    class Bullet {
        constructor(ctx, posX, posY) {
            this.ctx = ctx
            this.bulletPos = {x: posX, y: posY}
            this.bulletImage = `./images/bala.png`
            this.imageInstance = undefined
            this.bulletSize = { w: 21, h: 28 }

            this.init()
            this.move()
        }

    
    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = this.bulletImage
    }

    draw() {
        this.move()
        this.ctx.drawImage(this.imageInstance, this.bulletPos.x, this.bulletPos.y, this.bulletSize.w, this.bulletSize.h)
    }

    move() {
        this.bulletPos.y -= 5
    }
    
}