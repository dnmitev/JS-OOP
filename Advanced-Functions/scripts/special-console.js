var specialConsole = (function () {
    "use strict";
    
    function placeHolder(input) {
        var format = input[0],
            i;

        for (i = 0; i < 100; i += 1) {
            while (format.indexOf('{' + i + '}') !== -1) {
                format = format.replace('{' + i + '}', input[i + 1]);
            }
        }
        return format;
    }

    function writeLine(message) {
        var argsCount = arguments.length;

        if (argsCount === 1) {
            console.log(message.toString());
        } else {
            var string = placeHolder(arguments);
            console.log(string.toString());
        }
    }

    function writeWarning(message) {
        var argsCount = arguments.length,
            string;

        if (argsCount === 1) {
            console.warn(message.toString());
        } else {
            string = placeHolder(arguments);
            console.warn(string.toString());
        }
    }

    function writeError(message) {
        var argsCount = arguments.length,
            string;

        if (argsCount === 1) {
            console.error(message.toString());
        } else {
            string = placeHolder(arguments);
            console.error(string.toString());
        }
    }

    return {
        writeLine: writeLine,
        writeWarning: writeWarning,
        writeError: writeError
    }
}());