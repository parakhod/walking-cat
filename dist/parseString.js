'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var cleanString = function cleanString(s) {
  return s.replace(/^[^-\d]+|[^-\d"'″′°NEWS]+$/g, '') // trim to the digits
  .replace(/\s{2,}/g, ' ');
}; // remove duplicating spaces    

var parseDMS = function parseDMS(v) {
  var _v$match = v.match(/(-)?(\d+(?:\.\d+)?)[°º:d\s]?\s?(?:(\d+(?:\.\d+)?)['’‘′:]\s?(?:(\d{1,2}(?:\.\d+)?)(?:"|″|’’|'')?)?)?\s?([NEWS])?/),
      _v$match2 = _slicedToArray(_v$match, 6),
      sign = _v$match2[1],
      deg = _v$match2[2],
      _v$match2$ = _v$match2[3],
      min = _v$match2$ === undefined ? 0 : _v$match2$,
      _v$match2$2 = _v$match2[4],
      sec = _v$match2$2 === undefined ? 0 : _v$match2$2,
      hem = _v$match2[5];

  var isPositive = sign !== '-' && !(hem === 'S' || hem === 'W');
  var positiveIfLatitude = hem === 'S' || hem === 'N' ? 1 : hem === 'E' || hem === 'W' ? -1 : 0;

  var value = (parseFloat(deg) + parseFloat(min) / 60 + parseFloat(sec) / 3600) * (isPositive ? 1 : -1);

  return {
    value: value,
    positiveIfLatitude: positiveIfLatitude
  };
};

var parseString = function parseString() {
  var initialString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$separator = _ref.separator,
      separator = _ref$separator === undefined ? null : _ref$separator;

  var string = initialString.trim().toUpperCase();

  if (separator == null) {
    var str = cleanString(string);

    var symStats = {};
    for (var i = 0; i < str.length; i++) {
      var sym = str[i];
      if (isNaN(sym) || sym === ' ') {
        symStats[sym] = (symStats[sym] || 0) + 1;
      }
    }

    var potentialSeparators = Object.keys(symStats).reduce(function (p, v) {
      return symStats[v] === 1 ? [].concat(_toConsumableArray(p), [v]) : p;
    }, []);

    if (potentialSeparators.length === 0) {
      return null;
    }

    var bestSeparators = '| ;,';

    separator = potentialSeparators.reduce(function (p, v) {
      var index = bestSeparators.indexOf(v);
      return index > p.weight ? {
        sep: v,
        weight: index
      } : p;
    }, {
      sep: potentialSeparators[0],
      weight: -1
    }).sep;
  }

  var parts = string.split(separator);

  var validIndices = parts.map(function (v, index) {
    return {
      value: cleanString(v),
      index: index
    };
  }).filter(function (v) {
    return v.value !== '';
  }).map(function (v) {
    return v.index;
  });

  if (validIndices.length !== 2) {
    return null;
  }

  var validParts = validIndices.map(function (i) {
    return parts[i];
  });

  return parseTwoStrings.apply(undefined, _toConsumableArray(validParts));
};

var parseTwoStrings = function parseTwoStrings() {
  for (var _len = arguments.length, coords = Array(_len), _key = 0; _key < _len; _key++) {
    coords[_key] = arguments[_key];
  }

  if (!Array.isArray(coords)) {
    return null;
  }

  var isPlain = function isPlain(v) {
    return v.indexOf('°') === -1 && v.indexOf('"') === -1 && v.indexOf('\'') === -1;
  };

  var extractedCoords = coords.map(function (v) {
    return cleanString(v).replace(',', '.').replace('″', '"').replace('′', '\'');
  });

  var parsedCoords = extractedCoords.map(function (v) {
    return isPlain(v) ? {
      value: parseFloat(v),
      positiveIfLatitude: 0
    } : parseDMS(v);
  });

  if (parsedCoords[0].positiveIfLatitude === parsedCoords[1].positiveIfLatitude) {
    var has = function has(s, sub) {
      return s.indexOf(sub) !== -1;
    };
    var checkIsLat = function checkIsLat(s) {
      return has(s, 'LAT') || has(s, 'ШИР') || has(s, 'С.Ш') || has(s, 'СШ') || has(s, 'Ю.Ш') || has(s, 'ЮШ') || has(s, '緯') || has(s, '緯') ? 1 : 0;
    };

    var checkIsLong = function checkIsLong(s) {
      return has(s, 'LON') || has(s, 'ДОЛГ') || has(s, 'В.Д') || has(s, 'ВД') || has(s, 'З.Д') || has(s, 'ЗД') || has(s, '經') || has(s, '经') ? 1 : 0;
    };

    for (var i = 0; i < 2; i++) {
      parsedCoords[i].positiveIfLatitude += checkIsLat(coords[i]);
    }
  }

  var latFirst = parsedCoords[0].positiveIfLatitude >= parsedCoords[1].positiveIfLatitude;

  return {
    lat: parsedCoords[latFirst ? 0 : 1].value,
    lng: parsedCoords[latFirst ? 1 : 0].value
  };
};

exports.parseString = parseString;
exports.parseTwoStrings = parseTwoStrings;
exports.default = parseString;