const coordToArray = ( {lat, lng} = {} ) => 
  lat && lng ? [lng, lat] : []

export default coordToArray;
