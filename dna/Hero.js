// @depends(dna/DynamicMesh)

const slide = 50
const maxSlide = 100

const R = 16

class Hero extends dna.DynamicMesh {

    constructor(st) {
        super(st)
        this.move = []
    }

    activate(action) {
        this.move[action] = true
    }

    deactivate(action) {
        this.move[action] = false
    }

    evo(dt) {
        if (this.move[1]) {
            // jump
            if (this.mv.y > -1 && this.mv.y < 1) {
                this.mv.y = -env.tune.jump * this.h
            }
        }
        if (this.move[2]) {
            this.mv.x = min(this.mv.x - env.tune.slide * dt, -env.tune.maxSlide)
            this.lastDir = 1
        }
        if (this.move[4]) {
            this.mv.x = max(this.mv.x + env.tune.slide * dt, env.tune.maxSlide)
            this.lastDir = 0
        }
        super.evo(dt)
    }

    draw() {
        save()
        blocky()
        translate(this.x, this.y)

        if (this.lastDir) {
            scale(-1, 1)
            image(res.dude.dude[1], -R, -R, 2*R, 2*R)
        } else {
            image(res.dude.dude[1], -R, -R, 2*R, 2*R)
        }
        restore()

        if (this.debug) {
            super.draw()
            fill('#ffff00')
            font('24px moon')
            baseBottom()
            alignCenter()
            text('#' + this.action, this.x, this.y - this.h/2)
        }
    }
}
