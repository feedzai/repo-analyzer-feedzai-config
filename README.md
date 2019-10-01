# repo-analyzer-config

Default configuration project for the [repo-analyzer](https://github.com/feedzai/repo-analyzer) tool.

# Metrics

This configuration implements the following metrics:
- **Bundle Size** Calculates the size of the generated `.js` and `.css` files. Assumes that an `npm run build` command exists and that it calls webpack. Works only with webpack.
- **Coverage** Calculates the branch and line coverage. Works only with jest.
- **Has build** Whenever the repository has a `npm run build` command
- **Has changelog** Whenever the repository has a CHANGELOG.md file
- **Has readme** Whenever the repository has a README.md file
- **Has test and linter** Whenever the repository has the `npm run test` and `npm run lint` commands
- **Ignored eslint rules** Counts the number of `eslint-disable`s
- **Custom eslint rules** Counts the number of rule overrides in the local eslint config.
- **Jest version** The version of Jest
- **React version** The version of React
- **React DOM version** The version of React DOM
- **Webpack version** The version of Webpack
- **Number of dependencies** The number of dependencies in `package.json`
- **Number of dev dependencies** The number of dev dependencies in `package.json`

# Other configurations

This repository also contains:
- Configurations to Elastic, namely the url/port (localhost:9200) and rate limiting.
- Configurations to the console, json and formatd file reporters.

# Extending this configuration

Take a look at the `index.js` file, the structure is simple.

If you implement new metrics we recommend overriding the `metrics` property and importing just the metrics you want.

If you need to override other properties we recommend cloning the object and changing what you need directly.

# Licence

MIT
