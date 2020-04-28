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
        locker: true,
        keeper: false,
        target: hero,
        Z: hero.Z + 110,
        dx: 0,
        dy: -20,
    })
    hero.itemMenu.receiver = hero.lockerMenu
    hero.lockerMenu.receiver = hero.itemMenu

    sfx.play('teleport', 1)

    if (hero.number === 1) {
        trap('firstHero')
    }

    return hero
}
