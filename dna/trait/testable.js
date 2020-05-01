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
                if (this.map[ty * this.tw + tx] >= 0) return true
            }
        }
        return false
    }
}
