const TARGETY = 48
const SHIFTX1 = 32
const SHIFTX2 = 98

let id = 0
const df = {
    state: 'docking',
}

class Ship {

    constructor(st) {
        this.name = 'ship' + (++id)
        this.w = res.ship.width
        this.h = res.ship.height
        augment(this, df)
        augment(this, st)

        this.y = TARGETY
        switch(this.dock.port) {
            case 1:
                this.x = -this.w
                this.startX = this.x
                this.dx = 10
                this.targetX = SHIFTX1
                break

            case 2:
                const edge = lab.cam.worldX(rx(1))
                this.x = edge + this.w
                this.startX = this.x
                this.dx = -10
                this.targetX = edge - SHIFTX2
                break
        }
    }

    contact() {
        this.state = 'trading'
        this.x = this.targetX
        this.timer = env.tune.stayDocked = 5
        env.score.dockingOps ++
        sfx.play('burn1', 1)
    }

    evo(dt) {
        switch(this.state) {
            case 'docking': 
                this.x += this.dx*dt

                if (this.dx < 0 && this.x < this.targetX) {
                    this.contact()
                } else if (this.dx > 0 && this.x > this.targetX) {
                    this.contact()
                }
                break

            case 'trading':
                this.timer -= dt
                if (this.timer < 0) {
                    this.onDocked()
                    this.state = 'outbound'
                    sfx.play('burn2', 1)
                }
                break

            case 'outbound':
                this.x -= this.dx*dt

                if (this.dx < 0 && this.x > this.startX) this.kill()
                else if (this.dx > 0 && this.x < this.startX) this.kill()
        }

    }

    draw() {
        save()
        translate(this.x, this.y)
        if (this.dx < 0) scale(-1, 1)
        image(res.ship, -this.w/2, -this.h/2, this.w, this.h)
        restore()
    }

    kill() {
        this.__.detach(this)
    }
}
