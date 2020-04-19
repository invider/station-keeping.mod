// @depends(res/tileset/panels)

function createTiles(node, level, layer, i) {
    const tiles = new dna.Tiles({
        name: layer.name,
        Z: i + 1,
        x: level.offsetX,
        y: level.offsetY,
        w: level.width,
        h: level.height,
        tw: layer.gridCellsX,
        th: layer.gridCellsY,
        step: layer.gridCellWidth,
        map: layer.data,
        tileset: res.tileset[layer.tileset],
    })
    if (layer.name === 'shell') {
        tiles.solid = true
        delete dna.trait.testable.name
        augment(tiles, dna.trait.testable)
    }
    node.attach(tiles)
}

function createProps(node, level, layer, i) {
    layer.entities.forEach(e => {
        const dnaName = e.name
        const consFn = dna[dnaName]
        e.name = e.name + e.id
        e.Z = i
        delete e._eid

        const prop = new consFn(e)
        node.attach(prop)
    })
}

function ogmo(level) {
    const node = new sys.LabFrame()

    level.layers.forEach((layer, i) => {
        if (layer.data && layer.arrayMode === 0) {
            createTiles(node, level, layer, i)
        } else if (layer.entities) {
            createProps(node, level, layer, i)
        }
    })
    return node
}
