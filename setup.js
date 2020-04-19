function setup() {
    // setup level 3
    lab.attach(_.lvl.station.space)
    lab.attach(_.lvl.station.shell)
    lab.attach(_.lvl.station.decor)

    lab.space.step = 16
    lab.shell.step = 16
    lab.decor.step = 16

    lab.spawn(dna.Hero, {
        name: 'hero',
        Z: 11,
        x: 300,
        y: 90,
        w: 24,
        h: 32,
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

    lab.control.player.bind(1, lab.hero)

    lab.background = false

    lab.spawn(dna.hud.Transition, {
        fadein: 0,
        keep: .5,
        fadeout: 2,
    })
}
