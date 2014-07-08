define(function () {
    "use strict";
    var Item;

    Item = (function () {
        var itemTypes = ['accessory', 'smart-phone', 'notebook', 'pc', 'tablet'],
            MIN_NAME_LENGTH = 6,
            MAX_NAME_LENGTH = 40;

        function isValidItemType(type) {
            if (itemTypes.indexOf(type) > -1) {
                return true;
            } else {
                throw new TypeError('Invalid item type.');
            }
        }

        function isValidItemName(name) {
            if (MIN_NAME_LENGTH <= name.length && name.length <= MAX_NAME_LENGTH) {
                return true;
            } else {
                throw new RangeError('Item name should be between ' + MIN_NAME_LENGTH + ' and ' + MAX_NAME_LENGTH + ' symbols.');
            }
        }

        function isValidItemPrice(price) {
            if (price >= 0) {
                return true;
            } else {
                throw new RangeError('Price should be positive number.');
            }
        }

        function Item(type, name, price) {
            if (isValidItemType(type)) {
                this.type = type;
            }

            if (isValidItemName(name)) {
                this.name = name;
            }

            if (isValidItemPrice(price)) {
                this.price = price;
            }
        }

        return Item;
    }());

    return Item;
});