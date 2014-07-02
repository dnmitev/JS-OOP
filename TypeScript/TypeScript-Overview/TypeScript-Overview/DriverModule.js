/// <reference path="vehiclemodule.ts" />
var Drivers;
(function (Drivers) {
    "use strict";

    var Driver = (function () {
        function Driver(name, rides, isProfessional) {
            this.name = name;
            this.rides = rides;
            this.isProfessional = isProfessional;
        }
        Driver.prototype.getVehiclesList = function () {
            var i, list = "";

            for (i = 0; i < this.rides.length; i += 1) {
                list += this.rides[i].getOverview() + "\n";
            }

            return list;
        };

        Driver.prototype.getOverview = function () {
            return "Name: " + this.name + "\nGarage: \n" + this.getVehiclesList();
        };

        Driver.prototype.addVehicle = function (vehicle) {
            this.rides.push(vehicle);
        };
        Driver.controlPoints = 37;
        return Driver;
    })();
    Drivers.Driver = Driver;
})(Drivers || (Drivers = {}));

var g = [];

var c1 = new Vehicles.Car("Mercedes", { type: 1 /* Diesel */, volume: 2000, power: 188 }, 2013);
var c2 = new Vehicles.Suv("Jeep", { type: 1 /* Diesel */, volume: 5000, power: 358 }, 2013);
var c3 = new Vehicles.Motorbike("Yamaha", { type: 0 /* Petrol */, volume: 1000, power: 191 }, 2008);

g.push(c1);
g.push(c2);
g.push(c3);

var d = new Drivers.Driver("Bat Grisho", g);
console.log(d.getOverview());
//# sourceMappingURL=DriverModule.js.map
