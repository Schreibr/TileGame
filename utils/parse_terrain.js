const xml2js = require('xml2js');
const fs = require('fs');

// read XML from a file
const xml = fs.readFileSync('/Users/david/TileGame/TilesetMap/TilesetMap.tsx');

let border = {}

// let res = {}
// for(let key in turn) {
//     res[border[key]] = key
// }

// console.log(res)


let border_mapper = {
    '0,2,0,1,0,2,0,2': 'top_left',
    '0,2,0,1,0,1,0,2': 'top',
    '0,2,0,2,0,1,0,2': 'top_right',
    '0,1,0,1,0,2,0,2': 'left',
    '0,2,0,2,0,1,0,1': 'right',
    '0,1,0,2,0,2,0,2': 'bottom_left',
    '0,1,0,2,0,2,0,1': 'bottom',
    '0,2,0,2,0,2,0,1': 'bottom_right'
}

let turn_mapper = {
    '0,1,0,2,0,1,0,1': 'bottom_right',
    '0,1,0,1,0,2,0,1': 'bottom_left',
    '0,2,0,1,0,1,0,1': 'top_right',
    '0,1,0,1,0,1,0,2': 'top_left'
}

let detected_mapper = {
    '0,1,0,1,0,1,0,1': 'base',
    '0,2,0,2,0,2,0,2': 'neighbor_base',
}

let below_border_mapper = {
    '0,2,0,3,0,3,0,3': 'bottom_left',
    '0,2,0,3,0,3,0,2': 'bottom',
    '0,3,0,3,0,3,0,2': 'bottom_right',
    '0,1,0,3,0,3,0,1': 'top'
}

let below_turn_mapper = {
    '0,1,0,3,0,3,0,3': 'top_right',
    '0,3,0,3,0,3,0,1': 'top_left'
}

// convert XML to JSON
xml2js.parseString(xml, { mergeAttrs: true }, (err, result) => {
    if (err) {
        throw err;
    }

    result = result.tileset.wangsets[0].wangset

    let save = []
    for(let res of result) {

        let set = {}
        set.name = res.name[0]
        set.border = {}
        set.turn = {}
        set.properties = {}
        set.below_border = {}
        set.below_turn = {}

        res.wangtile.forEach(tile => {
            let id = Number(tile.tileid[0])
            let wangid = tile.wangid[0]
            let position = null
            if(border_mapper[wangid]) {
                position = border_mapper[wangid]
                set.border[position] = id
                return
            }
            if (turn_mapper[wangid]) {
                position = turn_mapper[wangid]
                set.turn[position] = id
                return
            }
            if(detected_mapper[wangid]) {
                position = detected_mapper[wangid]
                set[position] = id
                return
            }
            if(below_border_mapper[wangid]) {
                position = below_border_mapper[wangid]
                set.below_border[position] = id
                return
            }
            if(below_turn_mapper[wangid]) {
                position = below_turn_mapper[wangid]
                set.below_turn[position] = id
                return
            }
            // No position found for this wang ID, the code is incomplete
            throw 'No position found for tile id: ' + id
        })
        
        let properties = res.properties
        if(properties) {
            properties = properties[0].property
            for(let p of properties) {
                console.log(p)
                set.properties[p.name[0]] = p.value[0]
            }
        }

        save.push(set)
    }
    // console.log(Object.keys(result))

    // `result` is a JavaScript object
    // convert it to a JSON string
    const json = JSON.stringify(save, null, 4);

    // save JSON in a file
    fs.writeFileSync('terrain.json', json);

}); 