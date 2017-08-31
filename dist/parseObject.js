'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _parseArray = require('./parseArray');

var _parseArray2 = _interopRequireDefault(_parseArray);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parseObject = function parseObject() {
  var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


  var data = o.toJS ? o.toJS() : o;

  if (Array.isArray(data)) {
    return (0, _parseArray2.default)(data);
  }

  return {
    lat: data.lat || data.latitude || null,

    lng: data.lng || data.long || data.lon || data.longitude || null
  };
};

exports.default = parseObject;