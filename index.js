
/**
 * index
 *
 * @author Henrique Dias (henrique.dias@feedzai.com)
 * @since 1.0.0
 */

module.exports = {

  metrics: [
    "./metrics/BundleSize.metric.js",
    "./metrics/Coverage.metric.js",
    "./metrics/HasBuild.metric.js",
    "./metrics/HasChangelog.metric.js",
    "./metrics/HasTestAndLinter.metric.js",
    "./metrics/HasReadme.metric.js",
    "./metrics/IgnoredEslint.metric.js",
    "./metrics/JestVersion.metric.js",
    "./metrics/NumberCustomRules.metric.js",
    "./metrics/NumberDependencies.metric.js",
    "./metrics/NumberDevDependencies.metric.js",
    "./metrics/ReactDomVersion.metric.js",
    "./metrics/ReactVersion.metric.js",
    "./metrics/WebpackVersion.metric.js",
  ].map(require.resolve),

  reporters: {
    active: [
      "console",
      "formated-file",
      "json",
      "elastic"
    ],
    "formated-file": "./tmp/report.txt",
    "elastic": {
      "address": "localhost",
      "port": 9200,
      "rate-limit": {
        "maxRequests": 1,
        "perMilliseconds": 500
      }
    },
    console: {},
    json: {
      "output-file": "./tmp/report.json"
    }
  }
};
