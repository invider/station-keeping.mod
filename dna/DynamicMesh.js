// @depends(dna/FixedMesh)

const maxSlide = 20

const slide = 20

class DynamicMesh extends dna.FixedMesh {

    constructor(st) {
        super(st)

        this.mv = lib.v2.zero()
        //if (this.fixed) this.evo = false

        this.w2 = this.w/2
        this.h2 = this.h/2
    }

    collide(dt) {
        // calculate future dimentions 
        const hfuture = lib.v2.add(this, lib.v2.scale(this.mv, dt))
        const vfuture = {
            x: this.x - this.w2,
            y: hfuture.y - this.h2,
        }
        hfuture.y = this.y - this.h2
        hfuture.x -= this.w2
        hfuture.w = vfuture.w = this.w
        hfuture.h = vfuture.h = this.h

        const hpoints = [
            hfuture.x, hfuture.y,
            hfuture.x + hfuture.w, hfuture.y,
            hfuture.x, hfuture.y + hfuture.h,
            hfuture.x + hfuture.w, hfuture.y + hfuture.h,

            hfuture.x, hfuture.y + this.h2,
            hfuture.x + hfuture.w, hfuture.y + this.h2,
            hfuture.x + this.w2, hfuture.y,
            hfuture.x + this.w2, hfuture.y + hfuture.h,
        ]

        const vpoints = [
            vfuture.x, vfuture.y,
            vfuture.x + vfuture.w, vfuture.y,
            vfuture.x, vfuture.y + vfuture.h,
            vfuture.x + vfuture.w, vfuture.y + vfuture.h,

            vfuture.x, vfuture.y + this.h2,
            vfuture.x + vfuture.w, vfuture.y + this.h2,
            vfuture.x + this.w2, vfuture.y,
            vfuture.x + this.w2, vfuture.y + vfuture.h,
        ]

        // determine potential set
        const ls = this.__._ls

        function overlap(e) {
            const res = (e !== this && !e.dead && e.solid)
            return res
        }

        this.touchdown = false
        let collision = false
        for (let i = 0; i < ls.length; i++) {
            const target = ls[i]

            if (target && target !== this && !target.dead) {
                
                if (target.touchable) {
                    if (target.testRect(this)) {
                        this.touched = target
                    }

                } else if (target.solid) {
                    if (target.testRect(hfuture)) {
                        this.mv.x = 0
                    }
                    if (target.testRect(vfuture)) {
                        this.mv.y = 0
                    }
                    /*
                    if (target.testPoints) {
                        if (target.testPoints(hpoints)) {
                            this.mv.x = 0
                        }
                        if (target.testPoints(vpoints)) {
                            if (this.mv.y > 0) {
                                this.touchdown = true
                            }
                            this.mv.y = 0
                        }

                    } else {
                    }
                    */
                }
            }
        }
    }

    evo(dt) {
        // horizontal friction
        if (this.touchdown) {
            this.mv.x = this.mv.x * max((1-env.tune.friction*dt), 0)
        } else {
            this.mv.x = this.mv.x * max((1-env.tune.airFriction*dt), 0)
        }

        // apply gravity
        this.mv.y += env.tune.gravity * dt


        // move
        this.collide(dt) // cancel movement if needed
        this.x = this.x + this.mv.x * dt
        this.y = this.y + this.mv.y * dt
    }

    draw() {
        lineWidth(1)
        stroke(.2, .5, .5)
        rect(this.x - this.w/2, this.y - this.h/2, this.w, this.h)

        // movement vector
        stroke(.1, .5, .5)
        line(this.x, this.y,
            this.x + this.mv.x,
            this.y + this.mv.y)

        // center mass
        lineWidth(4)
        fill(.3, .6, .55)
        plot(this.x-2, this.y-2)
    }
}
