function player(id) {
    const hero = lab.cam.spawn(dna.Hero, {
        id: id,
        name: 'hero' + id,
        Z: 11,
        x: env.stationWidth/2,
        y: 16,
        w: 12,
        h: 16,
    })
    return hero
    /*
    lab.control.player.bind(1, hero)
    lab.control.player.bind(2, hero)
    lab.control.player.bind(3, hero)
    */
}
