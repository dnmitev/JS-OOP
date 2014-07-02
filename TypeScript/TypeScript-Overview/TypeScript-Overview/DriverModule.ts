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