// @depends(dna/FixedMesh)

const df = {
    solid: false,
    touchable: true,
    x: 0,
    y: 0,
    w: 16,
    h: 32,
    capacity: 6,
}

class Locker extends dna.FixedMesh {

    constructor(st) {
        super(supplement(st, df))
        this.items = []
        augment(this, df)
        augment(this, st)
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
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].type === this.subtype) {
                this.items[i] = false
                return true
            }
        }
        return false
    }

    draw() {
        image(res.prop.locker, this.x - this.w/2, this.y - this.h/2, this.w, this.h)
    }
}
