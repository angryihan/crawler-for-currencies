var fs = require('fs');
var path = require('path');
var shell = require('electron').shell;
var dirPath = path.join(__dirname, '../../../currencies-data/');

module.exports = {
    generateFile: function(buffer, pjname, cb) {
        var self = this;
        var filePath = path.join(dirPath, pjname + '.xlsx');
        fs.exists(dirPath, function(exists) {
            if (!exists) {
                fs.mkdir(dirPath, function(err) {
                    if (err) {
                        console.log('创建文件夹出错！');
                    } else {
                        self.writeFile(buffer, filePath, cb);
                    }
                });
            } else {
                self.writeFile(buffer, filePath, cb);
            }
        });
    },
    writeFile: function(buffer, filePath, cb) {
        fs.writeFileSync(filePath, buffer, 'binary');
        // 打开文件
        shell.openExternal(filePath);
        cb(null);
    },
    openDir: function() {
        fs.exists(dirPath, function(exists) {
            if (!exists) {
                fs.mkdir(dirPath, function(err) {
                    if (err) {
                        console.log('创建文件夹出错！');
                    } else {
                        shell.openExternal(dirPath);
                    }
                });
            } else {
                shell.openExternal(dirPath);
            }
        });
    }
}
