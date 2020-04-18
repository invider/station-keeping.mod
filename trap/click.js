function click(e) {
    const node = lab.pick(e.clientX, e.clientY)
    log.dump(node)
}
