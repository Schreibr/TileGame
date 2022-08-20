import {BorderPack, TurnPack, MountainBorderPack, square} from './tile-mapping-utils.mjs'

let size = 160

export let TILESET_NAME = 'TilesetMap'

export let WATER_CLEAR_ID = 817
export let WATER_MEDIUM_ID = 820
export let WATER_DEEP_ID = 814

export let WATER_BORDER = new BorderPack(23, size)
export let WATER_TURN = new TurnPack(503, size)

export let WATER_MEDIUM_TURN = new TurnPack(815, size, true)
export let WATER_DEEP_TURN = new TurnPack(818, size, true)

export let DIRT_ID = 181

export let DIRT_BORDER = new BorderPack(20, size)
export let DIRT_TURN = new TurnPack(500, size)

export let SAND_ID = 178

export let SAND_BORDER = new BorderPack(17, size)
export let SAND_TURN = new TurnPack(497, size)

export let GRASS_IDS = square(822, 4, size)

export let PATH_ID = 175
export let PATH_BORDER = new BorderPack(14, size)
export let PATH_TURN = new TurnPack(494, size)

export let MOUNTAIN_BORDER = new MountainBorderPack(36, size)
export let MOUNTAIN_TURN = new TurnPack(39, size, true)

export let MOUNTAIN_DIRT_BORDER = new MountainBorderPack(676, size)
export let MOUNTAIN_DIRT_TURN = new TurnPack(679, size, true)