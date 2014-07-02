var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Vehicles;
(function (Vehicles) {
    "use strict";

    (function (EngineType) {
        EngineType[EngineType["Petrol"] = 0] = "Petrol";
        EngineType[EngineType["Diesel"] = 1] = "Diesel";
        EngineType[EngineType["Electricity"] = 2] = "Electricity";
        EngineType[EngineType["NaturalGas"] = 3] = "NaturalGas";
    })(Vehicles.EngineType || (Vehicles.EngineType = {}));
    var EngineType = Vehicles.EngineType;
    ;
    (function (VehicleType) {
        VehicleType[VehicleType["Car"] = 0] = "Car";
        VehicleType[VehicleType["SUV"] = 1] = "SUV";
        VehicleType[VehicleType["Truck"] = 2] = "Truck";
        VehicleType[VehicleType["Motorbike"] = 3] = "Motorbike";
    })(Vehicles.VehicleType || (Vehicles.VehicleType = {}));
    var VehicleType = Vehicles.VehicleType;
    ;

    var Vehicle = (function () {
        function Vehicle(manufacturer, engine, year) {
            this.manufacturer = manufacturer;
            this.engine = engine;
            this.year = year;
        }
        Vehicle.prototype.getOverview = function () {
            return "\tManufacturer: " + this.manufacturer + "\n\tEngine: " + EngineType[this.engine.type] + " fuel; " + this.engine.volume + "cm3; " + this.engine.power + "hp" + "\n\tYear: " + this.year;
        };
        return Vehicle;
    })();
    Vehicles.Vehicle = Vehicle;

    var Car = (function (_super) {
        __extends(Car, _super);
        function Car(manufacturer, engine, year) {
            _super.call(this, manufacturer, engine, year);
            this.vehicleType = 0 /* Car */;
        }
        Car.prototype.getOverview = function () {
            return _super.prototype.getOverview.call(this) + "\n\tVehicle type: " + VehicleType[this.vehicleType];
        };

        Car.prototype.tuneEngine = function (addPower) {
            this.engine.power += addPower;
        };
        Car.MaxAllowedSpeed = 260;
        return Car;
    })(Vehicle);
    Vehicles.Car = Car;

    var Truck = (function (_super) {
        __extends(Truck, _super);
        function Truck(manufacturer, engine, year, capacity) {
            _super.call(this, manufacturer, engine, year);
            this.isLoaded = false;
            this._capacity = capacity;
            this.vehicleType = 2 /* Truck */;
            this.load = 0;
        }
        Truck.prototype.getOverview = function () {
            return _super.prototype.getOverview.call(this) + "\n\tVehicle type: " + VehicleType[this.vehicleType] + "\n\tLoad capacity: " + this._capacity + (this.isLoaded ? "\n\tLoad: " + this.load + "kg" : "");
        };

        Truck.prototype.loadTruck = function (cargo) {
            if (cargo <= this._capacity) {
                this.load += cargo;
                this.isLoaded = true;
            } else {
                throw Error("You cannot load more than the capacity of the truck");
            }
        };

        Truck.prototype.unloadTruck = function (cargo) {
            if (cargo) {
                this.load -= cargo;
            } else {
                this.load = 0;
                this.isLoaded = false;
            }
        };
        Truck.MaxAllowedSpeed = 100;
        return Truck;
    })(Vehicle);
    Vehicles.Truck = Truck;

    var Suv = (function (_super) {
        __extends(Suv, _super);
        function Suv(manufacturer, engine, year) {
            _super.call(this, manufacturer, engine, year);
            this._isOffroad = false;
            this.vehicleType = 1 /* SUV */;
        }
        Suv.prototype.getOverview = function () {
            return _super.prototype.getOverview.call(this) + "\n\tVehicle type: " + VehicleType[this.vehicleType] + (this._isOffroad ? "\n\tOffroad: engaged;" : "");
        };

        Suv.prototype.engageOffroad = function () {
            this._isOffroad = true;
        };

        Suv.prototype.disengageOffroad = function () {
            this._isOffroad = false;
        };
        Suv.MaxAllowedSpeed = 220;
        return Suv;
    })(Vehicle);
    Vehicles.Suv = Suv;

    var Motorbike = (function (_super) {
        __extends(Motorbike, _super);
        function Motorbike(manufacturer, engine, year) {
            _super.call(this, manufacturer, engine, year);
            this.vehicleType = 3 /* Motorbike */;
        }
        Motorbike.prototype.getOverview = function () {
            return _super.prototype.getOverview.call(this) + "\n\tVehicle type: " + VehicleType[this.vehicleType];
        };
        Motorbike.MaxAllowedSpeed = 300;
        return Motorbike;
    })(Vehicle);
    Vehicles.Motorbike = Motorbike;
})(Vehicles || (Vehicles = {}));
//# sourceMappingURL=VehicleModule.js.map
