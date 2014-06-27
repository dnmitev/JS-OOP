(function () {
    "use strict";

    var i,
        element,
        spanElement,
        domModule;

    domModule = (function () {
        var addElement,
            removeElement,
            attachEvent,
            addToBuffer,
            buffer = [];

        addElement = function addElement(element, parentSelector) {
            var parent = document.querySelector(parentSelector);
            parent.appendChild(element);
        };

        removeElement = function removeElement(parentSelector, childSelector) {
            var parent = document.querySelector(parentSelector),
                child = document.querySelector(childSelector);

            parent.removeChild(child);
        };

        attachEvent = function attachEvent(elementSelector, eventType, handler) {
            var i,
                len,
                elements = document.querySelectorAll(elementSelector);

            for (i = 0, len = elements.length; i < len; i += 1) {
                if (elements[i].addEventListener) {
                    elements[i].addEventListener(eventType, handler, false);
                } else {
                    elements[i].attachEvent("on" + eventType, handler);
                }
            }
        };

        addToBuffer = function addToBuffer(selector, element) {
            var i,
                len,
                currentElement = document.querySelector(selector);

            if (buffer[selector]) {
                buffer[selector].push(element);

                if (buffer[selector].length >= 100) {
                    for (i = 0, len = buffer[selector].length; i < len; i += 1) {
                        currentElement.appendChild(buffer[selector][i]);
                    }

                    buffer[selector] = [];
                }
            } else {
                buffer[selector] = [];
                buffer[selector].push(element);
            }
        };

        return {
            addElement: addElement,
            removeElement: removeElement,
            attachEvent: attachEvent,
            addToBuffer: addToBuffer
        };
    }());

    // custom appendChild 
    element = document.createElement('p');
    element.className += ' added';
    element.textContent = 'Integer congue urna purus, quis auctor eros venenatis ut. In gravida accumsan nibh. Sed hendrerit velit risus, ac pharetra sem placerat at. Etiam sollicitudin augue metus, a tempus sem venenatis ac. Aenean hendrerit orci quam, nec bibendum sem fringilla eget. Sed fringilla lacus imperdiet neque hendrerit, id semper nisl semper. Nulla cursus sed arcu a aliquet. Quisque ut placerat ante. Suspendisse pretium rutrum tellus, eu molestie mauris euismod a.';

    domModule.addElement(element, 'div>section');

    // custom removeChild
    domModule.removeElement('div>section', '#first-paragraph');

    // custom addEventListner
    domModule.attachEvent('.text', 'click', function () {
        var self = this;

        if (self.style.backgroundColor !== 'black') {
            self.style.backgroundColor = 'black';
            self.style.color = 'yellowgreen';
        } else {
            self.style.backgroundColor = '';
            self.style.color = '';
        }
    });

    // custom document Fragment
    spanElement = document.createElement('span');
    for (i = 1; i <= 100; i += 1) {
        spanElement.textContent = '#' + i + ' ';
        domModule.addToBuffer('#additional', spanElement.cloneNode(true));
    }
}());