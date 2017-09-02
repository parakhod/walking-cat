'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var measureDistanceInMeters = function measureDistanceInMeters() {
  var coord1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var coord2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!coord1.lat || !coord1.lng || !coord2.lat || !coord2.lng) return null;

  var cos = Math.cos,
      asin = Math.asin,
      sqrt = Math.sqrt;

  var d2r = 0.017453292519943295; // 1 degree in radians

  //coordinates in radians
  var lat1 = coord1.lat * d2r;
  var lat2 = coord2.lat * d2r;
  var lng1 = coord1.lng * d2r;
  var lng2 = coord2.lng * d2r;

  return 12740200 * asin(sqrt(0.5 - cos(lat2 - lat1) / 2 + cos(lat1) * cos(lat2) * (1 - cos(lng2 - lng1)) / 2));
};

var measureDistance = function measureDistance(coord1, coord2) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      units = _ref.units,
      precision = _ref.precision,
      point = _ref.point;

  var distanceInMeters = measureDistanceInMeters(coord1, coord2);
  if (distanceInMeters == null) return null;

  var distanceInUnits = distanceInMeters;

  if (typeof units === 'string') {
    switch (units.trim().toLowerCase()) {
      case 'km':
        distanceInUnits = distanceInMeters / 1000;
        break;
      case 'mi':
        distanceInUnits = distanceInMeters / 1609.344;
        break;
      case 'nm':
        distanceInUnits = distanceInMeters / 1853.184;
        break;
      case 'nm':
        distanceInUnits = distanceInMeters / 1853.184;
        break;
      case 'yd':
        distanceInUnits = distanceInMeters / 1.093613;
        break;
      case 'ft':
        distanceInUnits = distanceInMeters / 0.3048;
        break;
    }
  }

  var numberResult = typeof precision === 'number' ? precision === 0 ? Math.round(distanceInUnits) : distanceInUnits.toFixed(precision) : distanceInUnits;

  return typeof point === 'string' ? ('' + numberResult).replace('.', point) : numberResult;
};

exports.default = measureDistance;