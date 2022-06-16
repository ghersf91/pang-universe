class Lives {
    constructor(ctx){
        this.ctx = ctx
        this.livesSize = { w: 500, h: 200}
        this.livesPos = {x: 600 , y: 8}
        this.livesImage = `./images/three-hearts.png`
        this.livesInstance = undefined
        this.init()
    }
    init() {
        this.livesInstance = new Image()
        this.livesInstance.src = this.livesImage
    }

    draw() {
        this.ctx.drawImage(this.livesInstance, this.livesPos.x, this.livesPos.y, this.livesSize.w, this.livesSize.h)
    }

}