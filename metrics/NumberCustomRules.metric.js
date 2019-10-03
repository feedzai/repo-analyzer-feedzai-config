
const _ = require("lodash");
const { METRIC_GROUPS, loadEslintFile } = require("@feedzai/analyzer-utilities");

const BaseMetric = require("@feedzai/analyzer-utilities/Base.metric");


/**
 * NumberCustomRulesMetric
 *
 * This metric counts custom ESlin rules
 *
 *  @author Henrique Dias (henrique.dias@feedzai.com)
 *
 *  @extends BaseMetric
 */
class NumberCustomRulesMetric extends BaseMetric {
    info() {
        return {
            name: "Eslint Custom rules",
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
        const FEEDZAI_ESLINT_CONFIGS = [
            "@feedzai/feedzai-react",
            "@feedzai/eslint-config-feedzai-react",
            "@feedzai/eslint-config-feedzai"
        ];

        const eslintRc = await loadEslintFile(this.getRepoFolder());

        let hasFeedzaiConfig;

        if (_.isObject(eslintRc) && _.isString(eslintRc.extends)) {
            hasFeedzaiConfig = FEEDZAI_ESLINT_CONFIGS.includes(eslintRc.extends);
        } else if (_.isObject(eslintRc) && Array.isArray(eslintRc.extends)) {
            hasFeedzaiConfig = _.isString(eslintRc.extends.find((config) => FEEDZAI_ESLINT_CONFIGS.includes(config)));
        } else {
            hasFeedzaiConfig = false;
        }

        let numberOfCustomRules = null;

        if (hasFeedzaiConfig) {
            if (_.isObject(eslintRc) && _.isObject(eslintRc.rules)) {
                numberOfCustomRules = _.size(eslintRc.rules);
            } else {
                numberOfCustomRules = 0;
            }
        } else {
            numberOfCustomRules = 0;
        }

        return {
            result: numberOfCustomRules
        };
    }
}

module.exports = NumberCustomRulesMetric;
