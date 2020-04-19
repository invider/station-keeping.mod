function setup() {
    lab.background = false

    lib.gen.camera()
    trap('start')

    _.disable()
    lab.spawn(dna.hud.Transition, {
        fadein: 0,
        keep: .5,
        fadeout: 2,

        onFadeout: function() {
            _.enable()
        }
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
