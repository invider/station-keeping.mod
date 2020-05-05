function rgbComponents(c) {
    if (c.startsWith('#')) c = c.substring(1)
    const r = parseInt(c.substring(0, 2), 16)
    const g = parseInt(c.substring(2, 4), 16)
    const b = parseInt(c.substring(4, 6), 16)
    return [r, g, b]
}

function mapColor(img, s, t) {
    if (!img) return

    const canvas = document.createElement('canvas')
    const c = canvas.getContext('2d')
    canvas.width = img.width
    canvas.height = img.height
    c.drawImage(img, 0, 0)

    const idata = c.getImageData(0, 0, img.width, img.height)
    const d = idata.data

    for (let i = 0; i < d.length; i += 4) {
        if (d[i] === s[0] && d[i+1] === s[1] && d[i+2] === s[2]) {
            d[i] = t[0]
            d[i+1] = t[1]
            d[i+2] = t[2]
        }
    }
    c.putImageData(idata, 0, 0)
    const fixedImage = new Image()
    fixedImage.src = canvas.toDataURL()
    return fixedImage
}

function remapSprites() {
    const colors = env.style.color.dude

    const targetSet = []
    res.plumber.attach(targetSet, 'suit')

    for (let i = 0; i < colors.length; i++) {
        let dudeSet = []
        targetSet[i] = dudeSet

        const sourceRGB = rgbComponents('#ffffff')
        const targetRGB = rgbComponents(colors[i])
        res.plumber.dude.forEach(frame => {
            const mFrame = mapColor(frame, sourceRGB, targetRGB)
            dudeSet.push(mFrame)
        })
    }
}
