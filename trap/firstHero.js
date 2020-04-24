function firstHero() {
    lib.tfx.roll(env.story)

    // lock all
    lab.cam._ls.forEach(e => {
        if (e.lock) e.lock()
    })

    //lab.locateTag('DC1').unlock()
    //lab.locateTag('DS1').unlock()
    const dock1 = lab.locateTag('D1')

    dock1.unlock()
    dock1.onUse = function() {
        this.lock()
    }
    dock1.onTrade = function() {
        // unlock all
        lab.cam._ls.forEach(e => {
            if (e.unlock) e.unlock()
        })
        this.onTrade = false
    }
}
