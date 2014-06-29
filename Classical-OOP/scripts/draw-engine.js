var CanvasRenderEngine = function (canvasId) {
    "use strict";

    var canvas = document.querySelector(canvasId),
        ctx = canvas.getContext('2d'),
        drawLine,
        drawCircle,
        drawRect;

    drawLine = function (x1, y1, x2, y2, color, width) {
        var lineColor = color || 'black',
            lineWidth = width || 1;

        ctx.beginPath();

        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);

        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;

        ctx.stroke();
    };

    drawCircle = function (centerX, centerY, radius, fillColor, borderColor, borderWidth) {
        var color = fillColor || 'white',
            strokeColor = borderColor || 'black',
            strokeWidht = borderWidth || 1;

        ctx.beginPath();

        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);

        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidht;
        ctx.fillStyle = color;

        ctx.fill();
        ctx.stroke();
    };

    drawRect = function (topX, topY, width, height, fillColor, borderColor, borderWidth) {
        var color = fillColor || 'white',
          strokeColor = borderColor || 'black',
          strokeWidht = borderWidth || 1;

        ctx.beginPath();

        ctx.rect(topX, topY, width, height);

        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = strokeWidht;
        ctx.fillStyle = color;

        ctx.fill();
        ctx.stroke();
    };

    return {
        drawLine: drawLine,
        drawCicle: drawCircle,
        drawRect: drawRect
    };
};
