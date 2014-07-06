/// <reference path="libs/jquery-2.1.1.js" />
/// <reference path="libs/handlebars.js" />
/// <reference path="_references.js" />
(function () {
    'use strict';

    require.config({
        paths: {
            jquery: "libs/jquery-2.1.1",
            hb: "libs/handlebars",
            combobox: "combobox",
            template: "template"
        }
    });

    require(['jquery', 'template', 'combobox'], function () {
        var people = [{
            id: 1,
            name: "Doncho Minkov",
            age: 18,
            avatarUrl: "imgs/dminkov.jpg"
        }, {
            id: 2,
            name: "Pavel Kolev",
            age: 19,
            avatarUrl: "imgs/pkolev.jpg"
        }, {
            id: 3,
            name: "Ivaylo Kenov",
            age: 17,
            avatarUrl: "imgs/ikenov.jpg"
        }, {
            id: 4,
            name: "Top Mrusnica",
            age: 19,
            avatarUrl: "imgs/aocean.jpg"
        }, {
            id: 5,
            name: "Dinko Peshov",
            age: 19,
            avatarUrl: "imgs/dinko.jpg"
        }];

        $('#main-container').template(people);

        $('#main-container').comboBox();
    });
}());