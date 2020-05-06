function gameover() {
    env.state = 'gameover'
    lab.control.player.releaseAll()
    lab.cam._ls.filter(e => e instanceof dna.Hero).forEach(hero => {
        hero.clearControls()
    })

    lab.cam._ls.forEach(e => {
        if (e instanceof dna.Locker) {
            e.inUse = true
            for (let i = 0; i < e.capacity; i++) {
                e.items[i] = {
                    type: 'broken'
                }
            }
        } else if (e instanceof dna.TradeControl) {
            e.qty = 0
        }
    })

    sfx.play('powerDown', 1)

    lib.report.gameover([
        floor(env.day),
        env.score.dockingOps,
        env.score.loaded,
        env.score.shipped,
        env.score.waste,
    ])

    setTimeout(() => lib.tfx.roll(env.credits), 5000)
}
