function station() {
    _.lvl.station._ls.forEach(e => {
        _.lvl.detach(e)
        lab.cam.attach(e)
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
