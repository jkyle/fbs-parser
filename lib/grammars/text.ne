@include "./expression.ne"
@include "./conditionals.ne"
@include "./primatives.ne"

passage -> "\n":* paragraph ("\n" "\n":+ paragraph):* "\n":*
	{% d => ({ paragraphs: [d[1], ...d[2].map(e => e[2])]}) %}

paragraph -> line ("\n" line):*
	{% d => ({lines:[d[0], ...d[1].map(e => e[1])]}) %}

line -> __ first_token __
	{% d => ({ tokens: d[1] }) %}

first_token -> condition_token		  {% id %}
			 			 | property_token      {% id %}
						 | string_token				{% id %}

rest_token -> condition_token		  {% id %}
			 			| property_token      {% id %}

string_token -> safeToken (_ safeToken):* sp_token_1:?
	{% d => [[d[0], ...d[1].map(e => e[1])].join(' '), ...(d[2] ? d[2] : [])] %}
condition_token -> conditional sp_token:?
	{% d => [d[0], ...(d[1] ? d[1] : [])] %}
property_token -> object_property sp_token:?
	{% d => [d[0], ...(d[1] ? d[1] : [])] %}

sp_token_1 -> __ (condition_token | property_token)
	{% d => [d[0], ...d[1][0]] %}
sp_token -> __ (condition_token | string_token | property_token)
	{% d => [d[0], ...d[1][0]] %}

safeToken -> safechar_no_ws:+ {% d=> d[0].join('') %}
conditional -> conditional_start passage conditional_end
	{% d => ({ type: 'condition', condition: d[0], passage: d[1]}) %}

conditional_start -> "{?" _ condition __ "}" {% d => d[2] %}
conditional_end -> "{x}" {% id %}

object_property -> "{@" _ expression __ "}" {% d => d[2] %}