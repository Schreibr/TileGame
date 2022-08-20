import * as map from './map.mjs'
import * as border from './border.mjs'
import * as mapping from './tile-mapping.mjs'


function place_neighbor(tile, neighbor, updated, id, set_id) {
    if(tile.updated_id == id) {
        neighbor.updated_id = set_id
        updated.push(neighbor)
    }
}


export function build(groupe) {
    tiled.log('build mountains')
    
    groupe.clear_generated()

    let lowest_layer = groupe.generate_layer('lowest')
    
    groupe.layers.forEach(layer => {
        let write_layer = groupe.generate_layer(layer.name)

        let BORDER = mapping.MOUNTAIN_BORDER
        let TURN = mapping.MOUNTAIN_TURN

        let empty = layer.scanTiles()

        let to_update = border.find_border(empty)
        if(to_update.length == 0) {
            return
        }
        if(to_update[0].neighbors.find(n => n.id == mapping.DIRT_ID)) {
            BORDER = mapping.MOUNTAIN_DIRT_BORDER
            TURN = mapping.MOUNTAIN_DIRT_TURN
        }

        let updated = border.compute_mountain_border(to_update, BORDER, TURN)
        let lowest_update = []
        updated.forEach(t => {
            let neighbor = t.get_neighbor_by_offset([0,1])
            if(neighbor == null) {
                return
            }
            for (let m of [mapping.MOUNTAIN_BORDER, mapping.MOUNTAIN_DIRT_BORDER]) {
                place_neighbor(t, neighbor, lowest_update, m.bottom_id, m.bottom_2_id)
                place_neighbor(t, neighbor, lowest_update, m.bottom_left_id, m.bottom_left_2_id)
                place_neighbor(t, neighbor, lowest_update, m.bottom_right_id, m.bottom_right_2_id)
            }
        })
        write_layer.update_tiles(updated)
        lowest_layer.update_tiles(lowest_update)
    })
}

