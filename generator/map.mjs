import { GroupeWrapper, LayerWrapper } from "./layer.mjs"

export function get_main_map() {
    return tiled.activeAsset
}

function get_tileset() {
    return get_main_map().tilesets[0]
}


let layer_prefix = '_gen_'
export function add_layer(parent, name) {
    let layer = new TileLayer(layer_prefix + name)
    init_layer(layer)
    parent.addLayer(layer)
    return layer
}


export function get_or_add_layer(parent, name) {
    let layer = parent.layers.find(l => l.name == layer_prefix + name)
    if(layer == null) {
        layer = add_layer(parent, name)
    }
    return layer
}

function get_layers_by_property_recursive(parent, property, parent_has_property=false) {
    let layers = []
    for(let layer of parent.layers) {
        if(layer.layers) {
            let has_property = parent_has_property || layer.property(property) == true
            layers = layers.concat(get_layers_by_property_recursive(layer, property, has_property))
        }
        else if(!layer.name.startsWith(layer_prefix) && (parent_has_property || layer.property(property) == true)) {
            layers.push(new LayerWrapper(layer))
        }
    }
    return layers
}

export function get_layers_by_property(property) {
    return get_layers_by_property_recursive(get_main_map(), property)
}


export function get_layer(name) {
    let split_names = name.split('/')
    let layer = get_main_map()
    for(let n of split_names) {
        layer = layer.layers.find(l => l.name === n)
        if(layer == null) {
            throw 'Layer: [' + n + ']  (' + name + ') could not be found'
        }
    }
    if(layer.isGroupLayer) {
        return new GroupeWrapper(layer)
    }
    else {
        return new LayerWrapper(layer)
    }
}

export function get_groupes_by_property(property) {
    let groupes = get_main_map().layers
    .filter(layer => layer.isGroupLayer && layer.property(property) == true)
    .map(g => new GroupeWrapper(g))

    return groupes
}

export function build_tile(id) {
    return get_tileset().tile(id)
}

export function init_layer(layer) {
    get_main_map().addLayer(layer)
    get_main_map().removeLayer(layer)
    return layer
}

tiled.get_layer = get_layer
tiled.get_groupes_by_property = get_groupes_by_property