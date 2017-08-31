"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var parseArray = function parseArray(a) {
  if (!Array.isArray(a)) {
    return null;
  }
  if (a.length < 2) {
    return null;
  }
  return {
    lat: a[1],
    lng: a[0]
  };
};

exports.default = parseArray;