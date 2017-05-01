@include "./conditionals.ne"
@include "./primatives.ne"

passage -> "\n":* paragraph ("\n" "\n":+ paragraph):* "\n":*
	{% d => ({ paragraphs: [d[1], ...d[2].map(e => e[2])]}) %}

paragraph -> line ("\n" line):*
	{% d => ({lines:[d[0], ...d[1].map(e => e[1])]}) %}

line -> __ token (_ token):* __
	{% d => ({ tokens: [d[1], ...d[2].map(e => e[1])]}) %}

token -> conditional {% id %}
			 | safeToken {% id %}

safeToken -> safechar_no_ws:+ {% d=> d[0].join('') %}
conditional -> conditional_start __ passage __ conditional_end
	{% d => ({ type: 'condition', condition: d[0], passage: d[2]}) %}

conditional_start -> "{?" _ condition __ "}" {% d => d[2] %}
conditional_end -> "{x}" {% id %}