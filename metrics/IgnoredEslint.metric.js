const logger = require("pino")({
    prettyPrint: { colorize: true },
    translateTime: true
});
const { METRIC_GROUPS, executeCommandGetOutput } = require("@feedzai/analyzer-utilities");

const BaseMetric = require("@feedzai/analyzer-utilities/Base.metric");


/**
 * IgnoredEslintMetric
 *
 * This metric counts the number of ignored rules for each repo
 *
 *  @author Henrique Dias (henrique.dias@feedzai.com)
 *
 *  @extends BaseMetric
 */
class IgnoredEslintMetric extends BaseMetric {
    info() {
        return {
            name: "Ignored Eslint rules",
            group: METRIC_GROUPS.RANDOM
        };
    }
    schema() {
        return {
            "result": {
                "type": "integer"
            }
        };
    }
    async verify() {
        return true;
    }

    async executeCommand() {
        const result = await executeCommandGetOutput(this.getRepoFolder(),
            "grep -R 'eslint-disable' * --exclude-dir=node_modules  | wc -l");

        return parseInt(result);
    }
    async execute() {
        return this.executeCommand().then((result) => {
            return {
                result: result
            };
        }).catch(() => {
            logger.error("Error running grep to count number of ESlint disables");
            return {
                result: "N/A"
            };
        });
    }
}

module.exports = IgnoredEslintMetric;
