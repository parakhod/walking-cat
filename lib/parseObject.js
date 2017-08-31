import parseArray from './parseArray';

const parseObject = (o = {}) => {

  const data = o.toJS ? o.toJS() : o;

  if (Array.isArray(data)) {
     return parseArray(data);
  }

  return {
  lat: 
    data.lat ||
    data.latitude ||
    null,

  lng:     
    data.lng ||
    data.long ||
    data.lon ||
    data.longitude ||
    null
}}

export default parseObject;
