const _ = require("lodash");
const { METRIC_GROUPS } = require("analyzer-utilities");

const BaseMetric = require("analyzer-utilities/Base.metric");


/**
 * NumberDependenciesMetric
 *
 * This metric counts the number of dependencies
 *
 *  @author Henrique Dias (henrique.dias@feedzai.com)
 *
 *  @extends BaseMetric
 */
class NumberDependenciesMetric extends BaseMetric {
    info() {
        return {
            name: "Number of Dependencies",
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
            result: _.size(this.getPackage().dependencies)
        };
    }
}

module.exports = NumberDependenciesMetric;
