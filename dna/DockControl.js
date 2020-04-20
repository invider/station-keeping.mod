// @depends(dna/FixedMesh)

const df = {
    solid: false,
    touchable: true,
    on: false,
    x: 0,
    y: 0,
    w: 8,
    h: 8,
}

class DockControl extends dna.FixedMesh {

    constructor(st) {
        super(supplement(st, df))
    }

    install() {
        // looking for my group
        const dock = this
        lab.cam._ls.forEach(e => {
            if (e instanceof dna.Locker) {
                if (e.type === 'exchange' && e.port === dock.port) {
                    dock.exchange = e
                } else if (e.type === 'sample' && e.port === dock.port) {
                    dock.sample = e
                }
            } else if (e instanceof dna.TradeControl && e.port === dock.port) {
                dock.tradeControl = e
                e.dock = dock
            }
        })
        lab.station.port[this.port] = this
    }

    type() {
        return this.sample.first()
    }

    qty() {
        return this.tradeControl.value()
    }

    value() {
        return this.exchange.value()
    }

    trade(type, qty) {
        // TODO distribute goods on the market supply
        const shipped = this.exchange.empty()
        this.exchange.populate(type, qty)
        env.score.shipped += shipped
        env.score.loaded += qty
        this.exchange.blink()
        this.close()

        this.unlock()
        this.exchange.unlock()
        this.sample.unlock()
        this.tradeControl.unlock()
    }

    tradeSequence(type, qty) {
        this.lock()
        this.exchange.lock()
        this.sample.lock()
        this.tradeControl.lock()
        this.state = 'docking'

        const dock = this
        lab.cam.spawn(dna.Ship, {
            dock: this,
            onDocked: function() {
                dock.trade(type, qty)
            }
        })
    }

    use() {
        if (this.locked) return

        if (this.on) {
            this.close()
            sfx.play('selectHi', .7)

        } else {
            this.on = true
            this.state = 'open'
            sfx.play('selectHi', .7)
        }
        // TODO play switch sfx
    }

    lock() {
        this.locked = true
    }

    unlock() {
        this.locked = false
    }

    close() {
        this.on = false
        this.state = 'closed'
    }

    draw() {
        if (this.state === 'docking') {
            const img = (env.timer%1 < .5)? res.prop.switchOn : res.prop.switchOff
            image(img, this.x - this.w/2, this.y - this.h/2, this.w, this.h)
        } else {
            const img = this.on? res.prop.switchOn : res.prop.switchOff
            image(img, this.x - this.w/2, this.y - this.h/2, this.w, this.h)
        }
    }
}
