const _ = require("lodash");
const { METRIC_GROUPS } = require("analyzer-utilities");

const BaseMetric = require("analyzer-utilities/Base.metric");


/**
 * NumberDevDependenciesMetric
 *
 * This metric counts the number of dev metrics
 *
 *  @author Henrique Dias (henrique.dias@feedzai.com)
 *
 *  @extends BaseMetric
 */
class NumberDevDependenciesMetric extends BaseMetric {
    info() {
        return {
            name: "Number of Dev Dependencies",
            group: METRIC_GROUPS.RANDOM
        };
    }
    schema() {
        return {
            "result": {
                "type": "integer"
            }
        }
    }

    async verify() {
        return true;
    }

    async execute() {
        return {
            result: _.size(this.getPackage().devDependencies)
        };
    }
}

module.exports = NumberDevDependenciesMetric;
