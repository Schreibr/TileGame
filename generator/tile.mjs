export class TileWrapper {
    constructor(x, y, layer_wrapper) {
        this.x = x
        this.y = y

        this.layer = layer_wrapper
        this.updated_id = null
    }

    get tile() {
        return this.layer.raw_tile(this.x, this.y)
    }

    get id() {
        if(this.tile) {
            return this.tile.id
        }
        return null
    }

    get hash() {
        return this.x + '_' + this.y
    }

    get neighbor_offsets() {
        let res = []
        let x_start = Math.max(this.x-1, 0)
        let x_end = Math.min(this.x+1, this.layer.width)
        let y_start = Math.max(this.y-1, 0)
        let y_stop = Math.min(this.y+1, this.layer.height)

        for(let x = x_start; x <= x_end; x++) {
            for(let y = y_start; y <= y_stop; y++) {
                if(y != this.y | x != this.x) {
                    res.push([x - this.x, y - this.y])
                }
            }
        }
        return res
    }

    get neighbors() {
        let res = []
        this.neighbor_offsets.forEach(offset => {
            res.push(this.layer.tile(this.x + offset[0], this.y + offset[1]))
        })
        return res
    }

    get_neighbor_by_offset(offset) {
        let x = this.x + offset[0]
        let y = this.y + offset[1]
        if(x < 0 || x >= this.layer.width || y < 0 || y >= this.layer.height) {
            return null
        }
        return this.layer.tile(x, y)
    }
}