function camera() {
    lab.spawn(dna.SlideCamera, {
        scaleFactor: .95,

        zoomIn: function() {
            this.zoomDir = 1
        },
        zoomOut: function() {
            this.zoomDir = -1
        },
        zoomStop: function() {
            this.zoomDir = 0
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
