(function() {
    function $A(arg) {
        var arr = [];
        for (var i = 0; i < arg.length; i++) {
            arr.push(arg[i]);
        }
        return arr;
    };

    Function.prototype.bindAsEventListener = function() {
        var originFn = this;
        var args = $A(arguments);
        var context = args.shift();
        return function(ev) {
            return originFn.apply(context, [ev || window.event].concat(args));
        };
    };

    Array.prototype.set = function(v) {
        var len = this.length;
        while(len--) {
            this[len] = v;
        }
        return this;
    };

    var app = function(el) {
        this.panel = el || $("#canvas")[0];
        this.ctx2d = this.panel.getContext("2d");
        this.textbox = $("#inputUrl");
        this.imageData = null;
        this.dataUrl = null
        this.init();
    };

    app.prototype.init = function() {
        this.loadImage($(".thumbnails img")[0].src);
        $(".chartWrap .close").click(function() {
            $("body").removeClass("histogram");
            $(".chartWrap").hide();
        });
    };

    app.prototype.loadImage = function(value) {
        var image = new Image();
        image.onload = this.drawOnPanel.bindAsEventListener(this, "aa");

        image.src = value || "../data/dollpuppy.png";
        this.imgUrl = image.src;
    };

    app.prototype.reset = function() {
        this.loadImage(this.imgUrl);
    };

    app.prototype.drawOnPanel = function() {
        var ev = arguments[0];

        var image = ev.srcElement || ev.target;

        // Note: set canvas size before drawImage()
        var w = image.naturalWidth || image.width;
        var h = image.naturalHeight || image.height;
        this.resetPanelSize(w, h);

        /*
        var self = this;
        this.panel.addEventListener('webkitTransitionEnd',
            function (event) {
                setTimeout(function () {
                    self.ctx2d.drawImage(image, 0, 0)
                    document.body.appendChild(image);
                }, 1000)
            }, false);
        */

        this.ctx2d.drawImage(image, 0, 0);

        this.imageData = this.ctx2d.getImageData(0, 0, w, h);
        this.dataUrl = this.panel.toDataURL();
    };

    app.prototype.resetPanelSize = function(w, h) {
        this.panel.width = w;
        this.panel.height = h;
    };

    app.prototype.drawLine = function() {
        var ctx = this.ctx2d;
        ctx.beginPath();
        ctx.moveTo(100, 150);
        ctx.lineTo(450, 50);
        ctx.stroke();
    };

    app.prototype.copyToOtherPanel = function(data) {
        var newPanel = document.createElement("canvas");
        newPanel.width = this.panel.width;
        newPanel.height = this.panel.height;
        var newCtx = newPanel.getContext("2d");
        newCtx.putImageData(data || this.imageData, 0, 0);
        document.body.appendChild(newPanel);
    };

    app.prototype.putImage = function(imageData) {
        this.ctx2d.putImageData(imageData || this.imageData, 0, 0);
        $("#process-done").show();
        setTimeout(function(){
            $("#process-done").hide();
        }, 1000);
    };

    app.prototype.addOrSubtrantChannel = function(channel, amount) {
        var imageData = this.getImageData();
        var i = 0;
        if (channel === "g") {
            i = 1;
        } else if (channel === "b") {
            i = 2;
        } else if (channel == "a") {
            i = 3;
        }
        var amt = (typeof amount == "number") ? amount : 10;

        for (var len = imageData.data.length; i < len; i += 4) {
            var value = imageData.data[i];
            var result = value + amt;
            if (result > 255) {
                imageData.data[i] = 255;
            } else if (result < 0) {
                imageData.data[i] = 0;
            } else {
                imageData.data[i] = result;
            }
        }
        this.putImage(imageData);
    };

    // var result = R * 0.3 + G * 0.59 + B * 0.11;
    app.prototype.greyScale = function() {
        var imgData = this.getImageData();
        var data = imgData.data;
        var p = imgData.width * imgData.height;
        var pix = p*4, pix1, pix2;

        while (p--) {
            //Y = 0.3*R + 0.59*G + 0.11*B
            data[pix-=4] = data[pix1=pix+1] = data[pix2=pix+2] = (data[pix]*0.3 + data[pix1]*0.59 + data[pix2]*0.11);
        }
        this.putImage(imgData);
    };

    // var result = R * 0.3 + G * 0.59 + B * 0.11;
    // double for loop
    app.prototype.greyScale2 = function() {
        var imageData = this.getImageData();
        var data = imageData.data;
        for (var x = 0; x < imageData.width; x++) {
            for (var y = 0; y < imageData.height; y++) {
                var offset = (y * imageData.width + x) * 4;
                var R = data[offset];
                var G = data[offset+1];
                var B = data[offset+2];
                //var A = data[offset+3];

                var result = R * 0.3 + G * 0.59 + B * 0.11;
                data[offset] = data[offset+1] = data[offset+2] = result;
            }
        }
        this.putImage(imageData);
    };

    // The human eye is bad at seeing red and blue, so we de-emphasize them.
    //var v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    app.prototype.greyScale3 = function() {
        var imageData = this.getImageData();
        var d = imageData.data;
        for (var i = 0, len = d.length; i < len; i += 4) {
            var r = d[i];
            var g = d[i + 1];
            var b = d[i + 2];

            var v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            d[i] = d[i + 1] = d[i + 2] = v;
        }
        this.putImage(imageData);
    };

    // (r + g + b) / 3
    app.prototype.greyScale4 = function() {
        var imageData = this.getImageData();
        var data = imageData.data;
        for (var i = 0, len = data.length; i < len; i += 4) {
            var r = data[i];
            var g = data[i + 1];
            var b = data[i + 2];
            var average = (r + g + b) / 3;
            data[i] = data[i + 1] = data[i + 2] = average;
        }
        this.putImage(imageData);
    };

    app.prototype.blackAndWhite = function() {
        var imgData = this.getImageData();
        var data = imgData.data;
        for (var x = 0; x < this.imageData.width; x++) {
            for (var y = 0; y < this.imageData.height; y++) {
                //var brightness = Math.min(150,Math.max(-150,10));
                //data[offset] += brightness;
                var offset = (y * this.imageData.width + x) * 4;
                var R = data[offset];
                var G = data[offset+1];
                var B = data[offset+2];
                var ave = (R + G + B) / 3;
                data[offset] = data[offset+1] = data[offset+2] = ave > 100 ? 255 : 0;
            }
        }
        this.putImage(imgData);
    };
    app.prototype.sephia = function() {
        var imgData = this.getImageData();
        var data = imgData.data;
        for (var x = 0; x < this.imageData.width; x++) {
            for (var y = 0; y < this.imageData.height; y++) {
                //var brightness = Math.min(150,Math.max(-150,10));
                //data[offset] += brightness;
                var offset = (y * this.imageData.width + x) * 4;
                var R = data[offset];
                var G = data[offset+1];
                var B = data[offset+2];
                data[offset] = (R * .393) + (G *.769) + (B * .189);
                data[offset+1] = (R * .349) + (G *.686) + (B * .168);
                data[offset+2] = (R * .272) + (G *.534) + (B * .131)
            }
        }
        this.putImage(imgData);
    };

    app.prototype.bright = function(brightness) {
        var imageData = this.getImageData();
        var data = imageData.data;

        for (var x = 0, len = data.length; x < len; x++) {
            var brightness = typeof brightness == "number" ? brightness : 10;
            data[x] += brightness;
        }
        this.putImage(imageData);
    };

    app.prototype.getImageData = function() {
        return this.ctx2d.getImageData(0, 0, this.panel.width, this.panel.height);
    };

    app.prototype.edge = function() {
        var data = this.imageData.data;
        var newImgData = this.getImageData();
        var newData = newImgData.data;
        var width = this.imageData.width;

        for (var x = 0; x < width; x++) {
            for (var y = 0; y < this.imageData.height; y++) {
                var offset = (y * width + x) * 4;
                var R = data[offset];
                var G = data[offset+1];
                var B = data[offset+2];
                var ave = (R + G + B) / 3;

                var offsetL = (y * width + x-4) * 4;
                var RL = data[offsetL];
                var GL = data[offsetL+1];
                var BL = data[offsetL+2];
                var aveL = (RL + GL + BL) / 3;

                var diff = Math.abs(ave - aveL);
                newData[offset] = newData[offset + 1] = newData[offset + 2] = diff > 40 ? 255 : 0;
            }
        }
        this.putImage(newImgData);
    };

    app.prototype.sharpen = function(mat) {
        var matrix = mat || [[-1, -1, -1], [-1, 9, -1], [-1, -1, -1]];
        var newImgData = this.getImageData();
        var totalLen = newImgData.length;
        var w = newImgData.width;
        var h = newImgData.height;
        var self = this;

        for (var x = 0; x < w; x++) {
            for (var y = 0; y < h; y++) {
                var pos = index(x, y, w);
                var color = convolution(x, y);
                newImgData.data[pos] = color[0];
                newImgData.data[pos+1] = color[1];
                newImgData.data[pos+2] = color[2];
            }
        }

        this.putImage(newImgData);

        function convolution(x, y) {

            var rTotal = 0;
            var gTotal = 0;
            var bTotal = 0;
            var matrixSize = matrix.length;
            var offset = 1;

            for (var i = 0; i < matrixSize; i++) {
                for (var j = 0; j < matrixSize; j++) {
                    var xLoc = x + i - offset;
                    var yLoc = y + j - offset;
                    var loc = (xLoc + w * yLoc) * 4;

//                    if (x > 0 && y > 0 && cnt < 200) {
//                        console.log(" ", x, y, pos, "--->", xLoc, yLoc,  loc, " m["+i+"]["+j+"]", matrix[i][j]);
//                        cnt++;
//                    }
                    if (loc < 0 || loc > totalLen) {
                        continue;
                    }

                    rTotal += self.imageData.data[loc] * matrix[i][j];
                    gTotal += self.imageData.data[loc + 1] * matrix[i][j];
                    bTotal += self.imageData.data[loc + 2] * matrix[i][j];
                }
            }
            y < 24 ? console.log("x y pos --> nX nY nIdx matrix") : 1;
            return [rTotal, gTotal, bTotal];
        }
        return this;
    }

    app.prototype.description = function(moreInfo) {

    };

    function index(x, y, width) {
        return (y * width + x) * 4;
    }

    function drawChart(renderTo, data, name, color) {
        new Highcharts.Chart({
            chart: {
                renderTo: renderTo,
                defaultSeriesType: 'column'
            },
            title: {
                text: 'RGB Histogram'
            },
            xAxis: {
                categories: [
                    //"0", "50", "100", "150", "200", "250"
                ],
                labels: {
                    enabled: false
                },
                max: 255,
                offset: 0,
                showLastLabel: true,
                tickLength: 5
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                }
            },
            legend: {
                layout: 'vertical',
                backgroundColor: '#FFFFFF',
                style: {
                    left: '100px',
                    top: '70px',
                    bottom: 'auto'
                }
            },
            tooltip: {
                formatter: function() {
                    return '<b>'+ this.series.name +'</b><br/>'+
                        "value:" +this.x +',count: '+ this.y +'';
                }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                data: data,
                name: name,
                color: color

            }]
        });


    }

    app.prototype.histogram = function() {
//        var imageData = this.ctx2d.getImageData(0, 0, this.panel.width, this.panel.height);
        var imageData = this.getImageData();
        var arrR = (new Array(256)).set(0);
        var arrG = (new Array(256)).set(0);
        var arrB = (new Array(256)).set(0);
        for (var x = 0; x < imageData.width; x++)
            for (var y = 0; y < imageData.height; y++) {
                var offset = (y * imageData.width + x) * 4;
                arrR[imageData.data[offset]]++;
                arrG[imageData.data[offset+1]]++;
                arrB[imageData.data[offset+2]]++;

            }
        $(".chartWrap").show();
        drawChart("chartR", arrR, 'R channel', '#f08080')
        drawChart("chartG", arrG, 'G channel', '#90ee90')
        drawChart("chartB", arrB, 'B channel', '#b0c4de')
    };

    window.Dot = app;

    var layer = function(el) {
        this.el = el;
        this.wrapper = this.el.parent();
        this.init();
    };
    layer.prototype.init = function() {
        var self = this;
        $(".close").click(function() {
            self.hide();
        });
    };
    layer.prototype.set = function(text) {
        this.reset();
        text && $('<div><h6>-- matrix --<br></h6>'+ text + '</div>').appendTo(this.el);
        return this;
    };
    layer.prototype.fn = function(text) {
        $('<div><h6>-- function --<br></h6>'+ text + '</div>').appendTo(this.el);
        return this;
    };
    layer.prototype.show = function() {
        this.wrapper.show();
        return this;
    };
    layer.prototype.hide = function() {
        this.reset();
        this.wrapper.hide();
        return this;
    };
    layer.prototype.reset = function() {
        this.el.html("");
    };
    window.InfoLayer = layer;

})();


