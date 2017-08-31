"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var coordToArray = function coordToArray() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      lat = _ref.lat,
      lng = _ref.lng;

  return lat && lng ? [lng, lat] : [];
};

exports.default = coordToArray;