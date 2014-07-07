define(['todo-list/section'],function (Section) {
    'use strict';
    var Container;
    Container = (function () {
        function Container() {
            this._sections = [];
        }

        Container.prototype = {
            add: function (section) {
                if (!(section instanceof Section)) {
                    throw {
                        message: 'Only sections are contained in the container'
                    };
                }

                this._sections.push(section);
                return this
            },
            getData: function () {
                var i,
                    len,
                    section,
                    dataSections = [];

                for (i = 0, len = this._sections.length; i < len; i += 1) {
                    section = this._sections[i];
                    dataSections.push(section.getData());
                }

                return dataSections;
            }
        };

        return Container;
    }());

    return Container;
});