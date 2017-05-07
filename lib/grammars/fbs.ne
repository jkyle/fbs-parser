@include "./events.ne"

files -> file:+
    {% id %}

file -> fileType " " fileName ("\n"):+ events ("\n"):*
    {% d => ({ type: d[0], id: d[2], events: d[4] }) %}

fileType -> "@" ("ITEM" | "LOCATION" | "CHARACTER" | "PLAYER" | "GLOBAL")
	{% d => d[1][0] %}

fileName -> [A-Z]:+ (" " [A-Z]:+):*
	{% d => [d[0].join(''), ...d[1].map(e => e[1].join(''))].join(' ') %}

events -> event_block ("\n" "\n":+ event_block):*
	{% d => [d[0], ...d[1].map(e => e[2])] %}