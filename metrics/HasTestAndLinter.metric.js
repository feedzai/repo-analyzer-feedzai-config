
const _ = require("lodash");
const { METRIC_GROUPS } = require("analyzer-utilities");

const BaseMetric = require("analyzer-utilities/Base.metric");


/**
 * HasTestAndLinterMetric
 *
 * This metric checks if repo has test and linter metric
 *
 *  @author Henrique Dias (henrique.dias@feedzai.com)
 *
 *  @extends BaseMetric
 */
class HasTestAndLinterMetric extends BaseMetric {
    info() {
        return {
            name: "Has test and linter",
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
        if (_.isObject(this.getPackage()) && _.isObject(this.getPackage().scripts)) {
            return {
                result: _.isString(this.getPackage().scripts.test)
            };
        }
        return {
            result: false
        };
    }
}

module.exports = HasTestAndLinterMetric;
