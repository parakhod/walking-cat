import {
  parseString,
  parseTwoStrings
} from './parseString';
import parseArray from './parseArray';
import parseObject from './parseObject';

import toString from './toString';
import toArray from './toArray';
import distanceFrom from './distanceFrom';

class WalkingCat {

  isWalkingCatCoords = true;
  version = '0.0.1';

  constructor(dataA, dataB) {  
    const parsedValue = 
      typeof dataA === 'string' ?
        typeof dataB === 'string' ? 
          parseTwoStrings(dataA, dataB) :
          parseString(dataA) :
      typeof dataA === 'number' && typeof dataB === 'number' ?
        parseArray([dataB, dataA]) :
      typeof dataA === 'object' ? 
        Array.isArray(dataA) ? 
          parseArray(dataA) :
        parseObject(dataA) :
      null;

    this.isValid = parsedValue != null;
    this.value = parsedValue || {
      lat: null,
      lng: null
    }
  }

  toString(options) {
    return toString(this.value, options);
  }

  toArray() {
    return toArray(this.value);
  }

  distanceFrom(point = {}, options) {
    return distanceFrom(this.value, point.value, options);
  }

}

export default WalkingCat;
