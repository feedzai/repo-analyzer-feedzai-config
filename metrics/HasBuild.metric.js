
const _ = require("lodash");
const { METRIC_GROUPS } = require("analyzer-utilities");

const BaseMetric = require("analyzer-utilities/Base.metric");


/**
 * HasBuildMetric
 *
 * This metric checks if `npm run build` is present
 *
 *  @author Henrique Dias (henrique.dias@feedzai.com)
 *
 *  @extends BaseMetric
 */

class HasBuildMetric extends BaseMetric {
    info() {
        return {
            name: "Has build command",
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
                result: _.isString(this.getPackage().scripts.build)
            };
        } return {
            result: false
        };

    }

}

module.exports = HasBuildMetric;

