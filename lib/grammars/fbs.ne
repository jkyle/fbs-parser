@include "./events.ne"
@include "./computed-props.ne"

files -> file:+
    {% id %}

file -> fileType " " fileName ("\n"):+ computed_props ("\n"):+  events ("\n"):*
    {% d => ({ type: d[0], id: d[2], props: d[4], events: d[6] }) %}

fileType -> "@" ("ITEM" | "LOCATION" | "CHARACTER" | "PLAYER" | "GLOBAL")
	{% d => d[1][0] %}

fileName -> [A-Z]:+ (" " [A-Z]:+):*
	{% d => [d[0].join(''), ...d[1].map(e => e[1].join(''))].join(' ') %}

computed_props -> null
                | computed_prop ("\n" computed_prop):*
                {% d => Object.assign({}, d[0], d[1].reduce((acc, e) => Object.assign({}, acc, e[1]), {})) %}

events -> event_block ("\n" "\n":+ event_block):*
	{% d => [d[0], ...d[1].map(e => e[2]).filter(e => e)] %}