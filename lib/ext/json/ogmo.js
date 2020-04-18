// @depends(res/tileset/panels)
function ogmo(level) {
    const node = new sys.LabFrame()

    level.layers.forEach((layer, i) => {
        if (!layer.data || layer.arrayMode !== 0) return

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
    })
    return node
}
