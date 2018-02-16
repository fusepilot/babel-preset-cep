# babel-preset-cep

## What

Babel preset intended for use with Adobe CEP Panels. It wraps `babel-preset-env` and provides ergonomic improvements working with NodeJS `require()` in the CEP panel context.

## Install

With NPM:

```sh
$ npm install --save-dev babel-preset-cep
```

With Yarn:

```sh
$ yarn add --dev babel-preset-cep
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["cep"]
}
```

### Via CLI

```sh
$ babel script.js --presets cep
```

### Via Node API

```javascript
require('babel-core').transform('code', {
  presets: ['cep'],
});
```

### NodeJS `require()`

Placeing `// node-require` above a `require()` statement will convert the statement to `cep_node.require()`. This is mainly useful for keeping Typescript type checking and intellisense working for extension node_module requires. 

```typescript
// node-require
import fs = require("fs")
```

Will transpile to:

```javascript
// node-require
var fs = window.cep_node.require("fs");
```