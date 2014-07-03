/// <reference path="_references.js" />
var games = (function () {
    var dimensions;

    function GameEngine(renderEngine) {
        this.renderEngine = renderEngine;
        this.snake = new snakes.get(250, 250, 25);
        this.bindKeyEvents();
        this.state = 'stopped';
    }

    function animationFrame() {
        var snakePosition = currGame.snake.getPosition(),
            toChangePosition = false,
            newX = snakePosition.x,
            newY = snakePosition.y;

        if (snakePosition.x < dimensions.minWidth) {
            newX = dimensions.maxWidth;
            toChangePosition = true;
        } else if (dimensions.maxWidth < snakePosition.x) {
            newX = dimensions.minWidth;
            toChangePosition = true;
        }

        if (snakePosition.y < dimensions.minHeight) {
            newY = dimensions.maxHeight;
            toChangePosition = true;
        }

        if (dimensions.maxHeight < snakePosition.y) {
            newY = dimensions.minHeight;
            toChangePosition = true;
        }

        if (toChangePosition) {
            currGame.snake.changePosition(newX, newY);
        }

        currGame.renderEngine.clear();
        currGame.snake.move();
        currGame.renderEngine.draw(currGame.snake);

        if (currGame.state === 'running') {
            requestAnimationFrame(animationFrame);
        }
    }

    GameEngine.prototype = {
        start: function () {
            currGame = this;
            requestAnimationFrame(animationFrame);
            dimensions = this.renderEngine.getDimensions();
            this.state = 'running';
        },
        stop: function () {
            currGame.state = 'stopped';
        },
        bindKeyEvents: function () {
            var self = this;
            document.body.addEventListener("keydown", function (ev) {
                var keyCode = ev.keyCode;
                if (37 <= keyCode && keyCode <= 40) {
                    self.snake.changeDirection(keyCode - 37);
                }
            });
        },
        getState: function () {
            return this.state;
        }
    }

    return {
        get: function (renderEngine) {
            return new GameEngine(renderEngine);
        }
    };
}());