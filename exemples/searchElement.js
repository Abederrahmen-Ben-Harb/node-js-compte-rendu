exports.searchElement = function (data, callback) {
for (var i = 0; i < data.tableau.length; i++)
if (data.tableau[i] == data.filtre)
return callback(null, i);
return callback('Element ' + data.filtre + ' non trouvé dans le tableau');
};