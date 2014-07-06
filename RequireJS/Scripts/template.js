/// <reference path="_references.js" />
define(['jquery', 'hb'], function ($) {
    return $.fn.template = function (data) {
        var $this = this,
            templateIdString,
            templateHtml,
            compiled,
            len,
            i;

        templateIdString = $this.attr('data-template');

        templateHtml = $('#' + templateIdString).html();
        compiled = Handlebars.compile(templateHtml);

        for (i = 0, len = data.length; i < len; i += 1) {
            $this.append(compiled(data[i]));
        }

        return $this;
    }
})