#Walking Cat 

It is a simple JS library for parsing and converting geo coordinates

##Installation

__npm install -save walking-cat__

##Usage

`import coords from 'walking-cat';`


###Parsing
####Parse string
The library tries to detect the latitude and longitude order automatically.

`const catPosition1 = coords('Hi, here are the coordinates of your cat: longitude 13.3666933, latitude 38.1190792');`

`const catPosition2 = coords(' 38°06′56.37″N    13°21′40.54″E');`

`const catPosition3 = coords('Ваш котик у нас, на долготе 37°36,9336′ в.д. и широте 55°45,1332′ с.ш.');`


####Parse two strings
`const catPosition = coords('38°06′56.37″N', '13°21′40.54″E'); // order: latitude, longitude `

####Parse two numbers
`const catPosition = coords(38.1190792, 13.3666933); // order: latitude, longitude `

####Parse two numbers
`const catPosition = coords(38.1190792, 13.3666933); // order: latitude, longitude `

####Parse array
`const catPosition = coords([13.3666933, 38.1190792]); // order: [longitude, latitude] `

####Parse object
`const catPosition = coords({lat: 38.1190792, long: 13.3666933});`

`const catPosition = coords({latitude: 38.1190792, longitude: 13.3666933});`

####Parse Immutable Map or List
`const catPosition = coords( Map({lat: 38.1190792, long: 13.3666933}));`

`const catPosition = coords( List([13.3666933, 38.1190792])); // order: [longitude, latitude] `

###Converting
####To latitude and longitude
`const { lat, lng } = catPosition1;`

`console.log( lat, lng ); // output: 38.1190792, 13.3666933`

####To string
`console.log( catPosition2.toString() ); // output: "38°6′56.37″N, 13°21′40.54″E"`

####To string with comma instead of the point
`console.log( catPosition3.toString({point: ','}) ); // output: "55°45′7,99″N, 37°36′56,02″E"`

####To array
`console.log( catPosition1.toArray() ); // output: [ 13.3666933, 38.1190792 ]`
 