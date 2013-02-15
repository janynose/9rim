
(function() {
    require(["/js/util/Calendar.js"], function (Calendar) {

        var targetSelector = "#calWrap";
        function createTarget() {
            var newElement = document.createElement("div");
            newElement.id = "calWrap";
            document.body.appendChild(newElement);
        }

        var calendar = null;
        var startTime = "Mon Dec 03 2012 17:10:48 GMT+0900 (KST)";
        var endTime = "Wed Jan 02 2013 17:10:48 GMT+0900 (KST)";

        function initCal() {
            if (calendar) {
                calendar.dispose();
                $(targetSelector).remove();
            }
            createTarget();

            calendar = new Calendar({
                el: targetSelector,
                start: new Date(startTime),
                end: new Date(endTime)
            });
        }

        module("Calendar.js~");

        test("Calendar.js 다운로드, 초기화", function() {
            ok(Calendar, "Calendar 클래스");
            initCal();

            equal(typeof calendar.el, "object", "Calendar el");
            equal(calendar.el.id, "calWrap", "Calendar el 아이디");

            calendar.render();
        });

        test("이전달, 다음달 버튼 클릭", function() {
            ok(calendar, "Calendar 인스턴스 존재.");
            ok(calendar.prevL, "calendar.prevL method 존재");

            equal($(".tit_month strong")[0].innerHTML, "2012. 12", "prevL 실행 전");
            calendar.prevL();
            equal($(".tit_month strong")[0].innerHTML, "2012. 11", "prevL 실행 후");

            equal($(".tit_month strong")[1].innerHTML, "2013. 1", "nextR 실행 전");
            calendar.nextR();
            equal($(".tit_month strong")[1].innerHTML, "2013. 2", "nextR 실행 후");

            calendar.nextR();
            equal($(".tit_month strong")[1].innerHTML, "2013. 3", "nextR 두번 실행");
        });

        test("취소 버튼", function() {
            ok(calendar.cancel, "cancel 메소드 존재");

            calendar.cancel();
            equal($(targetSelector).width(), 0, "취소 누르면 레이어가 사라져서 width가 0 이어야 함");

            calendar.show(); // restore.
        });

        test("선택된 날짜", function() {
            initCal();

            calendar.render();
            console.log("startdate", calendar.startDate);

            ok(calendar.getSelected, "getSelected 메소드 존재");

            var sel = calendar.getSelected();
            console.log(sel);
            var start = sel[0];
            var end = sel[1];

            equal(start.getMonth(), 11, "startdate 12/3");
            equal(start.getDate(), 3, "12/3");
            equal(start.getFullYear(), 2012);

            equal(end.getMonth(), 0, "enddate 1/2");
            equal(end.getDate(), 2);
            equal(end.getFullYear(), 2013);
        });

        test("확인 버튼", function() {
            ok(calendar.confirm, "confirm 메소드 존재");
            var triggered = false;
            var selected = null;
            calendar.on("calendar_confirm", function(value) {
                triggered = true;
                selected = value;
                console.log(value[0], value[1]);
                //calendar.show();
            });

            calendar.confirm();
            ok(triggered, "확인버튼 이벤트 핸들러 실행");
            equal(selected[0].getDate(), new Date(startTime).getDate(), "confirm 결과 startDate");
            equal(selected[0].getMonth(), new Date(startTime).getMonth(), "confirm 결과 startDate");
            equal(selected[0].getYear(), new Date(startTime).getYear(), "confirm 결과 startDate");

            equal(selected[1].getDate(), new Date(endTime).getDate(), "confirm 결과 endDate");
            equal(selected[1].getMonth(), new Date(endTime).getMonth(), "confirm 결과 endDate");
            equal(selected[1].getYear(), new Date(endTime).getYear(), "confirm 결과 endDate");

        });

    });
}());








