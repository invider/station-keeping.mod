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
                if (e.type === 'exchange' && e.group === dock.group) {
                    log('found match')
                    dock.exchange = e
                } else if (e.type === 'sample' && e.group === dock.group) {
                    log('found sample')
                    dock.sample = e
                }
            }
        })
    }

    trade() {
        const sample = this.sample.first()
        this.exchange.empty()
        if (sample) this.exchange.populate(sample, 5)
    }

    open() {
        this.on = !this.on
        if (this.on) {
            this.trade()
            trap('trade')
        }
        // TODO play switch sfx
    }

    draw() {
        const img = this.on? res.prop.switchOn : res.prop.switchOff
        image(img, this.x - this.w/2, this.y - this.h/2, this.w, this.h)
    }
}
