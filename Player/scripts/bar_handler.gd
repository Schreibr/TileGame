extends Node


# Declare member variables here. Examples:
# var a = 2
# var b = "text"
var pos
onready var body = Global.get_player().body
onready var hp = get_node("bars/HP_bar/background/HP")
onready var energy = get_node("bars/Energy_bar/background/Energy")



func update_bar():
	hp.value = body.hp
	hp.max_value = body.max_hp
	energy.value = body.hp
	energy.max_value = body.max_hp
	


# Called every frame. 'delta' is the elapsed time since the previous frame.
#func _process(delta):
#	pass

