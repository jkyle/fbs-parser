@include "./actions.ne"
@include "./conditionals.ne"
@include "./primatives.ne"

event_block -> __ method ("\n" __ doable):+
	{% d => ({ method: d[1], actions: d[2].map(e => e[2]).filter(e => e)}) %}
						 | comment {% d => null %}

method -> [A-Z]:+ _ ">>"
	{% d => d[0].join('') %}

condition_block -> condition_start _ condition ("\n" __ doable):+ ("\n" __ condition_else __ ("\n" __ doable):+):? "\n" __ condition_end
	{% d => ({ type: "condition",
						condition: d[2],
						actions: d[3].map(e => e[2]),
						elseActions: (d[4] ? d[4][4].map(e => e[2]) : null) })
	%}

condition_start -> "?"
condition_end -> "x"
condition_else -> "~"

doable -> (action | condition_block) {% d => d[0][0] %}
				| comment {% d => null %}
