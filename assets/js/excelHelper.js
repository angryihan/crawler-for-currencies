var xlsx = require('node-xlsx');
var fileHelper = require('./fileHelper.js');

module.exports = {
    generateXlsx: function(array, pjname,cb) {
        var buffer = xlsx.build([{
            name: "currencies",
            data: array
        }]);
        fileHelper.generateFile(buffer,pjname,cb);
    }
}
