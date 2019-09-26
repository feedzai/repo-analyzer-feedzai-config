
const _ = require("lodash");
const { METRIC_GROUPS, loadEslintFile } = require("analyzer-utilities");

const BaseMetric = require("analyzer-utilities/Base.metric");


/**
 * HasFeedzaiConfigMetric
 *
 * This metric checks if repo has Eslint Feedzai Config
 *
 *  @author Henrique Dias (henrique.dias@feedzai.com)
 *
 *  @extends BaseMetric
 */
class HasFeedzaiConfigMetric extends BaseMetric {
    info() {
        return {
            name: "Has Feedzai config",
            group: METRIC_GROUPS.HAS
        };
    }

    async verify() {
        return true;
    }

    schema() {
        return {
            "result": {
                "type": "boolean"
            }
        }
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

        return {
            result: hasFeedzaiConfig
        };
    }
}

module.exports = HasFeedzaiConfigMetric;
