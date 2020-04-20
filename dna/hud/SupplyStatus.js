class SupplyStatus {
    draw() {
        const stc = lab.stc

        baseTop()
        alignLeft()
        font(env.style.font)

        let x = env.style.edge
        let y = env.style.edge
        let dy = 32

        fill(env.style.color.day)
        text('Day ' + floor(env.day), env.style.edge, env.style.edge)

        y += dy
        y += dy
        text('supply:', x, y)

        y += dy
        fill(env.style.color.energy)
        text('energy: ' + stc.supply.energy, x, y)

        y += dy
        fill(env.style.color.fuel)
        text('fuel: ' + stc.supply.fuel, x, y)

        y += dy
        fill(env.style.color.life)
        text('life: ' + stc.supply.life, x, y)

        y += dy
        fill(env.style.color.life)
        text('chips: ' + stc.supply.chip, x, y)
    }
}
