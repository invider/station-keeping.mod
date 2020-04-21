function fmt(v) {
    const rv = floor(v)

    let msg
    if (rv < 1) msg = 'low'
    else if (rv > 4) msg = 'extreme'
    else if (rv > 1) msg = 'high'
    else msg = 'regular'
    //msg += ' - $' + round(v*100)/100
    return msg
}

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
        text('Day ' + floor(env.day) + ' Demand', env.style.edge, env.style.edge)

        y += dy
        fill(env.style.color.energy)
        text('energy: ' + fmt(stc.price.energy), x, y)

        y += dy
        fill(env.style.color.fuel)
        text('fuel: ' + fmt(stc.price.fuel), x, y)

        y += dy
        fill(env.style.color.life)
        text('life: ' + fmt(stc.price.life), x, y)

        y += dy
        fill(env.style.color.chip)
        text('chips: ' + fmt(stc.price.chip), x, y)
    }
}
