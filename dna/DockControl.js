// @depends(dna/FixedMesh)

const df = {
    solid: false,
    touchable: true,
    on: true,
    x: 0,
    y: 0,
    w: 8,
    h: 8,
}

class DockControl extends dna.FixedMesh {

    constructor(st) {
        super(supplement(st, df))
    }

    open() {
        this.on = !this.on
        // TODO play switch sfx
    }

    draw() {
        const img = this.on? res.prop.switchOn : res.prop.switchOff
        image(img, this.x - this.w/2, this.y - this.h/2, this.w, this.h)
    }
}
