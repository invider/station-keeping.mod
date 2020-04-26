function mouseMove(e) {
    const ls = []
    const node = lab.cam.pick(e.clientX, e.clientY, ls, e => e.touchable)

    if (node) {
        if (node.hint) {
            lab.bar.showHint(node.hint)
        }
    } else {
        lab.bar.showHint(false)
    }
}
