var async = require('async');
var crawler = require('./crawler.js');
var dateHelper = require('./dateHelper.js');
var fileHelper = require('./fileHelper.js');

var generateBtn = document.querySelector("#generate");
var openDirBtn = document.querySelector("#openDir");
var startInput = document.querySelector("#startDate");
var endInput = document.querySelector("#endDate");
var pjSelect = document.querySelector("#pjname");
var inputList = document.querySelectorAll(".JS-input");
var isGenerating = false;

var currenciedCrawler = {
    init: function() {
        startInput.value = dateHelper.getStartDayString();
        endInput.value = dateHelper.getEndDayString();
        this.bindEvents();
    },
    bindEvents: function() {
        var self = this;
        generateBtn.addEventListener("click", self.generateHandler);
        openDirBtn.addEventListener("click", self.openDirHandler);
        inputList.forEach(function(input) {
            input.addEventListener("keydown", function(event) {
                if (event.keyCode == 13) {
                    self.generateHandler();
                }
            });
        });
    },
    generateHandler: function() {
        currenciedCrawler.blurBtn();
        if (!isGenerating) {
            currenciedCrawler.disableBtn();
            async.series({
                getCurrencies: function(cb) {
                    crawler.getCurrencies(dateHelper.getDateArray(startInput.value, endDate.value), pjSelect.value, cb);
                },
                resetBtn: function() {
                    currenciedCrawler.enableBtn();
                }
            }, function(err) {
                console.log(err);
            });
        }
    },
    openDirHandler: function() {
        currenciedCrawler.blurBtn();
        fileHelper.openDir();
    },
    enableBtn: function() {
        isGenerating = false;
        generateBtn.value = "一键获取";
    },
    disableBtn: function() {
        isGenerating = true;
        generateBtn.value = "获取中，请稍候……";
    },
    blurBtn: function() {
        generateBtn.blur();
        openDirBtn.blur();
    }
}

currenciedCrawler.init();
