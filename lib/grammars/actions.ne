@include "./text.ne"
@include "./primatives.ne"
@include "./expression.ne"
@include "./game-objects.ne"

# Actions
action -> "-" _ game_object _ operator _ expression_or_primative
	{% d => ({type: d[4], target: d[2], value: d[6]}) %}

action -> "-" _ ("SAY"|"say"):? __ "((" passage "))"
	{% d =>  ({type: "say", passage: d[5]}) %}

game_object_or_primative -> game_object {% id %}
   											 | primative {% id %}

expression_or_primative -> expression {% id %}
  											 | primative_no_num {% id %}
												 | "$INPUT" {% d => ({type: 'INPUT'}) %}


#operators
operator -> (add | remove | set) {% d => d[0][0] %}
add -> "add" {% id %}
remove -> "remove" {% id %}
set -> "<-" {% d => "set" %}
