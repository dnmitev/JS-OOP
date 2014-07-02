/// <reference path="drivermodule.ts" />
/// <reference path="vehiclemodule.ts" />
var g = [];

var mercedes = new Vehicles.Car("Mercedes", { type: 1 /* Diesel */, volume: 2000, power: 188 }, 2013), jeep = new Vehicles.Suv("Jeep", { type: 1 /* Diesel */, volume: 5000, power: 358 }, 2013), yamaha = new Vehicles.Motorbike("Yamaha", { type: 0 /* Petrol */, volume: 1000, power: 191 }, 2008), scania = new Vehicles.Truck("ГАЗ", { type: 0 /* Petrol */, volume: 5000, power: 300 }, 1968, 5000);

g.push(mercedes);
g.push(jeep);
g.push(yamaha);

var d = new Drivers.Driver("Bat Grisho", g);
console.log(d.getOverview());

d.addVehicle(scania);
console.log(d.getOverview());
//# sourceMappingURL=Test.js.map
