/// <reference path="_references.js" />
var renderEngine = (function () {
    var drawSnake,
        drawSnakePart,
        drawFood,
        drawWall;

    drawSnake = function (canvas, snake) {
        var i,
            len;

        for (i = 0, len = snake.parts.length; i < len; i += 1) {
            drawSnakePart(canvas, snake.parts[i]);
        }
    };

    drawSnakePart = function (canvas, snakePart) {
        var ctx = canvas.getContext('2d'),
            position = snakePart.getPosition();

        if (snakePart instanceof snakes.HeadSnake) {
            ctx.fillStyle = 'black';
            ctx.strokeStyle = 'black';
        } else {
            ctx.fillStyle = 'orange';
            ctx.strokeStyle = 'black';
        }

        ctx.fillRect(position.x, position.y, snakePart.size, snakePart.size);
        ctx.strokeRect(position.x, position.y, snakePart.size, snakePart.size);
    };

    drawFood = function (canvas, food) {
        var ctx = canvas.getContext('2d'),
            position = food.getPosition();

        ctx.fillStyle = 'green';
        ctx.fillRect(position.x, position.y, food.size, food.size);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(position.x, position.y, food.size, food.size);
    };

    drawWall = function (canvas, wall) {
        var ctx = canvas.getContext('2d'),
            position = wall.getPosition();

        ctx.fillStyle = 'black';
        ctx.fillRect(position.x, position.y, wall.size, wall.size);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(position.x, position.y, part.size, part.size);
    };

    function CanvasRenderEngine(canvas) {
        if (canvas instanceof HTMLCanvasElement) {
            this.canvas = canvas;
        } else if (typeof canvas === 'String' || typeof canvas === 'string') {
            this.canvas = document.querySelector(canvas);
        } else {
            throw new Error('Canvas element is neither selected by tag nor by CSS selector');
        }
    }

    CanvasRenderEngine.prototype = {
        draw: function (obj) {
            if (obj instanceof snakes.Snake) {
                drawSnake(this.canvas, obj);
            } else if (obj instanceof snakes.SnakePart) {
                drawSnakePart(this.canvas, obj);
            } else if (obj instanceof snakes.Food) {
                drawFood(this.canvas, obj);
            } else if (obj instanceof snakes.Wall) {
                drawWall(this.canvas, obj);
            }
        },
        clear: function () {
            var ctx = this.canvas.getContext('2d'),
                w = this.canvas.width,
                h = this.canvas.height;

            ctx.clearRect(0, 0, w, h);
        },
        getDimensions: function () {
            return {
                minWidth: 0,
                maxWidth: this.canvas.width,
                minHeight: 0,
                maxHeight: this.canvas.height
            };
        }
    };

    return {
        getCanvas: function (selector) {
            return new CanvasRenderEngine(selector);
        }
    };
}());