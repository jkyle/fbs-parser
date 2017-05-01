const processor = require('./processors/events');

const definition = {
  "method": "LOOK",
  "actions": [
    {
      "type": "say",
      "passage": {
        "paragraphs": [
          {
            "lines": [
              {
                "tokens": [
                  "This",
                  "is text.",
                  {
                    "type": "condition",
                    "condition": {
                      "left": {
                        "type": "GAME_OBJECT",
                        "id": "FOO",
                        "props": [
                          "takeable"
                        ]
                      },
                      "operator": "===",
                      "right": true
                    },
                    "passage": {
                      "paragraphs": [
                        {
                          "lines": [
                            {
                              "tokens": [
                                "butt{butt}. "
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  ]
}

const game = {
  objects: {
    FOO: {
      properties: {
        takeable: false
      }
    }
  },
  buffer: []
}

const passage = processor(definition);

console.log(passage(game).buffer);