const TARGETY = 40
const SHIFTX = 35

const df = {
    state: 'docking',
    timer: 5,
}

class Ship {

    constructor(st) {
        this.w = res.ship.width
        this.h = res.ship.height
        augment(this, df)
        augment(this, st)

        this.y = TARGETY
        switch(this.dock.port) {
            case 1:
                this.x = -this.w
                this.dx = 10
                this.targetX = SHIFTX
                break

            case 2:
                const edge = lab.cam.worldX(rx(1))
                this.x = edge + this.w
                this.dx = -10
                this.targetX = edge - SHIFTX
                break
        }
    }

    evo(dt) {
        switch(this.state) {
            case 'docking': 
                this.x += this.dx*dt

                if (this.dx < 0 && this.x < this.targetX) {
                    this.x = this.targetX
                    this.state = 'trading'
                } else if (this.dx > 0 && this.x > this.targetX) {
                    this.x = this.targetX
                    this.state = 'trading'
                }
                break

            case 'trading':
                this.timer -= dt
                if (this.timer < 0) {
                    this.onDocked()
                    this.state = 'outbound'
                }
                break

            case 'outbound':
                this.x -= this.dx*dt
        }

    }

    draw() {
        save()
        translate(this.x, this.y)
        if (this.dx < 0) scale(-1, 1)
        image(res.ship, -this.w/2, -this.h/2, this.w, this.h)
        restore()
    }
}
