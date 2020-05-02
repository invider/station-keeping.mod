function hash(str) {
    let hash = 0
    if (str.length === 0) return '0'
    for (let i = 0; i < str.length; i++) {
        const ch = str.charCodeAt(i)
        hash = ((hash << 5)-hash)+ch
        hash = hash & hash
    }
    return abs(hash).toString(16)
}

function session() {
    const now = Date.now()
    env.sessionStart = now

    const d0 = (now%10000000).toString(16)
    const d1 = floor(Math.random() * 1000000).toString(16)

    const s0 = navigator.vendor? navigator.vendor : '?'
    const s1 = navigator.product? navigator.product : '?'
    const s2 = navigator.userAgent? navigator.userAgent : '?'
    const rez = lib.util.getResolution()

    const h1 = hash(`${s0}:${s1}:${s2}:${rez}`)

    env.session = `${d0}-${d1}-${h1}`

    log(`session id: ${env.session}`)
    trap('report', {
        y: lib.report.SESSION,
        z: rez,
    })
}
