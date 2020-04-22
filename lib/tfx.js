function hint(msg, x, y, st) {
    let opt = {
        Z: 1001,
        text: msg,
        fillStyle: '#000000',
        x: x,
        y: y,
        font: env.style.hintsFont,
        align: 'center',
        ttl: 5,
        tti: 0.5,
        ttf: 1.5,
        dx: +5,
        dy: -8,
    }
    if (st) augment(opt, st)

    lab.cam.spawn('text/fadeText', opt)

    opt.fillStyle = '#ffffff'
    if (st && st.color) opt.fillStyle = st.color
    opt.x -= 2
    opt.y -= 2
    opt.Z += 5
    lab.cam.spawn('text/fadeText', opt)
}

function roll(text) {
    const lines = text.split('\n')

    const x = lab.cam.worldX(0) + 10
    const y = lab.cam.worldY(ry(1)) - 10
    const st = {
        dx: 0,
        dy: -10,
        ttl: 15,
        align: 'left',
        color: '#ffff60',
    }

    let delay = 2000
    lines.forEach(l => {
        setTimeout(() => hint(l, x, y, st), delay)
        delay += 2000
    })
}
