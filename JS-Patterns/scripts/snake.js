/// <reference path="_references.js" />
var snakes = (function () {
    var SNAKE_PART_SIZE = 15,
        directions = [{
            // left
            dx: -1,
            dy: 0
        }, {
            // up
            dx: 0,
            dy: -1
        }, {
            // right
            dx: +1,
            dy: 0
        }, {
            // down
            dx: 0,
            dy: +1
        }];

    function GameObject(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
    }

    GameObject.prototype = {
        getPosition: function () {
            return {
                x: this.x,
                y: this.y
            };
        },
        getSize: function () {
            return this.size;
        }
    };

    function SnakePart(x, y, size) {
        GameObject.call(this, x, y, size);
    }

    SnakePart.prototype = new GameObject();
    SnakePart.prototype.constructor = SnakePart;

    SnakePart.prototype.changePosition = function (x, y) {
        this.x = x;
        this.y = y;
    }

    function SnakeHeadPart(x, y, size) {
        SnakePart.call(this, x, y, size);
    }

    SnakeHeadPart.prototype = new SnakePart();
    SnakeHeadPart.prototype.constructor = SnakeHeadPart;

    function Snake(x, y, size) {
        var part,
            xPartPos,
            yPartPos,
            i;

        this.parts = [];
        this.direction = 2;

        for (i = 0; i < size; i += 1) {
            xPartPos = x - i * SNAKE_PART_SIZE;
            yPartPos = y;

            part = new SnakePart(xPartPos, yPartPos, SNAKE_PART_SIZE);

            this.parts.push(part);
        }
    }

    Snake.prototype = new GameObject();
    Snake.prototype.constructor = Snake;

    Snake.prototype = {
        head: function () {
            return this.parts[0];
        },
        getPosition: function () {
            return this.head().getPosition();
        },
        changePosition: function (x, y) {
            this.head().changePosition(x, y);
        },
        move: function () {
            var dx, dy,
                i,
                currentPosition,
                currentHeadPosition,
                newHeadPosition,
                head;

            for (i = this.parts.length - 1; i >= 1; i -= 1) {
                currentPosition = this.parts[i - 1].getPosition();
                this.parts[i].changePosition(currentPosition.x, currentPosition.y);
            }

            head = this.head();

            dx = directions[this.direction].dx;
            dy = directions[this.direction].dy;

            currentHeadPosition = head.getPosition();
            newHeadPosition = {
                x: currentHeadPosition.x + head.size * dx,
                y: currentHeadPosition.y + head.size * dy,
            };

            head.changePosition(newHeadPosition.x, newHeadPosition.y);
        },
        changeDirection: function (newDirection) {
            this.direction = newDirection;
        }
    }

    function Food(x, y, size) {
        GameObject.call(this, x, y, size);
    }

    Food.prototype = new GameObject();
    Food.prototype.constructor = Food;

    function Wall(x, y, size) {
        GameObject.call(this, x, y, size);
    }

    Wall.prototype = new GameObject();
    Wall.prototype.constructor = Wall;

    return {
        get: function (x, y, size) {
            return new Snake(x, y, size);
        },
        getFood: function (x, y, size) {
            return new Food(x, y, size);
        },
        Snake: Snake,
        SnakePart: SnakePart,
        HeadSnake: SnakeHeadPart,
        Wall: Wall,
        Food: Food
    };
}());