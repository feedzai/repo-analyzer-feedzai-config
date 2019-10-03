
const { METRIC_GROUPS , fileExists } = require("@feedzai/analyzer-utilities");

const BaseMetric = require("@feedzai/analyzer-utilities/Base.metric");


/**
 * HasReadmeMetric
 *
 * This metric checks if repo has Readme file
 *
 *  @author Henrique Dias (henrique.dias@feedzai.com)
 *
 *  @extends BaseMetric
 */
class HasReadmeMetric extends BaseMetric {
    info() {
        return {
            name: "Has README file",
            group: METRIC_GROUPS.HAS
        };
    }

    schema() {
        return {
            "result": {
                "type": "boolean"
            }
        }
    }
    
    async verify() {
        return true;
    }

    async execute() {
        return {
            result: await fileExists(this.getRepoFolder(), "README.md")
        };
    }
}

module.exports = HasReadmeMetric;
