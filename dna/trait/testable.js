// testable tiles trait
const testable = {
    testRect: function(rect) {
        // determine tiles within
        const sx = floor((rect.x - this.x)/this.step)
        const sy = floor((rect.y - this.y)/this.step)
        const ex = ceil((rect.x + rect.w - this.x)/this.step)
        const ey = ceil((rect.y + rect.h - this.y)/this.step)
        // width and height in tiles
        const tw = floor(ex-sx)
        const th = floor(ey-sy)

        // test the tiles region
        for (let ty = sy; ty < ey; ty++) {
            for (let tx = sx; tx < ex; tx++) {
                const type = this.map[ty * this.tw + tx]

                if (type === 37) {
                    const headDY = ((rect.y - this.y)/this.step) - ty
                    if (headDY < 0.6) return true
                    else return false
                }
                if (type === 69
                        || type === 68
                        || type === 203
                        || type === 204
                        || type === 205
                        || type === 206
                        || type === 244
                        || type === 247) {
                    const footDY = ((rect.y + rect.h - this.y)/this.step) - ty
                    if (footDY > 0.2) {
                        return true
                    }
                    else return false
                }
                if (type >= 0) {
                    return true
                }
                /*
                    return false
                } else if (type) {
                    return true
                }
                */
            }
        }
        return false
    }
}
