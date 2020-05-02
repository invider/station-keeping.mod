function report(pkg) {
    let z = ''
    if (pkg.z) {
        if (isArray(pkg.z)) {
            z = pkg.z.join(',')
        } else {
            z = pkg.z
        }
    }
    //const query = `x=${env.session}&y=${pkg.y}&z=${z}`
    const query = `==${pkg.y}== ${z}`
    log(query)
}
