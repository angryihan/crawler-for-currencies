var today = new Date();

function getDateString(date) {
    var m = leftPadding(date.getMonth() + 1);
    var d = leftPadding(date.getDate());
    return date.getFullYear() + '-' + m + '-' + d;
}

function leftPadding(num) {
    return ('0' + num).slice(-2);
}

module.exports = {
    getDateArray: function(startDate, endDate) {
        var dateArray = [];
        var start = new Date(startDate);
        var end = new Date(endDate);
        var temp = new Date(startDate);
        while (temp <= end) {
            dateArray.push(getDateString(temp));
            temp = new Date(temp.getFullYear(), temp.getMonth() + 1, temp.getDate());
        }
        return dateArray;
    },
    getStartDayString: function() {
        return getDateString(new Date(today.getFullYear(), 0, 1));
    },
    getEndDayString: function() {
        return getDateString(today);
    }
}
