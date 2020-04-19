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
    hero.itemMenu = lab.cam.spawn(dna.hud.ItemMenu, {
        name: hero.name + '-items',
        target: hero,
        keeper: hero,
        Z: hero.Z + 100,
        dx: 0,
        dy: 20,
    })
    hero.lockerMenu = lab.cam.spawn(dna.hud.ItemMenu, {
        name: hero.name + '-locker',
        target: hero,
        keeper: false,
        Z: hero.Z + 110,
        dx: 0,
        dy: -20,
    })

    // debug refill
    hero.items.push({
        type: 'chipX',
    })

    return hero
    /*
    lab.control.player.bind(1, hero)
    lab.control.player.bind(2, hero)
    lab.control.player.bind(3, hero)
    */
}
