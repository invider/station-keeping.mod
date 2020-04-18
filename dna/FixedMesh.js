const df = {
    solid: true,
    fixed: false,
    x: 0,
    y: 0,
    w: 16,
    h: 16,
}

class FixedMesh {

    constructor(st) {
        augment(this, df)
        augment(this, st)
    }

    testRect(t) {
        return (t.x+t.w >= this.x-this.w/2
            && t.x <= this.x+this.w/2
            && t.y+t.h >= this.y-this.h/2
            && t.y <= this.y+this.h/2)
    }

    draw() {
        lineWidth(2)
        stroke(.2, .5, .5)
        rect(this.x - this.w/2, this.y - this.h/2, this.w, this.h)

        // center mass
        lineWidth(4)
        fill(.3, .6, .55)
        plot(this.x-2, this.y-2)
    }
}
