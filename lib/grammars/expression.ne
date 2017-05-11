@include "./primatives.ne"
@include "./game-objects.ne"

expression -> AddSub {% id %}

Paren -> "(" __ AddSub __ ")" {% d => d[2] %}
	     | value {% id %}

MulDivMod -> MulDivMod __ mulDivModOp __ Paren {% d => ({ left: d[0], operator: d[2], right: d[4]}) %}
		       | Paren {% id %}

AddSub -> AddSub __ addSubOp __ MulDivMod {% d => ({ left: d[0], operator: d[2], right: d[4]}) %}
		    | MulDivMod {% id %}

value -> (number | game_object | string) {% d => d[0][0] %}
# number -> [0-9]:+ {% d => parseInt(d[0].join(''), 10) %}

mulDivModOp -> (mul | div | mod) {% d => d[0][0] %}
addSubOp -> (plus | minus) {% d => d[0][0] %}

# ___ -> [ ]:*

plus -> "+" {% id %}
minus -> "-" {% id %}
mul -> "*" {% id %}
div -> "/" {% id %}
mod -> "%" {% id %}

