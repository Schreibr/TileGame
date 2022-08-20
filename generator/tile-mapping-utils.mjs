export class BorderPack {
    constructor(top_left_id, column_count) {
        
        this.top_left_id = top_left_id
        this.top_id = top_left_id+1
        this.top_right_id = top_left_id+2

        this.left_id = top_left_id + column_count
        this.right_id = this.left_id + 2

        this.bottom_left_id = top_left_id + 2 * column_count
        this.bottom_id = this.bottom_left_id + 1
        this.bottom_right_id = this.bottom_left_id + 2
    } 
}

export class TurnPack {
    constructor(top_left_id, column_count, inverse=false) {        
        this.top_left_id = top_left_id
        this.top_right_id = top_left_id+1

        this.bottom_left_id = top_left_id + column_count
        this.bottom_right_id = top_left_id + column_count + 1

        if (inverse) {
            // IMPORTANT Dont forget ; after this assignement or it will not behave correctly
            [this.top_left_id, this.bottom_right_id] = [this.bottom_right_id, this.top_left_id];
            [this.top_right_id, this.bottom_left_id] = [this.bottom_left_id, this.top_right_id];
        }
        
    }
}

export class MountainBorderPack extends BorderPack {
    constructor(top_left_id, column_count) {
        super(top_left_id, column_count)

        this.bottom_left_2_id = top_left_id + 3 * column_count
        this.bottom_2_id = this.bottom_left_2_id + 1
        this.bottom_right_2_id = this.bottom_left_2_id + 2
    }
}

export function square(top_id, size, column_count) {
    let ids = []
    for(let j = 0; j < size; j++) {
        for(let i = top_id; i < top_id + size; i++) {
            ids.push(i + j * column_count)
        }
    }
    return ids
}