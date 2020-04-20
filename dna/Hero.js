// @depends(dna/DynamicMesh)

const slide = 50
const maxSlide = 100

const R = 8

class Hero extends dna.DynamicMesh {

    constructor(st) {
        super(st)
        this.move = []
        this.items = []
        this.focus = false
        this.solid = false
    }

    init() {
        lab.station.registerHero(this)
    }

    swipeFocus() {
        if (this.focus === this.itemMenu) this.focus = this.lockerMenu
        else this.focus = this.itemMenu
    }

    use() {
        if (!this.touched) return

        if (this.touched instanceof dna.Locker && !this.touched.locked) {
            this.itemMenu.show()
            this.lockerMenu.keeper = this.touched
            this.lockerMenu.show()
            this.focus = this.itemMenu

        } else if (this.touched.use) {
            this.touched.use()
        }
    }

    hideItems() {
        this.itemMenu.hide()
        this.lockerMenu.hide()
        this.focus = false
        sfx.play('close', .5)
    }

    activate(action) {
        if (this.focus) {
            // focus on items menu
            this.focus.activate(action)

        } else {
            if (action <= 4) {
                this.move[action] = true
            } else if (action === 5 || action === 7) {
                this.use()
            }
        }
    }

    deactivate(action) {
        this.move[action] = false
    }

    evo(dt) {
        this.touched = false

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

            if (this.touched) {
                fill('#ffff00')
                font('12px coolville')
                baseBottom()
                alignCenter()
                text('#' + this.touched.name, this.x, this.y - this.h/2)
            }
        }
    }
}
