var async = require('async');
var crawler = require('./crawler.js');
var dateHelper = require('./dateHelper.js');
var fileHelper = require('./fileHelper.js');

var generateBtn = document.querySelector("#generate");
var openDirBtn = document.querySelector("#openDir");
var startInput = document.querySelector("#startDate");
var endInput = document.querySelector("#endDate");
var pjSelect = document.querySelector("#pjname");
var isGenerating = false;

generateBtn.addEventListener("click", generateHandler);
openDirBtn.addEventListener("click", openDirHandler);
endInput.addEventListener("keydown", function(event) {
    if (event.keyCode == 13) {
        generateBtn.click();
    }
});

function generateHandler() {
    if (!isGenerating) {
        disableBtn();
        async.series({
            getCurrencies: function(cb) {
                crawler.getCurrencies(dateHelper.getDateArray(startInput.value, endDate.value), pjSelect.value, cb);
            },
            resetBtn: function() {
                enableBtn();
            }
        }, function(err) {
            console.log(err);
        });
    }
}

function openDirHandler() {
    fileHelper.openDir();
}

function enableBtn() {
    isGenerating = false;
    generateBtn.text = "一键获取";
}

function disableBtn() {
    isGenerating = true;
    generateBtn.text = "获取中，请稍候……";
}
