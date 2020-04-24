function locateTag(tag) {
    const ls = this.cam._ls

    for (let i = 0; i < ls.length; i++) {
        if (ls[i].tag === tag) return ls[i]
    }
}
