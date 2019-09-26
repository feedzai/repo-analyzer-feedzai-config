
const _ = require("lodash");
const { METRIC_GROUPS } = require("analyzer-utilities");

const BaseMetric = require("analyzer-utilities/Base.metric");


/**
 * ReactVersionMetric
 *
 * This metric checks the React version
 *
 *  @author Henrique Dias (henrique.dias@feedzai.com)
 *
 *  @extends BaseMetric
 */
class ReactVersionMetric extends BaseMetric {
    info() {
        return {
            name: "React Version",
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
        if (_.isString(this.getAllDependencies().react)) {
            return true;
        }

        return false;
    }

    async execute() {
        return {
            result: this.getAllDependencies().react
        };
    }
}

module.exports = ReactVersionMetric;
