import {BorderPack, TurnPack, MountainBorderPack, square} from './tile-mapping-utils.mjs'

let size = 14

export let TILESET_NAME = 'island-base'

export let WATER_CLEAR_ID = 96
export let WATER_MEDIUM_ID = 587
export let WATER_DEEP_ID = 601

export let WATER_BORDER = new BorderPack(81, size)
export let WATER_TURN = new TurnPack(124, size)

export let WATER_MEDIUM_TURN = new TurnPack(582, size, true)
export let WATER_DEEP_TURN = new TurnPack(585, size, true)

export let DIRT_ID = 26

export let DIRT_BORDER = new BorderPack(11, size)
export let DIRT_TURN = new TurnPack(53, size)

export let SAND_ID = 23

export let SAND_BORDER = new BorderPack(8, size)
export let SAND_TURN = new TurnPack(50, size)

export let GRASS_IDS = square(1, 4, size)

export let PATH_ID = 20
export let PATH_BORDER = new BorderPack(5, size)
export let PATH_TURN = new TurnPack(47, size)

export let MOUNTAIN_BORDER = new MountainBorderPack(70, size)
export let MOUNTAIN_TURN = new TurnPack(73, size)

export let MOUNTAIN_DIRT_BORDER = new MountainBorderPack(126, size)
export let MOUNTAIN_DIRT_TURN = new TurnPack(129, size)