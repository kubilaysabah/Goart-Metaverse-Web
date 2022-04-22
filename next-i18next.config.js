const path = require("path");

module.exports = {
    i18n: {
        defaultLocale: "tr",
        locales: ["tr", "en"],
        localePath: path.resolve("./public/locales"),
        reloadOnPrerender: true
    },
};
