game_object -> name props
	{% d => ({ type: "GAME_OBJECT", id: d[0], props: d[1] }) %}
					   | "$THIS" props
  {% d => ({ type: "THIS", props: d[1] }) %}
					   | "$LOCATION" props
  {% d => ({ type: "LOCATION", props: d[1] }) %}
						 | "$INVENTORY" props
  {% d => ({ type: "INVENTORY", props: d[1] }) %}

name -> [A-Z]:+ {% d => d[0].join('') %}
		 | "<" [A-Z ]:+ ">" {% d => d[1].join('') %}

props -> (prop | sProp):*
	{% d => d[0].map(e => e[0]) %}

prop -> "." [a-zA-Z]:+
	{% d => d[1].join('') %}

sProp -> "." "<" [a-zA-Z ]:+ ">"
	{% d => d[2].join('') %}
