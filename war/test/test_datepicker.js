(function() {
    require(["/js/util/CalendarData.js"], function (CalendarData) {

        /**
         * Test 기준 날짜는 2012/12/26
         * @type {Calender}
         */
        var calendar = new CalendarData(new Date("Wed Dec 26 2012 19:15:53"));

        module("CalendarData.js");

        test("CalendarData js loaded", function() {
            ok(CalendarData)
        });

        test("Calendar toArray", function() {

            var array = calendar.toArray();
            equal(typeof array, "object");


            ok(4 <= array.length || array.length <= 6, "4주~6주 사이");
            ok(array[0].length === 7, "1주는 7일");
            var startDate = array[0][0];
            equal(startDate.date, 25, "Start date is 11/25"); // 0123456
            equal(startDate.active, false, "11/25 is not active");
            equal(startDate.month + 1, 11, "11/25's month is 11");

            var testDate = array[1][0];
            equal(testDate.date, 2, "12/2");
            equal(testDate.active, true, "active");
            equal(testDate.month + 1, 12, "month is 12");

            var endDate = array[5][6];
            equal(endDate.date, 5, "End date is 1/5"); // 0123456
            equal(endDate.active, false, "not active");
            equal(endDate.month + 1, 1, "month is 1");
        });

        test("Previous Month", function() {
            //var calendar = new CalendarData(new Date("Wed Dec 26 2012 19:15:53"));
            var prev = calendar.previous().toArray();
            console.log(prev);

            equal(prev[0][4].month, 10, "11/1(0,4) 의 month");
            equal(prev[0][4].date, 1, "11/1(0,4) 의 date");

            equal(prev[4][5].month, 10, "11/30(4,5) 의 month");
            equal(prev[4][5].active, true, "11/30(4,5) 의 active");

            equal(prev[4][6].month, 11, "12/1(4,6) 의 month");
            equal(prev[4][6].date, 1, "12/1(4,6) 의 date");
            equal(prev[4][6].active, false, "12/1(4,6) 의 active");

        });

        test("Previous x 2", function() {
            var cal = new CalendarData(new Date("Wed Dec 26 2012 19:15:53"));
            var doublePrev = cal.previous().previous().toArray();

            equal(doublePrev[0][1].month, 9, "10/1(0,1) 의 month");
            equal(doublePrev[0][1].date, 1, "10/1(0,1) 의 date");
            equal(doublePrev[0][1].active, true, "10/1(0,1) 의 active");

        });

        test("Test Year, Month", function() {
            var cal = new CalendarData(new Date("Wed Dec 26 2012 19:15:53"));
            equal(cal.getYear(), 2012, "2012년");
            equal(cal.getMonth(), 12, "12월");
        });


    });
}());








