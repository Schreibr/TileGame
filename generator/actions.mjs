import * as mapping from './tile-mapping.mjs'
import * as map from './map.mjs'
import * as border from './border.mjs'
import * as mountain from './mountain.mjs'

function generate_borders() {
    let groupes = map.get_groupes_by_property('border')
    groupes.forEach(groupe => {
        tiled.log('build borders')
        groupe.clear_generated()
        groupe.layers.forEach(layer => {
            let border_layer = groupe.generate_layer('border_' + layer.name)

            let sand_tiles = layer.scanTiles(mapping.SAND_ID)
            
            let updated = border.fill_holes(sand_tiles, [mapping.WATER_CLEAR_ID])
            layer.update_tiles(updated)
        
            sand_tiles = layer.scanTiles(mapping.SAND_ID)
        
            to_update = border.find_border(sand_tiles, mapping.GRASS_IDS, true)
            updated = border.compute_sand_border(to_update)
            
        
            // let water_tiles = scanner.scanTiles(mapping.WATER_CLEAR_ID)
            let coast_tiles = border.find_border(sand_tiles, mapping.WATER_CLEAR_ID, true)
        
            updated = updated.concat(border.compute_sand_coast(coast_tiles))
            border_layer.update_tiles(updated)
        
            let deep_tiles = border.find_border(updated, mapping.WATER_DEEP_ID, true)
            let medium_tiles = border.find_border(updated, mapping.WATER_MEDIUM_ID, true)
            let to_clear_water = deep_tiles.concat(medium_tiles)
            to_clear_water.forEach(t => t.updated_id = mapping.WATER_CLEAR_ID)
            layer.update_tiles(to_clear_water)
        
            let water_tiles = layer.scanTiles(mapping.WATER_CLEAR_ID)
            let to_medium_water = border.find_border(water_tiles, mapping.WATER_DEEP_ID, true)
            to_medium_water.forEach(t => t.updated_id = mapping.WATER_MEDIUM_ID)
            layer.update_tiles(to_medium_water)
        
            updated = border.compute_medium_water_border(water_tiles)
            border_layer.update_tiles(updated)
        
            water_tiles = layer.scanTiles(mapping.WATER_MEDIUM_ID)
            let to_update = border.find_border(water_tiles, mapping.WATER_DEEP_ID)
            updated = border.compute_deep_water_border(to_update)
            border_layer.update_tiles(updated)
        
            let dirt_tiles = layer.scanTiles(mapping.DIRT_ID)
            to_update = border.find_border(dirt_tiles, null, true)
            updated = border.compute_dirt_border(to_update)
            border_layer.update_tiles(updated)
        
            let path_tiles = layer.scanTiles(mapping.PATH_ID)
            to_update = border.find_border(path_tiles, null, true)
            updated = border.compute_path_border(to_update)
            border_layer.update_tiles(updated)
        })
    })
}

function generate_montains() {
    let groupes = map.get_groupes_by_property('mountain')
    groupes.forEach(mountain.build)
}

let border_action = tiled.registerAction("Generate Borders", generate_borders)
let mountain_action = tiled.registerAction("Generate Mountains", generate_montains)

border_action.text = "Generate Borders"
border_action.shortcut = "Ctrl+B"
mountain_action.text = "Generate Mountains"
mountain_action.shortcut = "Ctrl+K"


tiled.extendMenu("Edit", [
    { action: "Generate Borders", before: "SelectAll" },
    // { separator: true }
]);

tiled.extendMenu("Edit", [
    { action: "Generate Mountains", before: "SelectAll" },
    { separator: true }
]);

