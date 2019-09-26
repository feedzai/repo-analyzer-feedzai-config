var _ = require("lodash");
const logger = require("pino")({
    prettyPrint: { colorize: true },
    translateTime: true
});
const {
    isInstalled,
    METRIC_GROUPS,
    executeCommand,
    getFileFolder,
} = require("analyzer-utilities");
var fs = require("fs");
const { getRepoName } = require("analyzer-utilities/repoMethods");

const BaseMetric = require("analyzer-utilities/Base.metric");

/**
 * BundleSizeMetric
 *
 * This class implements the coverage metric
 *
 *  @author Henrique Dias (henrique.dias@feedzai.com)
 *
 *  @extends BaseMetric
 */
class BundleSizeMetric extends BaseMetric {
    /**
     * Used to specify details about this metric.
     *  @returns {object}
     */
    info() {
        return {
            name: "Bundle size",
            group: METRIC_GROUPS.RANDOM
        };
    }

    schema() {
        return {
            "css": {
                "type": "float"
            },
            "js":
            {
                "type": "float"
            }
        }
    }

    /**
     * Decides whether the metric can be ran in current repository or not.
     *  @returns {boolean}
     */
    async verify() {
        if (_.isObject(this.getPackage()) && _.isObject(this.getPackage().scripts)
            && _.isString(this.getPackage().scripts.build)
            && this.getPackage().scripts.build.includes("webpack")) {
            if (!isInstalled(this.repoFolder)) {
                logger.error(`Must run 'npm install' on '${this.getRepoFolder()}' 1st`);
                return false;
            }
            return true;
        }
        return false;
    }

    /**
     * Used to execute the bundle size command and parse the results.
     *  @returns {Object}
     */
    async runWebpack() {

        let result;
        if (this.getPackage().name === "feedzai-ui-kit") {
            result = await executeCommand(this.getRepoFolder(),
                "npm run clean && npm run build:webpack -- --hide-modules --profile --json > bundlestats.json ");
        }
        else {
            result = await executeCommand(this.getRepoFolder(),
                "npm run build -- --hide-modules --profile --json > bundlestats.json");
        }

        if (!result) {
            logger.error("Error executing 'webpack'");
        }
        let parsedOutput;

        return await getFileFolder(`${this.getRepoFolder()}`, "bundlestats.json").then((bundlestats) => {
            if (!_.isString(bundlestats)) {
                logger.error(`Make sure that webpack is setup correctly on '${this.getRepoFolder()}' `);

                return null;
            }
            try {
                parsedOutput = JSON.parse(bundlestats);
            } catch (e) {
                // JSON format invalid, maybe 1st line incorrect?
                // deletes 1st line

                bundlestats = bundlestats.substring(bundlestats.indexOf("{"));

                if (bundlestats.search("Webpack Bundle Analyzer saved report to ") !== -1) {
                    const lines = bundlestats.split("\n");

                    lines.splice(0, 1);
                    bundlestats = lines.join("\n");
                }

                // tries to parse again
                try {
                    parsedOutput = JSON.parse(bundlestats);

                } catch (e2) {
                    logger.error("Imposible to parse Webpack output");
                }
            }
            if (_.isObject(parsedOutput)) {
                return parsedOutput;
            }

            return null;
        });
    }

    /**
     * Returns the calculated metric.
     *  @returns {Object}
     */
    async execute() {
        return await this.runWebpack().then((stats) => {
            if (!_.isObject(stats)) {
                return null;
            }
            let sizeCss = 0, sizeJs = 0;

            stats.assets.forEach((asset) => {
                if (asset.name.includes(".css")) {
                    sizeCss += asset.size;
                } else if (asset.name.includes(".js")) {
                    sizeJs += asset.size;
                }
            });
            return {
                result: {

                    // here I divide by 1024 to times in order to covert from bytes to MBytes
                    // After having the result in MB, it multiply by 100 and divide by 100 to have decimal palces in the output
                    css: Math.round((sizeCss / 1024 / 1024) * 100) / 100,
                    js: Math.round((sizeJs / 1024 / 1024) * 100) / 100
                }
            };
        });
    }
}

module.exports = BundleSizeMetric;
