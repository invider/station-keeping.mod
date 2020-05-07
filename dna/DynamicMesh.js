// @depends(dna/FixedMesh)

const maxSlide = 20

const slide = 20

class DynamicMesh extends dna.FixedMesh {

    constructor(st) {
        super(st)

        this.mv = lib.v2.zero()
        this.premv = lib.v2.zero()
        //if (this.fixed) this.evo = false

        this.w2 = this.w/2
        this.h2 = this.h/2
    }

    collide(dt) {
        // TODO handle "many tiny movement after collision" problem
        //      how to move exactly to the obstacle?
        
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
                        if (this.premv.x !== 0 && this.onWallHit) {
                            this.onWallHit()
                        }
                    }
                    if (target.testRect(vfuture)) {
                        if (this.mv.y > 0) {
                            this.touchdown = true
                            if (this.premv.y !== 0 && this.onTouchdown) {
                                this.onTouchdown()
                            }
                        } else if (this.mv.y < 0) {
                            if (this.premv.y !== 0 && this.onHeadHit) {
                                this.onHeadHit()
                            }
                        }
                        this.mv.y = 0
                    }
                }
            }
        }
    }

    evo(dt) {
        this.premv.x = this.mv.x
        this.premv.y = this.mv.y

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
