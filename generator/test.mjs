import * as mapping from './tile-mapping.mjs'
import * as map from './map.mjs'
import * as border from './border.mjs'
import * as mountain from './mountain.mjs'

// tiled.log('Start Script')

// tiled.log(map.get_layers_by_property('mountain').length)



function build() {




    mountain.build_mountains()
}

var start = new Date().getTime();

// build()

var end = new Date().getTime();
var time = end - start;
tiled.log('Execution time: ' + time);