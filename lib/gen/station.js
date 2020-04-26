function station() {
    lab.spawn(dna.SpaceTrafficControl)
    lab.spawn(dna.hud.SupplyStatus)

    lab.spawn(dna.Station)
    lab.spawn(dna.hud.StatusBar, {
        name: 'bar',
        rx: 0,
        ry: 1,
        dx: env.style.edge,
        dy: -env.style.edge,
    })
    lab.spawn(dna.hud.StatusBar, {
        name: 'titlebar',
        rx: 0,
        ry: 1,
        dx: env.style.edge,
        dy: -env.style.edge - env.style.titlebarDY,
    })
    lab.spawn(dna.hud.StatusPanel)

    const spawned = []
    _.lvl.station._ls.forEach(e => {
        _.lvl.detach(e)
        lab.cam.attach(e)
        spawned.push(e)
    })
    spawned.forEach(e => {
        if (e.install) e.install()
    })

    env.stationWidth = lab.cam.shell.w
    env.stationHeight = lab.cam.shell.h

    lab.cam.lookAtStation = function() {
        const w = env.stationWidth
        const h = env.stationHeight
        lab.cam.x = w/2
        lab.cam.y = h/2

        const hscale = lab.cam.scaleFactor * rx(1)/w
        const vscale = lab.cam.scaleFactor * ry(1)/h
        if (hscale < vscale) lab.cam.scale = hscale
        else lab.cam.scale = vscale
    }
    lab.cam.lookAtStation()
}
