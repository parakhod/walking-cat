const measureDistanceInMeters = (coord1 = {}, coord2 = {}) => {
  if (!coord1.lat || !coord1.lng || !coord2.lat || !coord2.lng) return null;
  
  const {
    cos,
    asin,
    sqrt
  } = Math;
  const d2r = 0.017453292519943295; // 1 degree in radians

  //coordinates in radians
  const lat1 = coord1.lat * d2r;
  const lat2 = coord2.lat * d2r;
  const lng1 = coord1.lng * d2r;
  const lng2 = coord2.lng * d2r;

  return 12740200 * asin(sqrt(0.5 - cos(lat2 - lat1)/2 + cos(lat1) * cos(lat2) * (1 - cos(lng2 - lng1))/2));
}

const measureDistance = (coord1, coord2, { units, precision, point } = {}) => {
  const distanceInMeters = measureDistanceInMeters(coord1, coord2);
  if (distanceInMeters == null) return null;
  
  let distanceInUnits = distanceInMeters;

  if (typeof units === 'string') {
    switch( units.trim().toLowerCase() ) {
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

  const numberResult = typeof precision === 'number' ? 
    precision === 0 ? Math.round(distanceInUnits) : distanceInUnits.toFixed(precision) :
    distanceInUnits;

  return typeof point === 'string' ? `${numberResult}`.replace('.', point) : numberResult;
}

export default measureDistance;
