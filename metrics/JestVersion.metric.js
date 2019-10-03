
var _ = require("lodash");
const { METRIC_GROUPS } = require("@feedzai/analyzer-utilities");

const BaseMetric = require("@feedzai/analyzer-utilities/Base.metric");


/**
 * JestVersionMetric
 *
 * This metric checks Jest version
 *
 *  @author Henrique Dias (henrique.dias@feedzai.com)
 *
 *  @extends BaseMetric
 */
class JestVersionMetric extends BaseMetric {
    info() {
        return {
            name: "Jest Version",
            group: METRIC_GROUPS.VERSIONS
        };
    }
    schema() {
        return {
            "result": {
                "type": "float"
            }
        }
    }

    async verify() {
        if (_.isString(this.getAllDependencies().jest)) {
            return true;
        }
        return false;
    }

    async execute() {
        return {
            result: this.getAllDependencies().jest
        };
    }
}

module.exports = JestVersionMetric;
