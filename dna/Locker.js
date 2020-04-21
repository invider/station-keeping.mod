// @depends(dna/FixedMesh)

const df = {
    solid: false,
    touchable: true,
    blinkTimer: 0,
    x: 0,
    y: 0,
    w: 16,
    h: 32,
}

class Locker extends dna.FixedMesh {

    constructor(st) {
        super(supplement(st, df))
        this.items = []
        this.capacity = env.tune.maxStorage
        augment(this, df)
        augment(this, st)
    }

    empty() {
        let qty = 0
        for (let i = 0; i < this.items.length; i++) {
            this.items[i] = false
            qty ++
        }

        return qty
    }

    populate(type, qty) {
        let i = 0
        while(i < this.capacity && qty > 0) {
            if (!this.items[i]) {
                this.items[i] = { type: type }
                qty--
            }
            i++
        }
    }

    burn(dt) {
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i]
            if (item && item.type === 'chip') {
                if (rnd() < env.tune.chipBurnRate * dt) {
                    item.type = 'broken'
                    sfx.play('deviceOff', 1)
                    this.blink()
                }
            }
        }
    }

    lock() {
        this.locked = true
    }

    unlock() {
        this.locked = false
    }

    first() {
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i]) return this.items[i].type
        }
    }

    qty() {
        let total = 0
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i]) total ++
        }
        return total
    }

    numberOf(type) {
        let total = 0
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i]
            if (item && item.type === type) total ++
        }
        return total
    }

    value() {
        let total = 0
        const stc = lab.stc
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i]) {
                const type = this.items[i].type
                total += stc.getPrice(type)
            }
        }
        return total
    }

    install() {
        if (!this.type) return

        if (this.type === 'control' || this.type === 'storage') {
            lab.station[this.type][this.subtype] = this
            if (this.fill) {
                if (this.type === 'control') {
                    this.populate('chip', this.fill)
                } else {
                    this.populate(this.subtype, this.fill)
                }
            }

        } else if (this.subtype && this.fill) {
            this.populate(this.subtype, this.fill)
        }
    }

    // find a matching storage item for consumption by the system
    extractResource() {
        if (this.type !== 'storage') return false
        for (let i = this.items.length-1; i >= 0; i--) {
            const item = this.items[i]
            if (item && item.type === this.subtype) {
                this.items[i] = false
                return true
            }
        }
        return false
    }

    blink() {
        this.blinkTimer = env.style.blinkTime
    }

    evo(dt) {
        this.blinkTimer -= dt
    }

    drawIndicator() {
        const qty = this.qty()
        const bw = env.style.locker.indicator.width
        const bh = env.style.locker.indicator.height
        const bg = env.style.locker.indicator.gap
        const w = this.capacity*bw + (qty-1)*bg

        let x = this.x - w/2
        let y = this.y - this.h/2 - bh + bg

        lineWidth(.5)
        stroke(.5, 0, .2)
        rect(x-bg, y-bg, w+2*bg, bh+2*bg)

        if (this.blinkTimer > 0) {
            const t = env.timer%1
            if (t < .25 || (t > .5 && t < .75)) return
        }

        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i]
            if (item) {
                fill(env.style.color[item.type])
                rect(x, y, bw, bh)
                x += bw + bg
            }
        }
    }

    draw() {
        const img = this.inUse? res.prop.lockerOpen : res.prop.locker
        image(img, this.x - this.w/2, this.y - this.h/2, this.w, this.h)
        this.drawIndicator()
    }
}
