'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.coords = undefined;

var _WalkingCat = require('./WalkingCat');

var _WalkingCat2 = _interopRequireDefault(_WalkingCat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var coords = function coords() {
  for (var _len = arguments.length, v = Array(_len), _key = 0; _key < _len; _key++) {
    v[_key] = arguments[_key];
  }

  return new (Function.prototype.bind.apply(_WalkingCat2.default, [null].concat(v)))();
};

exports.coords = coords;
exports.default = coords;