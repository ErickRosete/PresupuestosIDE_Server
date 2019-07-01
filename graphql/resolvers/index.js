const conceptResolver = require("./concept");
const materialResolver = require("./material");
const auxMaterialResolver = require("./aux-material");
const materialGroupResolver = require("./material-group");
const auxMaterialGroupResolver = require("./aux-material-group");

const rootResolver = {
  ...conceptResolver,
  ...materialResolver,
  ...auxMaterialResolver,
  ...materialGroupResolver,
  ...auxMaterialGroupResolver
};

module.exports = rootResolver;
