
{ isType, validateTypes, Kind, Maybe } = require "type-utils"

sync = require "sync"

optionTypes =
  keys: Kind(Object)
  values: Kind(Object)
  ignored: Maybe(Array)
  needsValue: Maybe(Boolean)

module.exports = (options) ->

  validateTypes options, optionTypes

  { keys, values, ignored, needsValue } = options

  needsValue ?= no

  if isType ignored, Array
    ignored = sync.reduce ignored, {}, (results, key) ->
      results[key] = yes
      results

  unless isType keys, Array
    keys = Object.keys keys

  if isType ignored, Object
    keys = sync.filter keys, (key) -> not ignored[key]

  unless isType values, Array
    values = sync.reduce keys, [], (results, key) ->
      results.push values[key]
      results

  sync.reduce keys, {}, (obj, key, i) ->
    value = values[i]
    obj[key] = value unless needsValue and value is undefined
    obj
