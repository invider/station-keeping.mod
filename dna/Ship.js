const TARGETY = 48
const SHIFTX = 172

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

        const axis = lab.cam.shell.x + lab.cam.shell.w/2

        this.y = TARGETY
        switch(this.dock.port) {
            case 1:
                const leftEdge = lab.cam.worldX(0)
                this.x = leftEdge - this.w
                this.startX = this.x
                this.dx = env.tune.dockingSpeed
                this.targetX = axis - SHIFTX
                break

            case 2:
                const rightEdge = lab.cam.worldX(rx(1))
                this.x = rightEdge + this.w
                this.startX = this.x
                this.dx = -env.tune.dockingSpeed
                this.targetX = axis + SHIFTX
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
