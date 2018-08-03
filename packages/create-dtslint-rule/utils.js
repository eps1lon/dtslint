const { Utils } = require('tslint');

module.exports = { camelize, isKebabCase };

function camelize(name) {
  return Utils.camelize(name);
}

function isKebabCase(name) {
  if (typeof name !== 'string') {
    return false;
  }

  return Utils.isLowerCase(name) && !name.includes('_');
}
