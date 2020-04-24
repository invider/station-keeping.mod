function blinkAll(opt) {
    lab.cam._ls.forEach(e => {
        if (e.blink) e.blink(opt)
    })
}
