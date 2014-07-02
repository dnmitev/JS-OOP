/// <reference path="vehiclemodule.ts" />
module Drivers {
    "use strict";

    export interface IGarage<T> {
        garage: T[];
    }

    export interface IDriver {
        name: string;
        rides: Array<Vehicles.Vehicle>;
        isProfessional: boolean;
    }

    export class Driver implements IDriver {
        static controlPoints = 37;

        name: string;
        rides: Array<Vehicles.Vehicle>;
        isProfessional: boolean;

        constructor(name: string, rides: Array<Vehicles.Vehicle>, isProfessional?: boolean) {
            this.name = name;
            this.rides = rides;
            this.isProfessional = isProfessional;
        }

        getOverview(): string {
            return "Name: " + this.name +
                "\nGarage: \n" + this.getVehiclesList();
        }

        getVehiclesList(): string {
            var i: number,
                list: string = "";

            for (i = 0; i < this.rides.length; i += 1) {
                list += this.rides[i].getOverview() + "\n";
            }

            return list;
        }

        addVehicle(vehicle: Vehicles.Vehicle): void {
            if (!this.isProfessional && vehicle instanceof Vehicles.Truck) {
                throw new Error(this.name + " is not a professional driver and can not drive a truck");
            } else {
                this.rides.push(vehicle);
            }
        }
    }
}

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

d.addVehicle(mercedes);
console.log(d.getOverview());
