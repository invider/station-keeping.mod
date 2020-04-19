// @depends(dna/FixedMesh)

const df = {
    solid: false,
    touchable: true,
    x: 0,
    y: 0,
    w: 32,
    h: 32,
}

class Locker extends dna.FixedMesh {

    constructor(st) {
        super(augment(df, st))
        this.items = []
        augment(this, df)
        augment(this, st)
    }

    draw() {
        image(res.prop.locker, this.x - this.w/2, this.y - this.h/2, this.w, this.h)
    }
}
