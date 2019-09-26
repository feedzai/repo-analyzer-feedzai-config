
var _ = require("lodash");
const { METRIC_GROUPS } = require("analyzer-utilities");

const BaseMetric = require("analyzer-utilities/Base.metric");


/**
 * HasPublishConfigMetric
 *
 * This metric checks if repo has publish config
 *
 *  @author Henrique Dias (henrique.dias@feedzai.com)
 *
 *  @extends BaseMetric
 */
class HasPublishConfigMetric extends BaseMetric {
    info() {
        return {
            name: "Has publish config",
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
            result: _.has(this.getPackage(), "publishConfig")
        };
    }
}

module.exports = HasPublishConfigMetric;
