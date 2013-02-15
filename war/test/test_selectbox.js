(function() {
    require(["/js/util/SelectBox.js"], function (SelectBox) {

        var selectbox = null;
        var layer = "";
        var el = $('<div id="dateControl" class="f_l" style="display: inline;">'); // TODO move to setup
        $("body").append(el);

        var testVal = {i: 1, value: "9999.12.12"}
        var testCallback = false;

        module("SelectBox.js", function() {
            console.log("module select box....");
        });

        test("인스턴스 생성", function() {

                selectbox = new SelectBox({
                    target: "#dateControl",
                    selectedIndex: 0,
                    displayText: "2011.09.09 ~ 2011.09.09",
                    options: [
                        {label:"어제", value:11},
                        {label:"지난주 (월-일)", value:testVal.value},
                        {label:"지난달", value:33},
                        {label:"이번주 (월-일)", value:44},
                        {label:"이번달", value:55},
                        {label:"어제", value:66},
                        {label:"최근7일", value:77},
                        {label:"최근30일", value:88},
                        {label:"최근90일", value:99},
                        {label:"직접선택", value:10, fn:function () {
                            testCallback = true;
                        }}
                    ]
                });
                notEqual(selectbox, null);

        });

        test("옵션 선택 테스트", function() {
            var changed = null;
            selectbox.on("change", function(value) {
                changed = value;
            });
            selectbox.trigger("change", 123);
            equal(changed, 123, "change 이벤트 trigger 후 event  리스너가 실행됨")

            selectbox.changeValue(testVal.i);
            equal(selectbox.getValue(), testVal.value, "옵션 선택 후 값:" + testVal.value)
        });

        test("선택된 옵션을 코드로 바꾸기", function() {
            selectbox.changeValue(testVal.i);
            equal(selectbox.getValue(), testVal.value, "값 변경확인:" + selectbox.getValue());
        });

        test("선택된 옵션에 지정된 콜백을 실행하기", function() {
            selectbox.changeValue(9);
            equal(testCallback, true, "콜백이 실행되면 testCallback 값이 바뀐다.");
        });

    });
}());








