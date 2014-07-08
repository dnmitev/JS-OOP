define(['tech-store-models/item'], function (Item) {
    "use strict";
    var Store;

    Store = (function () {
        var MIN_NAME_LENGTH = 6,
            MAX_NAME_LENGTH = 30;

        function isValidStoreName(name) {
            if (MIN_NAME_LENGTH <= name.length && name.length <= MAX_NAME_LENGTH) {
                return true;
            } else {
                throw new RangeError('Store name should be between ' + MIN_NAME_LENGTH + ' and ' + MAX_NAME_LENGTH + ' symbols.');
            }
        }

        function getLexicographicalSortByName(first, second) {
            var firstName = first.name.toLowerCase(),
                secondName = second.name.toLowerCase();

            if (firstName < secondName) {
                return -1;
            } else if (firstName > secondName) {
                return 1;
            } else {
                return 0;
            }
        }

        function getAscendingSortByPrice(first, second) {
            return first.price - second.price;
        }

        function getItemByType(type) {
            var itemsToReturn = [],
                item,
                i,
                len;

            for (i = 0, len = this._items.length; i < len; i += 1) {
                item = this._items[i];

                if (item.type === type) {
                    itemsToReturn.push(item);
                }
            }

            return itemsToReturn;
        }

        function getItemsInPriceRange(priceRange) {
            var itemsToReturn = [],
                item,
                i,
                len;

            // assign default options values, if options is not provided
            if (!priceRange) {
                priceRange = {
                    min: 0,
                    max: Number.MAX_VALUE
                };
            } else {
                if (!priceRange.min) {
                    priceRange.min = 0;
                }

                if (!priceRange.max) {
                    priceRange.max = Number.MAX_VALUE;
                }
            }

            for (i = 0, len = this._items.length; i < len; i += 1) {
                item = this._items[i];

                if (priceRange.min < item.price && item.price < priceRange.max) {
                    itemsToReturn.push(item);
                }
            }

            return itemsToReturn;
        }

        function Store(name) {
            if (isValidStoreName(name)) {
                this._name = name;
            }
            this._items = [];
        }

        Store.prototype = {
            addItem: function (item) {
                // adds an item to the stock of the store. A store can keep in stock only items of type Item
                if (!(item instanceof Item)) {
                    throw new TypeError('You can add only instances of Item to the Store.');
                }

                this._items.push(item);
                return this;
            },
            getAll: function () {
                // returns a collection of all items, sorted lexicographically by the name of the items
                var sorted = this._items.sort(getLexicographicalSortByName);
                return sorted;
            },
            getSmartPhones: function () {
                // returns a collection of only the items in stock that have type 'smart-phone', 
                // sorted lexicographically by the name of the items
                var smartPhones = [];

                smartPhones = getItemByType.call(this, 'smart-phone')
                                            .sort(getLexicographicalSortByName);

                return smartPhones;
            },
            getMobiles: function () {
                // returns a collection of only the items in stock that have type either 'smart-phone' or 'tablet',
                // sorted lexicographically by the name of the items
                var smartPhones = [],
                    tablets = [],
                    mobiles = [];

                smartPhones = this.getSmartPhones();
                tablets = getItemByType.call(this, 'tablet');

                mobiles = smartPhones.concat(tablets)
                                        .sort(getLexicographicalSortByName);

                return mobiles;
            },
            getComputers: function () {
                // returns a collection of only the items in stock that have type either 'pc' or 'notebook', 
                // sorted lexicographically by the name of the items
                var pc = [],
                    notebooks = [],
                    computers = [];

                pc = getItemByType.call(this, 'pc');
                notebooks = getItemByType.call(this, 'notebook');
                computers = pc.concat(notebooks)
                                .sort(getLexicographicalSortByName);

                return computers;
            },
            filterItemsByType: function (filterType) {
                // returns a collection of only the items in stock that have type equal to the given filterType 
                // (item.type === filterType), sorted lexicographically by the name of the items
                var filteredItems = [];

                filteredItems = getItemByType.call(this, filterType)
                                                .sort(getLexicographicalSortByName);

                return filteredItems;
            },
            filterItemsByPrice: function (options) {
                // returns a collection of only the items that have a price from the price range in the options parameter, 
                // sorted ascending by the price of the items. The options object is optional and have optional properties min and max. 
                // If min is missing, it should be considered as 0
                // If max is missing, it should be considered + infinity
                var itemsInPriceRange = [];

                itemsInPriceRange = getItemsInPriceRange.call(this, options)
                                                            .sort(getAscendingSortByPrice);

                return itemsInPriceRange;
            },
            countItemsByType: function () {
                // returns an associative array that have as keys the types, that are of items in stock in the store, 
                // and values that are equal to the number of items with this type
                var itemTypes = ['accessory', 'smart-phone', 'notebook', 'pc', 'tablet'],
                    itemsCountedByType = [],
                    type,
                    countOfType,
                    i,
                    len;

                for (i = 0, len = itemTypes.length; i < len; i += 1) {
                    type = itemTypes[i];
                    countOfType = this.filterItemsByType(type).length;

                    itemsCountedByType[type] = countOfType;
                }

                return itemsCountedByType;
            },
            filterItemsByName: function (partOfName) {
                // returns a collection of only the items in stock that have a name containing partOfName, 
                // sorted lexicographically by the name of the items. The search should be performed case insensitive
                var itemsToReturn = [],
                    item,
                    name,
                    len,
                    i;

                partOfName = partOfName.toLowerCase();

                for (i = 0, len = this._items.length; i < len; i += 1) {
                    item = this._items[i];
                    name = item.name.toLowerCase();

                    if (name.indexOf(partOfName) > -1) {
                        itemsToReturn.push(item);
                    }
                }

                return itemsToReturn;
            }
        };

        return Store;
    }());

    return Store;
});