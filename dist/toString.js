'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var valueToString = function valueToString() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var isLat = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var point = arguments[2];
  var decimals = arguments[3];

  var deg = Math.floor(value);
  var frac = Math.abs(value - deg);
  var min = Math.floor(frac * 60);
  var fSec = frac * 3600 - min * 60;
  var sec = fSec.toFixed(2);
  var positive = value >= 0;

  var side = isLat ? positive ? 'N' : 'S' : positive ? 'E' : 'W';

  var dms = Math.abs(deg) + '\xB0' + min + '\u2032' + sec + '\u2033' + side;
  return point ? dms.replace('.', point) : dms;
};

var coordToString = function coordToString() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$point = _ref.point,
      point = _ref$point === undefined ? '.' : _ref$point,
      _ref$separator = _ref.separator,
      separator = _ref$separator === undefined ? ', ' : _ref$separator,
      _ref$decimals = _ref.decimals,
      decimals = _ref$decimals === undefined ? 2 : _ref$decimals;

  return value.lat && value.lng ? valueToString(value.lat, true, point, decimals) + separator + valueToString(value.lng, false, point, decimals) : null;
};

exports.default = coordToString;