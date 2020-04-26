function click(e) {
    /*
    const ls = []
    const node = lab.cam.pick(e.clientX, e.clientY, ls,
        function(e) {
            return e.touchable
        })
    console.dir(node)
    console.dir(ls)
    */
    lab.poke(e.clientX, e.clientY)
}
