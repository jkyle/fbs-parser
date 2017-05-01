const processor = require('./processors/file');
const definition = require('./lol')

const game = {
  objects: {
    FOO: processor(definition)
  },
  buffer: []
}

console.log(game);
const newGame = game.objects.FOO.START(game);
console.log(game.objects.FOO.LOOK(newGame));