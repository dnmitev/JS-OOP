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
        Driver.prototype.getOverview = function () {
            return "Name: " + this.name + "\nGarage: \n" + this.getVehiclesList();
        };

        Driver.prototype.getVehiclesList = function () {
            var i, list = "";

            for (i = 0; i < this.rides.length; i += 1) {
                list += this.rides[i].getOverview() + "\n";
            }

            return list;
        };

        Driver.prototype.addVehicle = function (vehicle) {
            if (!this.isProfessional && vehicle instanceof Vehicles.Truck) {
                throw new Error(this.name + " is not a professional driver and can not drive a truck");
            } else {
                this.rides.push(vehicle);
            }
        };
        Driver.controlPoints = 37;
        return Driver;
    })();
    Drivers.Driver = Driver;
})(Drivers || (Drivers = {}));
//# sourceMappingURL=DriverModule.js.map
