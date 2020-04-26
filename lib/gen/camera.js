function camera() {
    lab.spawn(dna.SlideCamera, {
        scaleFactor: .9,

        zoomIn: function() {
            this.zoomDir = 1
        },
        zoomOut: function() {
            this.zoomDir = -1
        },
        zoomStop: function() {
            this.zoomDir = 0
        },

        poke: function(x, y, opt) {
            const lx = this.lx(x)
            const ly = this.ly(y)
            const fn = isFun(opt)? opt : false
            for (let i = 0; i < this._ls.length; i++) {
                const e = this._ls[i]

                if (!fn || fn(e)) {
                    if (e.poke && lx >= e.x-e.w/2 && lx <= e.x+e.w/2
                            && ly >= e.y-e.h/2 && ly <= e.y+e.h/2) {
                        e.poke()
                    }
                }
            }
        },

        pick: function(x, y, ls, opt) {
            const lx = this.lx(x)
            const ly = this.ly(y)
            const fn = isFun(opt)? opt : false

            let res
            for (let i = 0; i < this._ls.length; i++) {
                const e = this._ls[i]
                if (!fn || fn(e)) {
                    if (lx >= e.x-e.w/2 && lx <= e.x+e.w/2
                            && ly >= e.y-e.h/2 && ly <= e.y+e.h/2) {
                        res = e
                        ls.push(e)
                    }
                }
            }
            return res
        },

        evo: function(dt) {
            dna.SlideCamera.prototype.evo.call(this, dt)

            if (this.zoomDir) {
                if (this.zoomDir < 0) this.scaleFactor *= (1 + env.tune.zoomSpeed * dt)
                else if (this.zoomDir > 0) this.scaleFactor *= (1 - env.tune.zoomSpeed * dt)
                this.lookAtStation()
            }
        }
    })
}
