extends Node
class_name Body

# Variables
## Exports
export(int) var base_hp = 10
export(int) var base_energy = 10
export(int) var base_attack=1
export(int) var base_defense=0
export(int) var base_energy_restore_rate= 2 #retore rate per seconde

#export(int) var movement_speed = 5

## Computed stats
onready var hp = base_hp
onready var energy = base_energy
onready var bar_handler = Global.get_GUI()
var max_hp
var max_energy
var attack
var defense
var energy_restore_rate

#test possible buff
var hp_restore_rate=1

## Timers
#define new timer with structur _<name>_timer
var _energy_timer = Timer.new()
var _hp_timer = Timer.new()
#list of all timers, to start/stop all at ones
var timers:Array

# Functions
func _ready():
	reset_stats()
	add_timer("energy")
	add_timer("hp")

func reset_stats():
	max_hp = base_hp
	max_energy = base_energy
	attack = base_attack
	defense = base_defense
	energy_restore_rate = base_energy_restore_rate
	
	
#if someone find a better name go on!
func hp_modify(value):
	var dmg = value - defense
	if value<0:
		heal(dmg)
	else:
		take_damage(dmg)
	hp= clamp(hp, 0, max_hp)
		
func heal(value):
	hp -= value
	
func take_damage(value):
	print("take damage: ", value)
	hp-=value
	if _hp_timer.is_stopped():
		_hp_timer.start()
	
func use_energy(value) -> bool:
	if value > energy:
		return false
	energy -= value
	
	if _energy_timer.is_stopped():
		_energy_timer.start()
	return true

func is_dead():
	return hp == 0

func add_timer(name):
	var timer=get("_"+name+"_timer")
	timer.connect("timeout", self, "_on_"+name+"_timer")
	add_child(timer)
	timers.append(timer)

func start_all_timers():
	for i in timers:
		i.start()
## timer calbacks
#define func in structur _on_<name>_timer()
func _on_hp_timer():
	restore_stat("hp")
func _on_energy_timer():
	restore_stat("energy")

func is_full_life():
	return hp==max_hp 

func restore_stat(stat_name):
	var max_value=get("max_"+stat_name)
	self[stat_name]+=get(stat_name+"_restore_rate")
	self[stat_name]=clamp(self[stat_name], 0, max_value )
	if self[stat_name]==max_value:
		get("_"+stat_name+"_timer").stop()
