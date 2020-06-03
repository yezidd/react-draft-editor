const moment = require("moment");
const packageInfo = require("package")(module);

const now = moment().utcOffset(8);
const buildInfo = {
  timestamp: now.format("x"),
  datetime: now.format("YYMMDDHHmm"),
  environment: process.env.BUILD_ENV
};

buildInfo.release = `v${packageInfo.version}`;
module.exports = buildInfo;
