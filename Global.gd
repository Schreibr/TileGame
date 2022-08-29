extends Node2D


# Declare member variables here. Examples:
# var a = 2
# var b = "text"
func get_player()-> KinematicBody2D:
	return get_node("/root/Game/Kin") as KinematicBody2D

func get_camera() -> Camera2D:
	return get_node("/root/Game/Kin/Camera2D") as Camera2D

func get_GUI() -> MarginContainer:
	return get_node("/root/Game/CanvasLayer/GUI") as MarginContainer
