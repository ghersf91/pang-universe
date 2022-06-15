class ExtraLife {
    constructor(ctx, extraLifePosX) {
        this.ctx = ctx
        this.extraLifePos = { x: extraLifePosX, y: 0}
        this.extraLifeSize = { w: 40, h: 40 } // cambiar números a relativos
        this.extraLifeVel = { x: 5, y: 0 }
        this.extraLifeImage = `./images/live.png`
        this.imageInstance = undefined
        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = this.extraLifeImage
    }

    draw() {
        this.move()
        this.ctx.drawImage(this.imageInstance, this.extraLifePos.x, this.extraLifePos.y, this.extraLifeSize.w, this.extraLifeSize.h)
    }

    move() {
        this.extraLifePos.y += 2
    }
}