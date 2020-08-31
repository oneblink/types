# OneBlink Flow and Typescript Types

A central repository for OneBlink flow and typescript types, used internally.

## Installation

```sh
npm install --save-dev oneblink/types#master
```

This will install the package to node_modules and add `"@oneblink/types": "github:oneblink/types#master"` to your `package.json` file

### For flow types:

You then need to add

```
[libs]
node_modules/@oneblink/types/flow-typed/
```

to your `.flowconfig` file, or just the types you need.

```
[libs]
node_modules/@oneblink/types/flow-typed/forms.js
```

### For typescript types:

You need to import types where you want to use them

```ts
import { FormTypes, FormsAppsTypes, MiscTypes, SubmissionEventTypes } from '@oneblink/types'
```

or specify them in your tsconfig.json file to make them global

```json

"typeRoots": [
    "./node_modules/@oneblink/types"
],

```
