import processor from './processors/file';
import definition from './parsed.json';

const game = {
  location: 'ARENA',
  objects: {
    PLAYER: {
      items: ['SWORD']
    },
    SWORD: processor(definition),
    ARENA: {
      id: "ARENA",
      properties: {
        empty: false
      },
      items: []
    }
  },
  buffer: []
}

const actions = [game.objects.SWORD.START, game.objects.SWORD.TAKE]
const t1 = process.hrtime();
const result = actions.reduce((acc, fn) => fn(acc), game)
const t2 = process.hrtime(t1);

console.log(result.buffer[0]);