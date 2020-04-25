// @depends(dna/DynamicMesh)

const slide = 50
const maxSlide = 100

const R = 8

let number = 1
class Hero extends dna.DynamicMesh {

    constructor(st) {
        super(st)
        this.number = number++
        this.move = []
        this.items = []
        this.focus = false
        this.solid = false
        this.jetpackHeat = 0
        this.capacity = env.tune.maxStorage
    }

    init() {
        lab.station.registerHero(this)
        lib.vfx.teleport(this.x, this.y)
    }

    swipeFocus(selected) {
        if (this.focus === this.itemMenu) this.focus = this.lockerMenu
        else this.focus = this.itemMenu
        this.focus.select(selected)
    }

    use() {
        if (!this.touched) return

        if (this.touched instanceof dna.Locker) {
            if (!this.touched.locked) {
                this.itemMenu.show()
                this.lockerMenu.setKeeper(this.touched)
                this.lockerMenu.show()
                this.focus = this.itemMenu
            } else {
                sfx.play('beep', .6)
            }

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
        this.jetpackHeat -= dt

        if (this.move[1]) {
            // jetpack jump
            if (this.jetpackHeat < 0) {
                this.mv.y = -env.tune.jump * this.h
                this.jetpackHeat = env.tune.jetpackFq
                lib.vfx.poof(this.x, this.y+5)
                sfx.play('burn4', .1)
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

        let img = res.dude.dude[this.player]
        if (!img) img = res.dude.dude[0]

        if (this.lastDir) {
            scale(-1, 1)
            image(img, -R, -R, 2*R, 2*R)
        } else {
            image(img, -R, -R, 2*R, 2*R)
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
