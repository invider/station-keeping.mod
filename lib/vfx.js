
let id = 0

function poof(x, y) {

    //let color = '#80808080'
    let color = hsl(.15, .7, .5)

    $.lab.cam.spawn('Emitter', {
        Z: 1001,
        name: 'vfx' + (++id),
        x: x,
        y: y,
        color: color,

        lifespan: 0.2,
        force: 500,
        radius: 3,
        size: 1, vsize: 0,
        speed: 60, vspeed: 40,
        angle: PI/2-.4, spread: .8,
        minLifespan: 0.1, vLifespan: 0.1,

        drawParticle: function() {
            fill(this.color)
            rect(this.x, this.y, this.r, this.r)
        }
    })
}

function teleport(x, y) {
    let color = hsl(.5, .5, .4)

    $.lab.cam.spawn('Emitter', {
        Z: 1001,
        name: 'vfx' + (++id),
        x: x,
        y: y,
        color: color,

        lifespan: 0.1,
        force: 2500,
        radius: 0,
        size: 2, vsize: 2,
        speed: 50, vspeed: 0,
        angle: 0, spread: TAU,
        minLifespan: 0.5, vLifespan: 0,

        drawParticle: function() {
            fill(this.color)
            rect(this.x, this.y, this.r, this.r)
        }
    })
}
