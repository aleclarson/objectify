var Kind, Maybe, isType, optionTypes, ref, sync, validateTypes;

ref = require("type-utils"), isType = ref.isType, validateTypes = ref.validateTypes, Kind = ref.Kind, Maybe = ref.Maybe;

sync = require("sync");

optionTypes = {
  keys: Kind(Object),
  values: Kind(Object),
  ignored: Maybe(Array),
  needsValue: Maybe(Boolean)
};

module.exports = function(options) {
  var ignored, keys, needsValue, values;
  validateTypes(options, optionTypes);
  keys = options.keys, values = options.values, ignored = options.ignored, needsValue = options.needsValue;
  if (needsValue == null) {
    needsValue = false;
  }
  if (isType(ignored, Array)) {
    ignored = sync.reduce(ignored, {}, function(results, key) {
      results[key] = true;
      return results;
    });
  }
  if (!isType(keys, Array)) {
    keys = Object.keys(keys);
  }
  if (isType(ignored, Object)) {
    keys = sync.filter(keys, function(key) {
      return !ignored[key];
    });
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

//# sourceMappingURL=../../map/src/objectify.map
