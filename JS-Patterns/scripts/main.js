/// <reference path="_references.js" />
(function () {
    'use strict';

    var canvasElement = document.querySelector('#canvas-element'),
        startBtn = document.querySelector('#start-game-btn'),
        stopBtn = document.querySelector('#stop-game-btn'),
        canvasRenderEngine = renderEngine.getCanvas(canvasElement),
        game = games.get(canvasRenderEngine);

    stopBtn.disabled = true;

    document.addEventListener('keydown', function (ev) {
        var keyCode = ev.keyCode;

        if (keyCode === 20 || keyCode === 32) {
            if (game.getState() === 'running') {
                performGameStop();
            } else {
                performGameStart();
            }
        }
    });

    function performGameStart() {
        game.start();
        startBtn.disabled = true;
        stopBtn.disabled = false;
    }

    function performGameStop() {
        game.stop();
        startBtn.disabled = false;
        stopBtn.disabled = true;
    }

    startBtn.addEventListener("click", function () {
        performGameStart();
    });

    stopBtn.addEventListener("click", function () {
        performGameStop();
    });
}());