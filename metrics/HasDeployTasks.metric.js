
const { METRIC_GROUPS , fileExists } = require("analyzer-utilities");

const BaseMetric = require("analyzer-utilities/Base.metric");


/**
 * HasDeployTasksMetric
 *
 * This metric checks if deploy tasks are available
 *
 *  @author Henrique Dias (henrique.dias@feedzai.com)
 *
 *  @extends BaseMetric
 */
class HasDeployTasksMetric extends BaseMetric {
    info() {
        return {
            name: "Has deploy tasks",
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
            result: await fileExists(this.getRepoFolder(), ".release-script.yml")
        };
    }
}

module.exports = HasDeployTasksMetric;
