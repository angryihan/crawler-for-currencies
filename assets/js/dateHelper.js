module.exports = {
    getDateArray: function(startDate, endDate) {
        var dateArray = [];
        var start = new Date(startDate);
        var end = new Date(endDate);
        var temp = new Date(startDate);
        while (temp <= end) {
            dateArray.push(this.getDateString(temp));
            temp = new Date(temp.getFullYear(), temp.getMonth() + 1, temp.getDate());
        }
        return dateArray;
    },
    getDateString: function(date) {
        var m = this.leftPadding(date.getMonth() + 1);
        var d = this.leftPadding(date.getDate());
        return date.getFullYear() + '-' + m + '-' + d;
    },
    leftPadding: function(num) {
        return ('0' + num).slice(-2);
    }
}
