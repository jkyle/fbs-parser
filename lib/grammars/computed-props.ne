@include "./primatives.ne"
@include "./game-objects.ne"
@include "./text.ne"

computed_prop ->  ":" props __ "((" passage "))"
  {% d => ({ [d[1][0]]: d[4] })%}