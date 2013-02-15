(function() {
    var ClixView = null;
    var mock = {title: "제목 테스트", content: "내용 테스트"};


    require(["/js/view/ClixView.js"], function(ClixView) {
        module("ClixView.js", {
            setup: function() {
                ClixView = ClixView;
            }
        });

        test("Check instance", function() {
            ok(typeof ClixView, "object");
        });

        test("test Alert", function() {
            var alert = new ClixView.Alert().render(mock);

            var ctx = alert.$el;
            var nodeName = $(ctx).parent()[0].nodeName;
            equal(nodeName, "BODY", "should be appended to <body>");

            var title = $(".tit_layer", ctx).html();
            equal(title, mock.title, "test title value");

            var content = $(".layer_content", ctx).html();
            equal(content, mock.content, "test content value");

            var bliner = $("#blinder");
            equal(bliner.length, 1, "blinder should visible.");

            equal(typeof alert.close, "function", "exist close function");
            alert.close();
        });

        test("test Confirm", function() {
            var confirm = new ClixView.Confirm().render(mock);
            var ctx = confirm.$el;

            var title = $(".tit_layer", ctx).html();
            equal(title, mock.title, "test title value");

            var content = $(".layer_content", ctx).html();
            equal(content, mock.content, "text content value");

            var okBtn = $(".btn_confirm", ctx);
            ok(okBtn, "exist confirm button");

            equal(typeof confirm.close, "function", "exist close button");

            var confirmSelected = false;
            confirm.on("OK",function() {
                confirmSelected = true;
            });

            confirm.confirm();

            equal(confirmSelected, true, "on confirm(OK) triggered.");

            confirm.close();
        });

        test("test blinder false", function() {
            var mockWithoutBlinder = {title: "제목 테스트", content: "내용 테스트", blinder: false};

            var alert = new ClixView.Alert().render(mockWithoutBlinder);
            var bliner = $("#blinder");
            equal(bliner.length, 0, "blinder should not visible.");

            alert.close();
        });
    });

})();