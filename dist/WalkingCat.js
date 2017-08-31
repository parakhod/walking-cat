'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _parseString = require('./parseString');

var _parseArray = require('./parseArray');

var _parseArray2 = _interopRequireDefault(_parseArray);

var _parseObject = require('./parseObject');

var _parseObject2 = _interopRequireDefault(_parseObject);

var _toString2 = require('./toString');

var _toString3 = _interopRequireDefault(_toString2);

var _toArray2 = require('./toArray');

var _toArray3 = _interopRequireDefault(_toArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WalkingCat = function () {
  function WalkingCat(dataA, dataB) {
    _classCallCheck(this, WalkingCat);

    this.isWalkingCatCoords = true;
    this.version = '0.0.1';

    var parsedValue = typeof dataA === 'string' ? typeof dataB === 'string' ? (0, _parseString.parseTwoStrings)(dataA, dataB) : (0, _parseString.parseString)(dataA) : typeof dataA === 'number' && typeof dataB === 'number' ? (0, _parseArray2.default)([dataB, dataA]) : (typeof dataA === 'undefined' ? 'undefined' : _typeof(dataA)) === 'object' ? Array.isArray(dataA) ? (0, _parseArray2.default)(dataA) : (0, _parseObject2.default)(dataA) : null;

    this.isValid = parsedValue != null;
    this.value = parsedValue || {
      lat: null,
      lng: null
    };
  }

  _createClass(WalkingCat, [{
    key: 'toString',
    value: function toString(options) {
      return (0, _toString3.default)(this.value, options);
    }
  }, {
    key: 'toArray',
    value: function toArray() {
      return (0, _toArray3.default)(this.value);
    }
  }]);

  return WalkingCat;
}();

exports.default = WalkingCat;