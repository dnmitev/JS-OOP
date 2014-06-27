(function () {
    "use strict";

    var movingShapes = (function movingShapes() {
        var interval,
            moveElements;

        function move() {
            var i,
                j,
                len,
                rects = document.getElementsByClassName('rect'),
                circle = document.getElementsByClassName('circle'),
                angle = 0.1,
                radius = 100;

            for (i = 0, len = rects.length; i < len; i += 1) {
                moveRectangularly(rects[i]);
            }

            for (j = 0, len = circle.length; j < len; j += 1) {
                moveCircularly(circle[j]);
            }

            function moveRectangularly(element) {
                var position = element.getAttribute('wayToMove');

                if (parseInt(element.offsetTop) < 200 && position === 'down') {
                    for (i = 0; i < 4; i++) {
                        element.style.top = parseInt(element.offsetTop) + 1 + 'px';
                    }

                    if (parseInt(element.offsetTop) === 200) {
                        element.setAttribute('wayToMove', 'right');
                    }
                } else if (parseInt(element.offsetLeft) < 200 && position === 'right') {
                    for (i = 0; i < 4; i++) {
                        element.style.left = parseInt(element.offsetLeft) + 1 + 'px';
                    }

                    if (parseInt(element.offsetLeft) === 200) {
                        element.setAttribute('wayToMove', 'up');
                    }
                } else if (parseInt(element.offsetTop) > 0 && position === 'up') {
                    for (i = 0; i < 4; i++) {
                        element.style.top = parseInt(element.offsetTop) - 1 + 'px';
                    }

                    if (parseInt(element.offsetTop) === 0) {
                        element.setAttribute('wayToMove', 'left');
                    }
                } else if (parseInt(element.offsetLeft) > 0 && position === 'left') {
                    for (i = 0; i < 4; i++) {
                        element.style.left = parseInt(element.offsetLeft) - 1 + 'px';
                    }

                    if (parseInt(element.offsetLeft) === 0) {
                        element.setAttribute('wayToMove', 'down');
                    }
                }
            }

            function moveCircularly(rect) {
                var angle = parseFloat(rect.getAttribute('angle'));

                rect.style.left = Math.cos(angle + 2 * Math.PI / 5 * 5) / radius * 10000 + "px";
                rect.style.top = Math.sin(angle + 2 * Math.PI / 5 * 5) / radius * 10000 + "px";
                angle += 0.1;
                rect.setAttribute('angle', angle);
            }
        }

        function addRectangularToHolder() {
            var holder = document.querySelector('#rectangle-holder'),
                div = document.createElement('div');

            div.textContent = 'Pesho';

            div.style.backgroundColor = generateRandomColor();
            div.style.color = generateRandomColor();
            div.style.borderColor = generateRandomColor();
            div.className = 'rect';
            div.setAttribute('wayToMove', 'down');

            holder.appendChild(div);
        }

        function addCircleToHolder() {
            var holder = document.querySelector('#circle-holder'),
                div = document.createElement('div');

            div.textContent = 'Pesho';

            div.style.backgroundColor = generateRandomColor();
            div.style.color = generateRandomColor();
            div.style.borderColor = generateRandomColor();
            div.className = 'circle';
            div.setAttribute('angle', '0.1');
            div.style.top = '100px';
            div.style.left = '100px';

            holder.appendChild(div);
        }

        function add(shape) {
            switch (shape) {
                case 'rect':
                    addRectangularToHolder();
                    break;
                case 'circle':
                    addCircleToHolder();
                    break;
                default:
                    alert('Invalid shape name!');
                    break;
            }
        }

        moveElements = function moveElements() {
            if (interval) {
                clearInterval(interval);
                interval = undefined;
            } else {
                interval = setInterval(function () {
                    move();
                }, 100);
            }
        };

        function generateRandomColor() {
            var red = (Math.random() * 256) | 0;
            var green = (Math.random() * 256) | 0;
            var blue = (Math.random() * 256) | 0;

            return "rgb(" + red + "," + green + "," + blue + ")";
        }

        return {
            add: add,
            move: moveElements
        };
    }());

    var addCircleBtn = document.getElementById('addCircle');

    addCircleBtn.addEventListener('click', function () {
        movingShapes.add('circle');
    }, false);

    var addRectBtn = document.getElementById('addRect');

    addRectBtn.addEventListener('click', function () {
        movingShapes.add('rect');
    }, false);

    var moveBtn = document.getElementById('moveBtn');

    moveBtn.addEventListener('click', function () {
        movingShapes.move();
    }, false);
}());