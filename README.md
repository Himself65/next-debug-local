# Next Debug Local

> Debug you package outside the monorepo

## Usage

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ...
}

const withDebug = require('next-debug-local')({
  '@blocksuite/store': '/path/to/repo/packages/store',
  '@blocksuite/blocks': '/path/to/repo/packages/blocks',
  '@blocksuite/editor': '/path/to/repo/packages/editor',
}, {
  enable: process.env.ENABLE_DEBUG_LOCAL
})

module.exports = withDebug(config)
```

## LICENSE

[MIT LICENSE](LICENSE)