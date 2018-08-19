## @sequencework/eslint-config

### 🏎 Short "How to use"

```
yarn add @sequencework/eslint-config --dev
yarn sequence-lint-init
yarn install
```

### Detailed "How to use"

Install this package :

```
yarn add @sequencework/eslint-config --dev
```

It contains a script to _initialize_ your package. Run it like this :

```
yarn sequence-lint-init
```

The script will rewrite your package.json to add dev dependencies, pre-commit hooks (with husky), lint-staged, ...

(For example, you can check what's added for the [default configuration](init-configs/default.json))

To install the new dependencies and the git hooks, you need to run :

```
yarn install
```

🎁 That's it, you're all set

### More

Shamelessly inspired by [@zeit's eslint config](https://github.com/zeit/eslint-config-base)
