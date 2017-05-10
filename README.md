# Getting started.

`npm install --save https://github.com/jkyle/fbs-parser.git`

# Overview

> This doc is a WIP.

This project is comprised of three core components:

1. The `.fbs` parser and processor
2. The game engine
3. The input parser

## The `.fbs` parser

The fbs parser takes a directory of .fbs files and converts them to an fbs program and an initial game state, both as `.json` files.

To convert `.fbs` files into a program and game state, run

`fbs -i path/to/fbs/dir -o path/to/output/dir`

## The `fbs` processor

The script runner converts the `fbs` program JSON into a middleware function that can be used in the game engine.

To create the middleware function, import the processor, and pass it the program file.

```javascript
const { processor } = require('fbs')
const program = require('path/to/program.json')

const fbs = processor(program)
```

## The game engine

To create a game, use the `createGame` function. Its arguments are `initialState` and `middleware`.
`middleware` should be an array of middleware functions. The default set of middleware can be imported from `fbs`.

`createGame` returns an object with `subscribe` and `dispatch` methods.

`subscribe` takes a callback as an argument. The callback receives new game `state` as an argument any time the `dispatch` method gets called.
`dispatch` takes an event object with the following keys and values:

`type`: The type of event being triggered. This will almost always be the event submitted by the player. Example: `LOOK`, `GO`, `USE`, etc.
`subject`: The subject of the event. For example, if the player wants to look at the SWORD item, the subject would be `SWORD`.
`target`: Some events can have a target in addition to a subject. For example, a player could use one item on another. The receiving item would be the `target`.

`dispatch` will also take a string and try to figure out the event, subject and target from the input with the following pattern:

`<EVENT> <SUBJECT>` or
`<EVENT> preposition <SUBJECT>` or
`<EVENT> <SUBJECT> preposition <TARGET>`

where `preposition` is _on_, _in_, _at_, or _to_. The input parsers will also filter out _the_, _a_, and _an_. For example,

```javascript
dispatch('look at the light switch')
// { type: 'LOOK', subject: 'LIGHT SWITCH' }

dispatch('use headphones')
// { type: 'USE', subject: 'HEADPHONES' }

dispatch('use salt on the tomatoes')
// { type: 'USE', subject: 'SALT', target: 'TOMATOES' }
```

The engine will pass the event being triggered and the current state of the game as arguments to the middleware, and the middleware functions are allowed to manipulate the state of the game (or even the event being passed to other middleware), but must ultimately return `state`.

### The middleware

The engine really only works because of the middleware. Each middleware function takes the _next_ middleware function as an argument and returns a new function which takes `event` and `state` as arguments, ultimately returning `state` back to the game. Before returning the new state, the middleware should call the next function in the middleware chain, if applicable. For example, a simple middleware function that adds logging might look like this:

```javascript
const logger = next => (event, state) => {
  console.log('event: ', event)
  console.log('original state: ', state)
  const newState = next(event, state)
  console.log('new state: ', newState)
  return newState
}
```

### Example game with loggin middleware

```javascript
const initialState = { foo: 'bar' }
const { createGame } = require('fbs')
const loggerMiddleware = require('path/to/logger.js')

const game = createGame( initialState, [loggerMiddleware]);
game.dispatch({ type: 'EXAMPLE'})
// logs
// event: {type: 'EXAMPLE'}
// original state: { foo: 'bar' }
// new state: { foo: 'bar' }
```

In this case, the state didn't change because there were no other middleware functions in the chain to manipulate the state. In a typical game, you would have a set of default middleware as well as an `fbs` middleware function.

// TODO: Explain default middleware.

# Important notes.

* Your game needs at least one location and a player. That means one `.fbs` file that has

`@PLAYER PLAYER`

and one that has

`@LOCATION WHATEVER`

* Your initial state also needs a starting location:

```javascript
const initialState = require('path/to/state.json')
const { createGame } = require('fbs')

const game = createGame( Object.assign({}, initialState, { location: 'WHATEVER' })
```

* These constraints will probably get fixed.

# TODO

* [ ] Math Expressions
* [x] USE event with $TARGET
* [x] Selectors/Utilities