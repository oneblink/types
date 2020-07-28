# OneBlink Flow Types

A central repository for OneBlink flow types used internally.

## Installation

```sh
npm install --save-dev oneblink/flow-types#master
```

This will install the package to node_modules and add `"@oneblink/flow-types": "github:oneblink/flow-types#master"` to your `package.json` file

You then need to add

```
[libs]
node_modules/@oneblink/flow-types/flow-typed/
```

to your `.flowconfig` file, or just the types you need.

```
[libs]
node_modules/@oneblink/flow-types/flow-typed/forms.js
```
