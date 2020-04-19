function setup() {
    lab.background = false

    lab.spawn(dna.SlideCamera, {
        x: 0,
        y: 0,
    })

    lib.gen.station()
    lib.gen.player()

    lab.spawn(dna.hud.Transition, {
        fadein: 0,
        keep: .5,
        fadeout: 2,
    })
    /*
    lab.spawn(dna.FixedMesh, {
        name: 'block',
        Z: 11,
        x: 340,
        y: ry(1) - 16,
        w: 32,
        h: 32,
    })
    */
}
