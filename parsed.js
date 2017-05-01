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
            "id": "SWORD",
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
            "id": "SWORD",
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
            "id": "SWORD",
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
              "id": "SWORD",
              "props": [
                "takeable"
              ]
            },
            "operator": "===",
            "right": false
          },
          "actions": [
            {
              "type": "say",
              "passage": {
                "paragraphs": [
                  {
                    "lines": [
                      {
                        "tokens": [
                          "No",
                          "you",
                          "don't.",
                          "The",
                          "sword",
                          "is",
                          "stuck."
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
                      "The",
                      "sword",
                      "gleams",
                      "in",
                      "the",
                      "sunlight."
                    ]
                  },
                  {
                    "tokens": [
                      {
                        "type": "condition",
                        "condition": {
                          "left": {
                            "type": "GAME_OBJECT",
                            "id": "SWORD",
                            "props": [
                              "takeable"
                            ]
                          },
                          "operator": "===",
                          "right": false
                        },
                        "passage": {
                          "paragraphs": [
                            {
                              "lines": [
                                {
                                  "tokens": [
                                    "It",
                                    "seems",
                                    "to",
                                    "be",
                                    "stuck",
                                    "in",
                                    "the",
                                    "stone."
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