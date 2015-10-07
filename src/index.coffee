
require "lotus-require"

{ isType, validateTypes, Kind, Void } = require "type-utils"
{ sync } = require "io"

module.exports = (options) ->

  validateTypes options, optionTypes

  { keys, values, needsValue } = options

  needsValue ?= no

  unless isType keys, Array
    keys = Object.keys keys

  unless isType values, Array
    values = sync.reduce keys, [], (results, key) ->
      results.push values[key]
      results

  sync.reduce keys, {}, (obj, key, i) ->
    value = values[i]
    obj[key] = value unless needsValue and value is undefined
    obj

optionTypes =
  keys: Kind(Object)
  values: Kind(Object)
  needsValue: [ Boolean, Void ]
