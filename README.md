
# objectify v1.0.2

```coffee
objectify = require "objectify"

obj = objectify
  keys: ["a", "b"]
  values: [0, 1]

obj.a # 0
obj.b # 1

obj = objectify
  keys: { a: 1 }
  values: { a: 2, b: 3 }

obj.a # 2
obj.b # undefined
```

## install

```sh
npm install aleclarson/objectify#1.0.0
```
