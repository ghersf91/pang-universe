class Player {
    constructor(ctx, posX, width, height) {
        this.ctx = ctx
        this.playerPos = { x: posX, y: 500 }
        this.playerSize = { w: width, h: height }
        this.playerImage = `./images/munequito.png`
        this.imageInstance = undefined
        this.lives = 3

        this.init()
    }

    
    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = this.playerImage
    }

    draw() {
        this.ctx.drawImage(this.imageInstance, this.playerPos.x, this.playerPos.y, this.playerSize.w, this.playerSize.h)
    }
    moveLeft() { // cambiar números a relativos
         if (this.playerPos.x <= 45) {
            this.playerPos.x = 45
         }
        this.playerPos.x -= 45
    }

    moveRight() { // cambiar números a relativos
        if (this.playerPos.x >= 1275) {
           this.playerPos.x = 1275
         }
        this.playerPos.x += 45
    }
}