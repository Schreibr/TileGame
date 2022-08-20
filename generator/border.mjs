import * as m from './tile-mapping.mjs'


function border_params(borders, turns) {
    let res = []

    if (turns != null) {
        res = res.concat([
            [[[1,0], [0,1]], turns.top_left_id],
            [[[1,0], [0,-1]], turns.bottom_left_id],
            [[[-1,0], [0,1]], turns.top_right_id],
            [[[0,-1], [-1,0]], turns.bottom_right_id]
        ])
    }

    if(borders != null) {
        res = res.concat([
            [[1,0], borders.left_id],
            [[0,1], borders.top_id],
            [[-1,0], borders.right_id],
            [[0,-1], borders.bottom_id],
            [[1,1], borders.top_left_id],
            [[1,-1], borders.bottom_left_id],
            [[-1,1], borders.top_right_id],
            [[-1,-1], borders.bottom_right_id]
        ])
    }
    return res
}


export function find_border(tiles, tile_ids=null, outer=false) {
    let border = {}
    if(tile_ids != null && !Array.isArray(tile_ids)) {
        tile_ids = [tile_ids]
    }
    for(let tile of tiles) {
        let neighbors = tile.neighbors
        let outer_tiles = tile_ids != null ? neighbors.filter(n => tile_ids.includes(n.id)) : neighbors.filter(n => n.id != tile.id)
        if(outer_tiles.length > 0) {
            if(!outer) {
                border[tile.hash] = tile
            }
            else {
                outer_tiles.forEach(t => border[t.hash] = t)
            }
        }
    }

    return Object.values(border)
}

function check_function(tile, check_tile_id) {
    let valid_offsets = tile.neighbor_offsets

    return (offs, to_set) => {
        let id = check_tile_id
        if(!Array.isArray(offs[0])) {
            offs = [offs]
        }
        for(let off of offs) {
            // tiled.log(off)
            // tiled.log(offsets)
            if(!valid_offsets.some(o => o.join(',') === off.join(','))) {
                // tiled.log('not in neighbors')
                return false
            }
            // tiled.log(tile.get_neighbor_by_offset(off).id)
            let neighbor = tile.get_neighbor_by_offset(off)
            if(id && neighbor.id != id || neighbor.id == null) {
                // tiled.log(off + ':  ' + tile.get_neighbor_by_offset(off).id)
                return false
            }
        }
        tile.updated_id = to_set
        return true
    }
}

function run_checks(check_fn, params) {
    for(let param of params) {
        if(check_fn(...param)){
            return true
        }
    }
    return false
}


export function compute_sand_coast(coast_tiles) {
    let modified = []
    let params = border_params(m.WATER_BORDER, m.WATER_TURN)
    coast_tiles.forEach(tile => {

        let check = check_function(tile, m.SAND_ID)

        if(run_checks(check, params)) {
            modified.push(tile)
        }
    })

    return modified
}

export function compute_medium_water_border(tiles) {
    let modified = []
    let params = border_params(null, m.WATER_MEDIUM_TURN)
    tiles.forEach(tile => {
        let check = check_function(tile, m.WATER_MEDIUM_ID)
        if(run_checks(check, params)) {
            modified.push(tile)
        }
    })
    return modified
}

export function compute_deep_water_border(tiles) {
    let modified = []
    let params = border_params(null, m.WATER_DEEP_TURN)
    tiles.forEach(tile => {
        let check = check_function(tile, m.WATER_DEEP_ID)
        if(run_checks(check, params)) {
            modified.push(tile)
        }
    })
    return modified
}

export function compute_dirt_border(tiles) {
    let modified = []
    let params = border_params(m.DIRT_BORDER, m.DIRT_TURN)
    tiles.forEach(tile => {
        let check = check_function(tile, m.DIRT_ID)
        if(run_checks(check, params)) {
            modified.push(tile)
        }
    })
    return modified
}

export function compute_path_border(tiles) {
    let modified = []
    let params = border_params(m.PATH_BORDER, m.PATH_TURN)
    tiles.forEach(tile => {
        let check = check_function(tile, m.PATH_ID)
        if(run_checks(check, params)) {
            modified.push(tile)
        }
    })
    return modified
}

export function compute_sand_border(tiles) {
    let modified = []
    let params = border_params(m.SAND_BORDER, m.SAND_TURN)
    tiles.forEach(tile => {
        let check = check_function(tile, m.SAND_ID)
        if(run_checks(check, params)) {
            modified.push(tile)
        }
    })
    return modified
}

export function compute_mountain_border(tiles, borders, turns) {
    let modified = []
    let params = border_params(borders, turns)
    tiles.forEach(tile => {
        let check = check_function(tile)
        if(run_checks(check, params)) {
            modified.push(tile)
        }
    })
    return modified
}

export function fill_holes(tiles, ids=null) {
    let offsets = [[0, 2], [2, 0], [0, -2], [-2, 0]]
    
    let modified = []
    for(let tile of tiles) {
        for(let off of offsets) {
            let neighbor = tile.get_neighbor_by_offset(off)
            if(neighbor == null || neighbor.id != tile.id) {
                continue
            }
            let off2 = off.map(o => o/2)
            let between = tile.get_neighbor_by_offset(off2)
            if(between.id != tile.id && (ids == null || ids.includes(between.id))) {
                between._updated_id = tile.id
                modified.push(between)
            }
        }
    }

    return modified
}