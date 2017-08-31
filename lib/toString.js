const valueToString = (
    value = 0, 
    isLat = false, 
    point, 
    decimals ) => {
  const deg = Math.floor(value);          
  const frac = Math.abs(value - deg);
  const min = Math.floor((frac * 60));
  const fSec = frac * 3600 - min * 60;
  const sec = fSec.toFixed(2);
  const positive = value >= 0;

  const side = isLat ? 
    positive ? 'N' : 'S' :
    positive ? 'E' : 'W';

  const dms = `${Math.abs(deg)}°${min}′${sec}″${side}`;
  return point ? dms.replace('.', point) : dms;
}

const coordToString = (
  value = {}, {
    point = '.', 
    separator = ', ',
    decimals = 2
  } = {}) => value.lat && value.lng ? 
      valueToString(value.lat, true, point, decimals) + 
      separator + 
      valueToString(value.lng, false, point, decimals) : 
    null

export default coordToString;
