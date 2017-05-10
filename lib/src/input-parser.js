const prepositions = ['ON', 'IN', 'INTO', 'AT', 'TO']

/* This is gross, but whatevs */

const parse = input => {
  const [ event, ...rest ] = input.toUpperCase()
                                  .split(' ')
                                  .filter(i => i)
                                  .filter(i => i !== 'THE')
                                  .filter(i => i !== 'A')
                                  .filter(i => i !== 'AN')


  const matches = prepositions.map(prep => {
    const idx = rest.indexOf(prep)
    return (idx > -1) ?
      [ rest.slice(0, idx).join(' '),
        rest.slice(idx + 1).join(' ')] :
      []
    }).filter(arr => arr.length > 0)

  const match = matches[0] // greedy with first match if there are multiple
  if(match) {
    const [first, second] = match;
    if (first.length > 0) {
      return {
        type: event,
        subject: first,
        target: second
      }
    }
    return {
      type: event,
      subject: second
    }
  }

  return {
    type: event,
    subject: rest.join(' ')
  }

}

export default parse