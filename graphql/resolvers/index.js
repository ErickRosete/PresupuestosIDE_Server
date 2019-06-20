const conceptResolver = require("./concept");
const materialResolver = require("./material");
const materialGroupResolver = require("./material-group");

const rootResolver = {
  ...conceptResolver,
  ...materialResolver,
  ...materialGroupResolver
};

module.exports = rootResolver;
