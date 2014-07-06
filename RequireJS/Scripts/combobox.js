/// <reference path="_references.js" />
define(['jquery'], function ($) {
    return $.fn.comboBox = function () {
        var $this = this,
            $persons = $this.find('.person-item'),
            $selectedPerson = $this.find('.selected-person');

        $persons.hide();

        $selectedPerson.on('click', function () {
            $persons.show();
        });

        $persons.on('click', function () {
            var $that = $(this);
            $selectedPerson.html($that.html());
            $persons.hide();
        });

        return $this;
    }
})