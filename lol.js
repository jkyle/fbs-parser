module.exports = {
  "type": "ITEM",
  "id": "SWORD",
  "events": [
    {
      "method": "START",
      "actions": [
        {
          "type": "set",
          "target": {
            "type": "GAME_OBJECT",
            "id": "FOO",
            "props": [
              "strength"
            ]
          },
          "value": 10
        },
        {
          "type": "set",
          "target": {
            "type": "GAME_OBJECT",
            "id": "FOO",
            "props": [
              "takeable"
            ]
          },
          "value": false
        },
        {
          "type": "set",
          "target": {
            "type": "GAME_OBJECT",
            "id": "FOO",
            "props": [
              "name"
            ]
          },
          "value": "Magic Sword"
        }
      ]
    },
    {
      "method": "TAKE",
      "actions": [
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
            "right": false
          },
          "actions": [
            {
              "type": "set",
              "target": {
                "type": "GAME_OBJECT",
                "id": "FOO",
                "props": [
                  "takeable"
                ]
              },
              "value": true
            },
            {
              "type": "condition",
              "condition": {
                "left": {
                  "type": "GAME_OBJECT",
                  "id": "FOO",
                  "props": [
                    "strength"
                  ]
                },
                "operator": ">",
                "right": 10
              },
              "actions": [
                {
                  "type": "set",
                  "target": {
                    "type": "GAME_OBJECT",
                    "id": "FOO",
                    "props": [
                      "strength"
                    ]
                  },
                  "value": 3
                }
              ]
            },
            {
              "type": "set",
              "target": {
                "type": "GAME_OBJECT",
                "id": "FOO",
                "props": [
                  "baz"
                ]
              },
              "value": "bar"
            }
          ]
        }
      ]
    },
    {
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
  ]
}