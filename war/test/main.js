(function() {
    var files = [
        "sample.js",
        "test_clixview.js",
        "test_selectbox.js",
        "test_datepicker.js",
        "test_calendar.js",
        ""
    ];

    for (var i = 0; i < files.length; i++) {
        var src = files[i];
        document.write('<script type="text/javascript" src="' + src +'"></scrip' + 't>');
    }

})();