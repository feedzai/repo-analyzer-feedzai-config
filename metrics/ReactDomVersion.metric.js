
var _ = require("lodash");
const { METRIC_GROUPS } = require("analyzer-utilities");

const BaseMetric = require("analyzer-utilities/Base.metric");


/**
 * ReactDomVersionMetric
 *
 * This metric checks ReactDom Version
 *
 *  @author Henrique Dias (henrique.dias@feedzai.com)
 *
 *  @extends BaseMetric
 */
class ReactDomVersionMetric extends BaseMetric {
    info() {
        return {
            name: "React DOM Version",
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
        if (_.isString(this.getAllDependencies()["react-dom"])) {
            return true;
        }
        return false;
    }

    async execute() {
        return {
            result: this.getAllDependencies()["react-dom"]
        };
    }
}

module.exports = ReactDomVersionMetric;
