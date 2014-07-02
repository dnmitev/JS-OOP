/// <reference path="drivermodule.ts" />
/// <reference path="vehiclemodule.ts" />
var g: Array<Vehicles.Vehicle> = [];

var mercedes: Vehicles.Car = new Vehicles.Car("Mercedes", { type: Vehicles.EngineType.Diesel, volume: 2000, power: 188 }, 2013),
    jeep: Vehicles.Suv = new Vehicles.Suv("Jeep", { type: Vehicles.EngineType.Diesel, volume: 5000, power: 358 }, 2013),
    yamaha: Vehicles.Motorbike = new Vehicles.Motorbike("Yamaha", { type: Vehicles.EngineType.Petrol, volume: 1000, power: 191 }, 2008),
    scania: Vehicles.Truck = new Vehicles.Truck("ГАЗ", { type: Vehicles.EngineType.Petrol, volume: 5000, power: 300 }, 1968, 5000);

g.push(mercedes);
g.push(jeep);
g.push(yamaha);

var d: Drivers.Driver = new Drivers.Driver("Bat Grisho", g);
console.log(d.getOverview());

d.addVehicle(scania);
console.log(d.getOverview()); 