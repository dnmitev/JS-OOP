/// <reference path="_references.js" />
var games = (function () {
    var dimensions,
        MAX_FOOD_COUNT = 9,
        MAX_WALL_COUNT = 5;

    function GameEngine(renderEngine) {
        this.renderEngine = renderEngine;
        this.snake = new snakes.get(250, 250, 5);
        this.food = [];
        this.wall = [];
        this.bindKeyEvents();
        this.state = 'stopped';
    }

    function fillFoodArray(count) {
        var i,
            w, h,
            x, y;

        w = dimensions.maxWidth;
        h = dimensions.maxHeight;

        for (i = 0; i < count; i += 1) {
            x = Math.floor(Math.random() * w);
            y = Math.floor(Math.random() * h);

            currGame.food.push(new snakes.getFood(x, y, 12));
        }
    }

    function fillWallArray(count) {
        var i,
            w, h,
            x, y;

        w = dimensions.maxWidth;
        h = dimensions.maxHeight;

        for (i = 0; i < count; i += 1) {
            x = Math.floor(Math.random() * w);
            y = Math.floor(Math.random() * h);

            currGame.wall.push(new snakes.getWall(x, y, 15, 60));
        }
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

        for (var i = 0, len = currGame.food.length; i < len; i += 1) {
            currGame.renderEngine.draw(currGame.food[i]);
        }

        for (var i = 0, l = currGame.wall.length; i < l; i += 1) {
            currGame.renderEngine.draw(currGame.wall[i]);
        }

        if (currGame.state === 'running') {
            setTimeout(function () {
                // I know it's a lame way to slow down my game execution
                // but I couldn't think of better way now
                // if you know kind of better way feel free to inform me
                requestAnimationFrame(animationFrame);
            }, 125)
        }
    }

    GameEngine.prototype = {
        start: function () {
            currGame = this;
            dimensions = this.renderEngine.getDimensions();
            fillFoodArray(Math.floor(Math.random() * MAX_FOOD_COUNT));
            fillWallArray(Math.floor(Math.random() * MAX_WALL_COUNT));
            requestAnimationFrame(animationFrame);
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