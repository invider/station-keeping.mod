// @depends(dna/FixedMesh)

const df = {
    solid: false,
    touchable: true,
    on: false,
    x: 0,
    y: 0,
    w: 24,
    h: 16,
}

class Terminal extends dna.FixedMesh {

    constructor(st) {
        super(supplement(st, df))
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
    }

    lock() {
        this.locked = true
    }

    unlock() {
        this.locked = false
    }

    close() {
        this.on = false
    }

    draw() {
        const img = this.on? res.prop.terminalOn : res.prop.terminalOff
        image(img, this.x - this.w/2, this.y - this.h/2, this.w, this.h)
    }
}
