function draw_ellipse(override = true) {
	let a = 0
	let b = 0
	let expected_id = 0
	let count = 0
	let width_max= 1
	let height_max = 0
	let width = tiled.activeAsset.resolvedProperty("width")
	let height = tiled.activeAsset.resolvedProperty("height")
	let undef = tiled.activeAsset.resolvedProperty("soll nie existieren, yupiyupp")
	let boundless = tiled.activeAsset.resolvedProperty("boundless")
	let offset = tiled.activeAsset.resolvedProperty("centerOffset")
	
	expected_id = tiled.activeAsset.selectedTiles[0]
	tiled.activeAsset.selectedTiles.forEach(function(tile) {
		count ++
		if (tile.id != expected_id){
				height_max++
				count = 0
		}		
		expected_id = tile.id + 1

		})		
		width_max= count + 1	
		count = 0
	if (height == undef || width == undef || boundless){	
		width = width_max
		height = height_max
	}
	tiled.log(width)
	tiled.log(height)
    tiled.activeAsset.selectedTiles.forEach(function(tile) {
		count ++
		let pos = Qt.point(0, 0)
		
        // avoid overwriting existing collision info
        if (tile.objectGroup !== null && tile.objectGroup.objectCount > 0 && !override){
				//TODO
		}
        let o = new MapObject()
		
		if (a < width) {
			pos.x = -16 * a
			a ++
			}
		else {
			a = 1
			}
				//
	tiled.log(count == width_max	)
		o.shape = 1
        //o.width = tile.width * width
        //o.height = tile.height * height
		let N= 10*width*height
		let Theta
		let Fi
		let x
		let y
		let Pi= 3.14
		let points = new Array();
		let radius=8
		let center= Qt.point(4*width, 0)
		x= center.x + offset//+radius
		y= center.y //-radius*2
		tiled.log(x)
		//points.push(Qt.point(x, y));
	
		
		x= x+ width*4
		//points.push(Qt.point(x, y));
		let templist =new Array()
		for (let i = 0 ; i< N; i++){
			Theta = Pi * i /  N;
			Fi =  2*Pi - Math.atan(Math.tan(Theta) * width/height);
			templist.push(Qt.point(x + radius*width * Math.cos(Fi), y +height*radius + radius*height * Math.sin(Fi)))
			if(i== Math.round(N/2)){
				templist.reverse().forEach(a=>points.push(a))
				templist =[]
				}
			
		}
		templist.reverse().forEach(a=>points.push(a))
		y= y +2*radius*height	

		//points.push(Qt.point(x, y));
		//points.push(Qt.point(x-radius, y));
		templist =[]
		for (let i = 0 ; i< N; i++){
			Theta = Pi * i /  N;
			Fi =  Pi - Math.atan(Math.tan(Theta) * width/height);
		templist.push(Qt.point(x + radius*width * Math.cos(Fi), y -height*radius + radius*height * Math.sin(Fi)))	
			if(i== Math.round(N/2)){
				templist.reverse().forEach(a=>points.push(a))
				templist =[]
				}
			
		}
		templist.reverse().forEach(a=>points.push(a))

		
		
		
		
		
		
		
		
		
		
		
		
		o.polygon=points
		pos.y = -16 * b		
		o.pos = pos
        let g = new ObjectGroup()
        g.addObject(o)

        tile.objectGroup = g
		if (b < height) {	
			if (count == width_max){
				count = 0
				if (b +1 < height)
					b++
			}
		}else{
			b=0
		}
    })
}


function clear_selected() {
    tiled.activeAsset.selectedTiles.forEach(function(tile) {
		if (tile.objectGroup !== null && tile.objectGroup.objectCount > 0)
			tile.objectGroup.objects.forEach(function(object){tile.objectGroup.removeObject(object)})
			
    })
}





let clear_action = tiled.registerAction("Clear Selection", clear_selected)
let draw_action = tiled.registerAction("Draw Ellipse", draw_ellipse)

clear_action.text = "Clear Selection"
clear_action.shortcut = "Ctrl+1"
draw_action.text = "Draw Ellipse"
draw_action.shortcut = "Ctrl+D"


tiled.extendMenu("Edit", [
    { action: "Clear Selection", before: "SelectAll" },
    // { separator: true }
]);

tiled.extendMenu("Edit", [
    { action: "Draw Ellipse", before: "SelectAll" },
    { separator: true }
]);


















		//points.push(Qt.point(x, y));
		//points.push(Qt.point(x-radius, y));
		//templist =[]
		//for (let i = 0 ; i< N; i++){
			//Theta = Pi * i /  N;
			//Fi =  Pi - Math.atan(Math.tan(Theta) * width/height);
		//templist.push(Qt.point(x -width*radius+ radius*width * Math.cos(Fi), y -height*radius + radius*height * Math.sin(Fi)))	
			//if(i== Math.round(N/2)){
				//templist.reverse().forEach(a=>points.push(a))
				//templist =[]
			//	}
			
		//}
		//templist.reverse().forEach(a=>points.push(a))

















