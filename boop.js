const processor = require('./processors/file');
const definition = require('./parsed')

const game = {
  objects: {
    SWORD: processor(definition)
  },
  buffer: []
}

const actions = [game.objects.SWORD.START, game.objects.SWORD.TAKE]
const result = actions.reduce((acc, fn) => fn(acc), game)
console.log(result.buffer[0]);