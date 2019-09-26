
var _ = require("lodash");
const { METRIC_GROUPS } = require("analyzer-utilities");

const BaseMetric = require("analyzer-utilities/Base.metric");


/**
 * WebpackVersionMetric
 *
 * This metric checks the Webpack version
 *
 *  @author Henrique Dias (henrique.dias@feedzai.com)
 *
 *  @extends BaseMetric
 */
class WebpackVersionMetric extends BaseMetric {
    info() {
        return {
            name: "Webpack Version",
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
        if (_.isString(this.getAllDependencies().webpack)) {
            return true;
        }
        return false;
    }

    async execute() {
        return {
            result: this.getAllDependencies().webpack
        };
    }
}

module.exports = WebpackVersionMetric;
