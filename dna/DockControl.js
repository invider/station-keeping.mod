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
            }
        })
        lab.station.port[this.port] = this
    }

    type() {
        return this.sample.first()
    }

    qty() {
        return 1
    }

    value() {
        return this.exchange.value()
    }

    trade(type, qty) {
        // TODO distribute goods on the market supply
        this.exchange.empty()
        this.exchange.populate(type, qty)
        this.close()
        log('trade is done')
    }

    tradeSequence(type, qty) {
        this.state = 'docking'

        const dock = this
        lab.cam.spawn(dna.Ship, {
            dock: this,
            onDocked: function() {
                dock.trade(type, qty)
            }
        })
    }

    open() {
        if (this.on) {
            this.close()

        } else {
            this.on = true
            this.state = 'open'
        }
        // TODO play switch sfx
    }

    close() {
        this.on = false
        this.state = 'closed'
    }

    draw() {
        const img = this.on? res.prop.switchOn : res.prop.switchOff
        image(img, this.x - this.w/2, this.y - this.h/2, this.w, this.h)
    }
}
