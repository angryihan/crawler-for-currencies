var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');
var crawler = require('./crawler.js');
var dateHelper = require('./dateHelper.js');
var async = require('async');

var generateBtn = document.querySelector("#generate");
var startInput = document.querySelector("#startDate");
var endInput = document.querySelector("#endDate");
var pjSelect = document.querySelector("#pjname");

generateBtn.addEventListener("click", generateHandler);

var isGenerating = false;

function generateHandler() {
    if(!isGenerating){
        disableBtn();
        async.series({
            getCurrencies: function (cb) {
                crawler.getCurrencies(dateHelper.getDateArray(startInput.value, endDate.value),pjSelect.value,cb);
            },
            resetBtn: function() {
                enableBtn();
            }
        }, function(err){
            console.log(err);
        });
    }

}

function enableBtn() {
    isGenerating = false;
    generateBtn.text="一键获取";
}

function disableBtn() {
    isGenerating = true;
    generateBtn.text="获取中，请稍候……";
}
