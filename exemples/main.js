var {searchElement} = require('./searchElement')
var {data} = require('./data')
searchElement(data, function (err, result) {
if (err)
console.error("erreur :" + err)
else
console.log(data.filtre + " existe dans la position " + result)
});