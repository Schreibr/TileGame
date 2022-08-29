extends ProgressBar


# Declare member variables here. Examples:
# var a = 2
# var b = "text"
var pos
var parent: Body
func _ready():
	parent = get_parent()

	#get_parent().start_all_timers()
	# Update UI values	
		#yield(get_tree().create_timer(1), "timeout")

	
func update_bar():
	self.value = parent.hp
	self.max_value = parent.max_hp


# Called every frame. 'delta' is the elapsed time since the previous frame.
#func _process(delta):
#	pass
