@include "./conditionals.ne"
@include "./game-objects.ne"
@include "./primatives.ne"

passage -> "\n":* paragraph ("\n" "\n":+ paragraph):* "\n":*
	{% d => ({ paragraphs: [d[1], ...d[2].map(e => e[2])]}) %}

paragraph -> line ("\n" line):*
	{% d => ({lines:[d[0], ...d[1].map(e => e[1])]}) %}

line -> __ first_token rest_token:* __
	{% d => ({ tokens: [d[1], ...d[2]]}) %}

rest_token -> __ conditional		  {% d => d[1] %}
			  		| _ safeToken					{% d => d[1] %}
			 			| __ object_property  {% d => d[1] %}

first_token -> conditional		 {% id %}
			    	 | safeToken			 {% id %}
			 			 | object_property {% id %}

string_token -> safeToken (_ safeToken):* {% d => [d[0], ...d[1].map(e => e[1])].join(' ') %}
condition_token -> conditional (condition_token | string_token | property_token):?
property_token -> object_property (condition_token | string_token | property_token):?

safeToken -> safechar_no_ws:+ {% d=> d[0].join('') %}
conditional -> conditional_start passage conditional_end
	{% d => ({ type: 'condition', condition: d[0], passage: d[1]}) %}

conditional_start -> "{?" _ condition __ "}" {% d => d[2] %}
conditional_end -> "{x}" {% id %}

object_property -> "{@" _ game_object __ "}" {% d => d[2] %}