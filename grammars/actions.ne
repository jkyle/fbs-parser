@include "./text.ne"
@include "./game-objects.ne"
@include "./primatives.ne"

# TODO Update primatives when game objects are done.

# Actions
action -> "-" _ game_object _ operator _ primative
	{% d => ({type: d[4], target: d[2], value: d[6]}) %}

action -> "-" _ ("SAY"|"say"):? __ "((" passage "))"
	{% d =>  ({type: "say", passage: d[5]}) %}

#operators
operator -> (add | remove | set) {% d => d[0][0] %}
add -> "add" {% id %}
remove -> "remove" {% id %}
set -> "<-" {% d => "set" %}
