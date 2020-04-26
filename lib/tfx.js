function hint(msg, x, y, st) {
    if (env.messagesOff) return

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
    opt.x -= 1
    opt.y -= 1
    opt.Z += 5
    lab.cam.spawn('text/fadeText', opt)
}

function title(msg, x, y, st) {
    let opt = {
        Z: 5001,
        text: msg,
        fillStyle: '#000000',
        x: x,
        y: y,
        font: env.style.font,
        align: 'center',
        ttl: 5,
        tti: 0.5,
        ttf: 1.5,
        dx: +5,
        dy: -8,
    }
    if (st) augment(opt, st)

    lab.spawn('text/fadeText', opt)

    opt.fillStyle = env.style.color.status
    if (st && st.color) opt.fillStyle = st.color
    opt.x -= 1
    opt.y -= 1
    opt.Z += 5
    lab.spawn('text/fadeText', opt)
}


function roll(text, opt) {
    const lines = text.split('\n')

    const x = opt.x || env.style.edge
    const y = opt.y || ry(1)-50
    const st = augment({
        dx: 0,
        dy: -25,
        ttl: 15,
        align: 'left',
    }, opt)

    let delay = 2000
    lines.forEach(l => {
        setTimeout(() => title(l, x, y, st), delay)
        delay += 2000
    })
}
