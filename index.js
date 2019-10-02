const BundleSizeMetric =  require("./metrics/BundleSize.metric");
const CoverageMetric =  require("./metrics/Coverage.metric");
const HasBuildMetric =  require("./metrics/HasBuild.metric");
const HasChangelogMetric =  require("./metrics/HasChangelog.metric");
const HasTestAndLinterMetric =  require("./metrics/HasTestAndLinter.metric");
const HasReadmeMetric =  require("./metrics/HasReadme.metric");
const IgnoredEslintMetric =  require("./metrics/IgnoredEslint.metric");
const JestVersionMetric =  require("./metrics/JestVersion.metric");
const NumberCustomRulesMetric =  require("./metrics/NumberCustomRules.metric");
const NumberDependenciesMetric =  require("./metrics/NumberDependencies.metric");
const NumberDevDependenciesMetric =  require("./metrics/NumberDevDependencies.metric");
const ReactDomVersionMetric =  require("./metrics/ReactDomVersion.metric");
const ReactVersionMetric =  require("./metrics/ReactVersion.metric");
const WebpackVersionMetric =  require("./metrics/WebpackVersion.metric");


/**
 * index
 *
 * @author Henrique Dias (henrique.dias@feedzai.com)
 * @since 1.0.0
 */

module.exports = {

  metrics: [
    BundleSizeMetric,
    CoverageMetric,
    HasBuildMetric,
    HasChangelogMetric,
    HasTestAndLinterMetric,
    HasReadmeMetric,
    IgnoredEslintMetric,
    JestVersionMetric,
    NumberCustomRulesMetric,
    NumberDependenciesMetric,
    NumberDevDependenciesMetric,
    ReactDomVersionMetric,
    ReactVersionMetric,
    WebpackVersionMetric
  ],
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
