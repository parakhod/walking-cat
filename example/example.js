import coords from '../lib';
import { Map, List } from 'immutable';

const logV = (...v) => console.log('\x1b[36m%s\x1b[0m', ...v, '\n');

const s = [
  'Hi, here are the coordinates: longitude 13.3666933, latitude 38.1190792',
  ' 38°06′56.37″N    13°21′40.54″E',
  'Москва находится на долготе 37°36,9336′ в.д. и широте 55°45,1332′ с.ш.',

  '38°06′56.37″N', '13°21′40.54″E'
];

const lat = 38.1190792; // Palermo
const lng = 13.3666933;

const lat2 = 37.308889; // Agrigento
const lng2 = 13.5836336;

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

  const c1 = coords(lat, lng);
  const c2 = coords(lat2, lng2);

  logV( `Measure distance: "coords(${lat}, ${lng}).distanceFrom(coords(${lat2}, ${lng2}), [ options ])"`);
  logV( `Options: null (value in meters): `, c1.distanceFrom(c2));
  logV( `Options: { precision: 1, units: 'km'}: `, c1.distanceFrom(c2, { precision: 1, units: 'km'}));
  logV( `Options: { precision: 2, units: 'mi'}: `, c1.distanceFrom(c2, { precision: 2, units: 'mi'}));
  logV( `Options: { precision: 0, units: 'ft'}: `, c1.distanceFrom(c2, { precision: 0, units: 'ft'}));
  logV( `Options: { precision: 2, units: 'm', point: ','}: `, c1.distanceFrom(c2,  { precision: 2, units: 'm', point: ','}));
};
