# Next Debug Local

> Debug you package outside the monorepo

## Requirement

Next.js > 13.1.0

## Usage

```javascript
const path = require('node:path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

const baseDir = process.env.LOCAL_BLOCK_SUITE ?? '/'
const withDebugLocal = require('next-debug-local')(
  {
    '@blocksuite/editor': path.resolve(baseDir, 'packages', 'editor'),
    '@blocksuite/blocks': path.resolve(baseDir, 'packages', 'blocks'),
    '@blocksuite/store': path.resolve(baseDir, 'packages', 'store'),
  },
  {
    enable: path.isAbsolute(process.env.LOCAL_BLOCK_SUITE ?? ''),
  }
)

module.exports = withDebugLocal(nextConfig)
```

## LICENSE

[MIT LICENSE](LICENSE)