// @depends(dna/FixedMesh)

const df = {
    solid: false,
    touchable: true,
    on: false,
    qty: 3,
    x: 0,
    y: 0,
    w: 8,
    h: 24,
    blinkTimer: 0,
}

class TradeControl extends dna.FixedMesh {

    constructor(st) {
        super(supplement(st, df))
    }

    use() {
        if (this.locked) {
            sfx.play('beep', .6)
            return
        }

        this.qty ++
        if (this.qty > env.tune.maxStorage) {
            this.qty = 1
        }
        sfx.play('selectHi', .7)
        if (this.onUse) this.onUse()
    }

    lock() {
        this.locked = true
    }

    unlock() {
        this.locked = false
    }

    blink(time) {
        this.blinkTimer = time || env.style.blinkTime
    }

    noblink() {
        this.blinkTimer = -1
    }

    value() {
        return this.qty
    }

    evo(dt) {
        this.blinkTimer -= dt
    }

    drawIndicator() {
        let hideLevels = false
        lineWidth(1)
        stroke(.5, 0, .2)
        if (this.blinkTimer > 0) {
            const period = this.blinkTimer%1
            if (period > .5) {
                hideLevels = true
            } else {
                stroke(.01, .5, .5)
            }
        }
        rect(this.x-this.w/2, this.y-this.h/2, this.w, this.h)

        if (hideLevels) return
        const g = 1
        const qty = this.qty
        const w = this.w - 2*g
        const h = (this.h-2*g)/env.tune.maxStorage - g

        let x = this.x - w/2
        let y = this.y + this.h/2 - h - 1.5*g

        const type = this.dock.type() || 'any'
        fill(env.style.color[type])
        for (let i = 0; i < qty; i++) {
            rect(x, y, w, h)
            y -= h + g
        }
    }

    draw() {
        if (!this.dock) return
        this.drawIndicator()
    }
}
