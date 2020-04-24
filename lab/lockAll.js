function lockAll() {
    this.cam._ls.forEach(e => {
        if (e.lock) e.lock()
    })
}
