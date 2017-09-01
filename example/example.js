import coords from '../lib';
import { Map, List } from 'immutable';

const logV = (...v) => console.log('\x1b[36m%s\x1b[0m', ...v, '\n');

const s = [
  'Hi, here are the coordinates: longitude 13.3666933, latitude 38.1190792',
  ' 38°06′56.37″N    13°21′40.54″E',
  'Москва находится на долготе 37°36,9336′ в.д. и широте 55°45,1332′ с.ш.',

  '38°06′56.37″N', '13°21′40.54″E'
];

const lat = 38.1190792;
const lng = 13.3666933;

module.exports = function () {

  console.log('\x1b[33m%s\x1b[0m', 'Walking cat library usage example\n');

  logV( `Create from string: "${s[0]}"\n`, coords(s[0]).toString() );

  logV( `Create from string: "${s[1]}"\n`, coords(s[1]).toString());

  logV( `Create from string: "${s[2]}"\n`, coords(s[2]).toString({point: ','}));

  logV( `Create from two strings string: "${s[3]}","${s[4]}"\n`, coords(s[3], s[4]).toString());

  logV( `Create from numbers "coords(${lat}, ${lng})" \n`, coords(lat, lng).toString());

  logV( `Create from array "coords([${lng}, ${lat}])" \n`, coords([lng, lat]).toString());

  logV( `Create from object "coords({lat: ${lat}, lng: ${lng}})" \n`, coords({lat, lng}).toString());

  logV( `Create from object "coords({latitude: ${lat}, longitude: ${lng}})" \n`, coords({latitude: lat, longitude: lng}).toString());

  logV( `Create from immutable "coords(Map({lat: ${lat}, lat: ${lng}}))" \n`, coords(Map({lat, lng})).toString());

  logV( `Create from immutable "coords(List([${lng}, ${lat}]))" \n`, coords(List([lng, lat])).toString());

  logV( `Convert to Array "coords(${lat}, ${lng}).toArray()" \n`, coords(lat, lng).toArray());
};
