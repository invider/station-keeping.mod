function player() {
    const hero = lab.cam.spawn(dna.Hero, {
        name: 'hero',
        Z: 11,
        x: 200,
        y: 90,
        w: 12,
        h: 16,
    })
    lab.hero = hero
    lab.control.player.bind(1, hero)
}
