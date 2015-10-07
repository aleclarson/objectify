var Kind, Void, isType, optionTypes, ref, sync, validateTypes;

require("lotus-require");

ref = require("type-utils"), isType = ref.isType, validateTypes = ref.validateTypes, Kind = ref.Kind, Void = ref.Void;

sync = require("io").sync;

module.exports = function(options) {
  var keys, needsValue, values;
  validateTypes(options, optionTypes);
  keys = options.keys, values = options.values, needsValue = options.needsValue;
  if (needsValue == null) {
    needsValue = false;
  }
  if (!isType(keys, Array)) {
    keys = Object.keys(keys);
  }
  if (!isType(values, Array)) {
    values = sync.reduce(keys, [], function(results, key) {
      results.push(values[key]);
      return results;
    });
  }
  return sync.reduce(keys, {}, function(obj, key, i) {
    var value;
    value = values[i];
    if (!(needsValue && value === void 0)) {
      obj[key] = value;
    }
    return obj;
  });
};

optionTypes = {
  keys: Kind(Object),
  values: Kind(Object),
  needsValue: [Boolean, Void]
};

//# sourceMappingURL=../../map/src/index.map
