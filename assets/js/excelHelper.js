var fs = require('fs');
var xlsx = require('node-xlsx');
var path = require('path');
var electron = require('electron');
var shell = electron.shell;

module.exports = {
    generateXlsx: function(array, pjname,cb) {
        var buffer = xlsx.build([{
            name: "currencies",
            data: array
        }]);
        var filePath = path.join(__dirname, '../../../data/' + pjname + '.xlsx');
        var dirPath = path.join(__dirname, '../../../data/');

        fs.exists(dirPath, function(exists) {
            if (!exists) {
                fs.mkdir(dirPath, function(err) {
                    if (err) {
                        console.log('创建文件夹出错！');
                    } else {
                        generateFile();
                    }
                });
            } else {
                generateFile();
            }
        });

        function generateFile(){
            fs.writeFileSync(filePath, buffer, 'binary');
            // 打开文件
            shell.openExternal(filePath);
            cb(null);
        }
    }
}
