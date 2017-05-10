@include "./primatives.ne"
@include "./game-objects.ne"
@include "./expression.ne"

# Conditional
condition -> left _ comparator _ right
	{% d => ({ left: d[0], operator: d[2], right: d[4] }) %}

left -> game_object {% id %}
#right -> ( primative | game_object ) {% d => d[0][0] %}

right -> expression_or_primative {% id %}

# Comparators
comparator -> (eq | ne | lt | lte | gt | gte | has | lacks)
	{% d => d[0][0] %}

eq -> ("=" | "==" | "===" | "eq" | "EQ" | "is" | "IS")
	{% d => "===" %}
ne -> ("!=" | "!==" | "ne" | "NE" | "not" | "NOT")
	{% d => "!==" %}
lt -> ("<" | "lt" | "LT")
	{% d => "<" %}
lte -> ("<=" | "lte" | "LTE")
	{% d => "<=" %}
gt -> (">" | "gt" | "GT")
	{% d => ">" %}
gte -> (">=" | "gte" | "GTE")
	{% d => ">=" %}
has -> ("has" | "HAS" | "contains" | "CONTAINS" | "includes" | "INCLUDES")
	{% d => "has" %}
lacks -> ("lacks" | "LACKS")
	{% d => "lacks" %}