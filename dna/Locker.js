// @depends(dna/FixedMesh)

const df = {
    solid: false,
    touchable: true,
    x: 0,
    y: 0,
    w: 16,
    h: 32,
}

class Locker extends dna.FixedMesh {

    constructor(st) {
        super(augment(df, st))
        this.items = []
        augment(this, df)
        augment(this, st)
    }

    install() {
        if (this.type && this.type !== 'free') {
            lab.station[this.type][this.subtype] = this
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
