function station() {
    lab.cam.attach(_.lvl.station.space)
    lab.cam.attach(_.lvl.station.shell)
    lab.cam.attach(_.lvl.station.decor)

    lab.cam.lookAtStation = function() {
        const w = lab.cam.shell.w
        const h = lab.cam.shell.h
        lab.cam.x = w/2
        lab.cam.y = h/2

        const hscale = rx(1)/w
        const vscale = ry(1)/h
        if (hscale < vscale) lab.cam.scale = hscale
        else lab.cam.scale = vscale
    }

    lab.cam.lookAtStation()
}
