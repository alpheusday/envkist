# Envkist

A utility to defer the resolution of environment variables.

Instead of reading the variables directly, declare specs for them and resolve on demand.

- Support different runtimes like browser, Node.js, Deno, Bun, Cloudflare
- Declare typed specs for environment variables with optional fallback values
- Type-guard checks to determine whether a value matches a desired spec
- Resolve specs to typed values at runtime with automatic type coercion
- Generate JavaScript source strings from specs for build-time code injection

## Installation

Install this package as a dependency in the project:

```sh
# npm
npm i envkist

# Yarn
yarn add envkist

# pnpm
pnpm add envkist

# Deno
deno add npm:envkist

# Bun
bun add envkist
```

## Usage

For the usage, please refer to the [examples](./examples).

## Contributing

For contributing, please refer to the [contributing guide](./CONTRIBUTING.md).

## License

This project is licensed under the terms of the MIT license.
