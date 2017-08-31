const cleanString = s => s
  .replace(/^[^-\d]+|[^-\d"'″′°NEWS]+$/g, '') // trim to the digits
  .replace(/\s{2,}/g, ' '); // remove duplicating spaces    

const parseDMS = v => {
  const [
    ,
    sign,
    deg,
    min = 0,
    sec = 0,
    hem
  ] = v.match(/(-)?(\d+(?:\.\d+)?)[°º:d\s]?\s?(?:(\d+(?:\.\d+)?)['’‘′:]\s?(?:(\d{1,2}(?:\.\d+)?)(?:"|″|’’|'')?)?)?\s?([NEWS])?/);

  const isPositive = sign !== '-' && !(hem === 'S' || hem === 'W');
  const positiveIfLatitude = 
    hem === 'S' || hem === 'N' ? 1 :
    hem === 'E' || hem === 'W' ? -1 :
    0;

  const value = (parseFloat(deg) + parseFloat(min) / 60 + parseFloat(sec) / 3600) * (isPositive ? 1 : -1);

  return {
    value,
    positiveIfLatitude
  };
}

const parseString = (
  initialString = '', 
  {
    separator = null
  } = {}) => {

  const string = initialString.trim().toUpperCase();

  if (separator == null) {
    const str = cleanString(string);

    const symStats = {};
    for (let i = 0; i < str.length; i++) {
      const sym = str[i];
      if (isNaN(sym) || sym === ' ') {
        symStats[sym] = (symStats[sym] || 0) + 1;
      }
    }

    const potentialSeparators = Object.keys(symStats)
      .reduce((p, v) => symStats[v] === 1 ? [...p, v] : p, []);

    if (potentialSeparators.length === 0) {
      return null;
    }

    const bestSeparators = '| ;,';

    separator = potentialSeparators.reduce((p, v) => {
      const index = bestSeparators.indexOf(v);
      return index > p.weight ? {
        sep: v, 
        weight: index
      } : p
    }, {
      sep: potentialSeparators[0], 
      weight: -1
    }).sep;
  }

  const parts = string.split(separator);

  const validIndices = parts.map((v, index) => ({
      value: cleanString(v),
      index 
    }))
  .filter(v => v.value !== '')
  .map(v => v.index);

  if (validIndices.length !== 2) {
    return null;
  }

  const validParts = validIndices.map(i => parts[i]);

  return parseTwoStrings(...validParts);  
}

const parseTwoStrings = (...coords) => {

  if (!Array.isArray(coords)) {
    return null;
  }

  const isPlain = v => 
    v.indexOf('°') === -1 &&
    v.indexOf('"') === -1 &&
    v.indexOf('\'') === -1;

  const extractedCoords = coords.map(v => cleanString(v)
    .replace(',', '.')
    .replace('″', '"')
    .replace('′', '\''));

  const parsedCoords = extractedCoords.map(v => isPlain(v) ? { 
    value: parseFloat(v),
    positiveIfLatitude: 0 
  } : parseDMS(v));

  if (parsedCoords[0].positiveIfLatitude === parsedCoords[1].positiveIfLatitude) {
    const has = (s, sub) => s.indexOf(sub) !== -1;
    const checkIsLat = s => 
      has(s, 'LAT') ||
      has(s, 'ШИР') || 
      has(s, 'С.Ш') ||
      has(s, 'СШ')  ||
      has(s, 'Ю.Ш') ||
      has(s, 'ЮШ')  || 
      has(s, '緯')  || 
      has(s, '緯') ? 1 : 0;

    const checkIsLong = s => 
      has(s, 'LON') ||
      has(s, 'ДОЛГ')|| 
      has(s, 'В.Д') ||
      has(s, 'ВД')  ||
      has(s, 'З.Д') ||
      has(s, 'ЗД')  || 
      has(s, '經')  ||
      has(s, '经') ? 1 : 0;

    for (let i = 0; i < 2; i++) {
      parsedCoords[i].positiveIfLatitude += checkIsLat(coords[i]);    
    }
  }

  const latFirst = parsedCoords[0].positiveIfLatitude >= parsedCoords[1].positiveIfLatitude;

  return  {
    lat: parsedCoords[latFirst ? 0 : 1].value,
    lng: parsedCoords[latFirst ? 1 : 0].value
  }
}

export {
  parseString,
  parseTwoStrings
};

export default parseString;

