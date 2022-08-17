extends KinematicBody2D

export (int) var speed = 200

onready var _animated_sprite = $AnimatedSprite
var velocity = Vector2()
var axis = Vector2()
var right = Vector2(1, 0)
var left = Vector2(-1, 0)
var up = Vector2(0, -1)
var down = Vector2(0, 1)
var idle = Vector2(0, 0)

func get_input():
	velocity = Vector2()
	if Input.is_action_pressed("ui_right"):
		velocity.x += 1
	if Input.is_action_pressed("ui_left"):
		velocity.x -= 1
	if Input.is_action_pressed("ui_down"):
		velocity.y += 1
	if Input.is_action_pressed("ui_up"):
		velocity.y -= 1
	axis=velocity.normalized()
	velocity = axis * speed
	

func _physics_process(delta):
	get_input()
	velocity = move_and_slide(velocity)

var last_anim = 0
func _process(_delta):
	if axis==right:
		_animated_sprite.play("right")
		last_anim = 3
	if axis == left:
		_animated_sprite.play("left")
		last_anim = 2
		
	if axis == down:
		_animated_sprite.play("down")
		last_anim = 0
	if axis == up:
		_animated_sprite.play("up")
		last_anim = 1
	if axis == idle:
		_animated_sprite.stop()
		_animated_sprite.play("idle")
		_animated_sprite.frame=last_anim
