import * as map from './map.mjs'
import { TileWrapper } from './tile.mjs'

const gen_prefix = '_'

export class LayerWrapper {
    constructor(layer) {
        this.layer = layer
    }

    get name() {
        return this.layer.name
    }

    get width() {
        return this.layer.width
    }

    get height() {
        return this.layer.height
    }

    tile(x, y) {
        return new TileWrapper(x, y, this)
    }

    get parent() {
        return GroupeWrapper(this.layer.parentLayer)
    }

    raw_tile(x, y) {
        return this.layer.tileAt(x,y)
    }
    scanTiles(ids) {
        let unpack = false
        if(!Array.isArray(ids)) {
            ids = [ids]
            unpack = true
        }
    
        let tiles = {}
        ids.forEach(id => tiles[id] = [])
    
        for(let x = 0; x < this.layer.width; x++) {
            for(let y = 0; y < this.layer.height; y++) {
                let tile = this.tile(x, y)
                ids.forEach(id => {
                    if(id == tile.id) {
                        tiles[id].push(tile)
                    }
                })
            }
        }
        if(unpack) {
            return tiles[ids[0]]
        }
        return tiles
    }

    allTiles() {
        let tiles = []

        for(let x = 0; x < this.layer.width; x++) {
            for(let y = 0; y < this.layer.height; y++) {
                tiles.push(this.tile(x, y))
            }
        }
        return tiles
    }

    update_tiles(tiles) {
        let layer_edit = this.layer.edit()
        tiles.forEach(tile => {
            layer_edit.setTile(tile.x, tile.y, map.build_tile(tile.updated_id))
        })
        layer_edit.apply()
    }


}


tiled.LayerWrapper = LayerWrapper


export class GroupeWrapper {
    constructor(groupe_layer) {
        this.groupe = groupe_layer
    }

    get layers() {
        return this.groupe.layers.filter(l => !l.name.startsWith(gen_prefix)).map(l => new LayerWrapper(l))
    }

    get name() {
        return this.groupe.name
    }

    indexOf(layer) {
        this.groupe.layers.findIndex(l => l.id == layer.id)
    }

    clear_generated() {
        let groupe = this.groupe
        this.groupe.layers.forEach(l => {
            if(l.name.startsWith(gen_prefix)) {
                groupe.removeLayer(l)
            }
        })
    }

    generate_layer(name, position) {
        if(name == null) {
            throw 'name is null'
        }
        let fullname = gen_prefix + name
        let layer = new TileLayer(fullname)
        layer = map.init_layer(layer)

        if(!isNaN(position)) {
            this.groupe.insertLayerAt(position, layer)
        }
        else {
            this.groupe.addLayer(layer)
        }

        return new LayerWrapper(layer)
    }

    print() {
        for(let l of this.layers) {
            tiled.log(l.name)
        }
    }
}