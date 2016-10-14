var request = require('request');
var cheerio = require('cheerio');
var async = require('async');
var excelHelper = require('./excelHelper');

module.exports = {
    getCurrencies: function(dateArray,pjname,cb) {
        var currenciesArray = [];
        var typeLength = 0;
        var option = {
            url: 'http://srh.bankofchina.com/search/whpj/search.jsp',
            form: {
                erectDate: '',
                nothing: '',
                pjname: pjname
            }
        };
        async.eachSeries(dateArray, crawlCurrencies, function(err) {
            if (err) {
                console.log(err);
            } else {
                excelHelper.generateXlsx(currenciesArray,pjname,cb);
            }
        });
        function crawlCurrencies(date,callback) {
            var data = [];
            var title = [];
            option.form.erectDate = date;
            option.form.nothing = date;
            request.post(option, function(error, res, body) {
                if (!error && res.statusCode == 200) {
                    var $ = cheerio.load(body, {
                        decodeEntities: false
                    });
                    typeLength = typeLength ? typeLength : $('.BOC_main table tr:nth-child(1) th').length;
                    // 首次获取标题
                    if(!currenciesArray.length){
                        for (var i = 1; i <= typeLength; i++) {
                            title[i - 1] = $('.BOC_main table tr:nth-child(1) th:nth-child(' + i + ')').text();
                        }
                        currenciesArray.push(title);
                    }
                    for (var i = 1; i <= typeLength; i++) {
                        data[i - 1] = $('.BOC_main table tr:nth-child(2) td:nth-child(' + i + ')').text();
                    }
                    currenciesArray.push(data);
                    callback(null);
                }
            });
        }
    }
}
