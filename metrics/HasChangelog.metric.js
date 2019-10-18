
const { METRIC_GROUPS , fileExists } = require("@feedzai/analyzer-utilities");

const BaseMetric = require("@feedzai/analyzer-utilities/Base.metric");


/**
 * HasChangelogMetric
 *
 * This metric checks if Changelog file is present
 *
 *  @author Henrique Dias (henrique.dias@feedzai.com)
 *
 *  @extends BaseMetric
 */
class HasChangelogMetric extends BaseMetric {
    info() {
        return {
            name: "Has Changelog file",
            group: METRIC_GROUPS.HAS
        };
    }

    schema() {
        return {
            "result": {
                "type": "boolean"
            }
        };
    }

    async verify() {
        return true;
    }

    async execute() {
        return {
            result: await fileExists(this.getRepoFolder(), "CHANGELOG.md")
        };
    }
}

module.exports = HasChangelogMetric;
