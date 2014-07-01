var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Cars;
(function (Cars) {
    "use strict";
    (function (EngineType) {
        EngineType[EngineType["Petrol"] = 0] = "Petrol";
        EngineType[EngineType["Diesel"] = 1] = "Diesel";
        EngineType[EngineType["Electricity"] = 2] = "Electricity";
        EngineType[EngineType["NaturalGas"] = 3] = "NaturalGas";
    })(Cars.EngineType || (Cars.EngineType = {}));
    var EngineType = Cars.EngineType;
    ;
    (function (CoupeType) {
        CoupeType[CoupeType["Convertible"] = 0] = "Convertible";
        CoupeType[CoupeType["Roadstar"] = 1] = "Roadstar";
        CoupeType[CoupeType["Sportsback"] = 2] = "Sportsback";
        CoupeType[CoupeType["Coupe"] = 3] = "Coupe";
        CoupeType[CoupeType["SUV"] = 4] = "SUV";
    })(Cars.CoupeType || (Cars.CoupeType = {}));
    var CoupeType = Cars.CoupeType;
    ;
    (function (MercedesModel) {
        MercedesModel[MercedesModel["C"] = 0] = "C";
        MercedesModel[MercedesModel["E"] = 1] = "E";
        MercedesModel[MercedesModel["SL"] = 2] = "SL";
        MercedesModel[MercedesModel["CL"] = 3] = "CL";
        MercedesModel[MercedesModel["CLS"] = 4] = "CLS";
        MercedesModel[MercedesModel["SLK"] = 5] = "SLK";
        MercedesModel[MercedesModel["S"] = 6] = "S";
        MercedesModel[MercedesModel["ML"] = 7] = "ML";
        MercedesModel[MercedesModel["GL"] = 8] = "GL";
    })(Cars.MercedesModel || (Cars.MercedesModel = {}));
    var MercedesModel = Cars.MercedesModel;
    ;

    var Car = (function () {
        function Car(year, engine, type) {
            this.year = year;
            this.engine = engine;
            this.type = type;
        }
        Car.prototype.getOverview = function () {
            return " Year: " + this.year + " Fuel: " + EngineType[this.engine.type] + " Coupe: " + CoupeType[this.type];
        };

        Car.prototype.getFuelConsuption = function () {
            var consumption = Math.round(Math.random() * 5);

            console.log("Fuel consumption: " + consumption + " l/100km");
        };

        Car.prototype.startEngine = function () {
            return "Engine started! Do you feel those " + this.engine.power + " horse running angry?!?!";
        };

        Car.prototype.tuneEngine = function (addPower, addVolume) {
            this.engine.power += addPower;
            this.engine.volume += addVolume;
        };
        Car.MaxAllowedSpeed = 260;
        return Car;
    })();
    Cars.Car = Car;

    var Mercedes = (function (_super) {
        __extends(Mercedes, _super);
        function Mercedes(model, year, engine, type) {
            _super.call(this, year, engine, type);
            this._brandName = "Mercedes";
            this.model = model;
        }
        Mercedes.prototype.getOverview = function () {
            return this._brandName + " Model: " + MercedesModel[this.model] + " class " + _super.prototype.getOverview.call(this);
        };

        Mercedes.prototype.startEngine = function () {
            return _super.prototype.startEngine.call(this) + "This sounds like an AMG! OMG!!!!";
        };
        return Mercedes;
    })(Car);
    Cars.Mercedes = Mercedes;
})(Cars || (Cars = {}));

var engine = {
    type: 0 /* Petrol */,
    volume: 2000,
    power: 300
};

var c = new Cars.Car(2014, engine, 4 /* SUV */);
var m = new Cars.Mercedes(4 /* CLS */, 2014, engine, 1 /* Roadstar */);
console.log(m.startEngine());
console.log("Power:" + m.engine.power);
console.log("Power:" + m.engine.volume);

m.tuneEngine(20, 200);

console.log("Power:" + m.engine.power);
console.log("Power:" + m.engine.volume);
//# sourceMappingURL=CarModule.js.map
