primative -> (string | number | boolean) {% d => d[0][0] %}

# string
string -> quote safechar:+ quote {% d => d[1].join('') %}

safechar_no_ws -> quote       {% d => "\\" + d[0] %}
      	  | tick        {% id %}
		      | alpha       {% id %}
		      | punctuation {% id %}

safechar -> quote       {% d => "\\" + d[0] %}
      	  | tick        {% id %}
		      | alpha       {% id %}
		      | ws          {% id %}
		      | punctuation {% id %}

quote -> "\"" {% id %}
tick -> "'" {% id %}
alpha -> [a-zA-Z0-9] {% id %}
punctuation -> [.?!,$%*#()[\]] {% id %}
ws -> " "
# number
number -> integer {% id %}
        | float   {% id %}

integer -> negative [0-9]:+
	{% d => parseInt(d[0] + d[1].join('')) %}
float ->   negative [0-9]:+ "." [0-9]:+
	{% d => parseFloat(`${d[0]}${d[1].join('')}.${d[3].join('')}`) %}

negative -> "-":? {% d => d[0] ? "-" : "" %}

# boolean
boolean -> "true"   {% d => true %}
         | "false"  {% d => false %}

# whitespace
_ -> [ ]:+  {% null %}
__ -> [ ]:* {% null %}