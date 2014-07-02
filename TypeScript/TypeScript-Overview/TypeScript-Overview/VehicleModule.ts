module Vehicles {
    "use strict";

    export enum EngineType { Petrol, Diesel, Electricity, NaturalGas };
    export enum VehicleType { Car, SUV, Truck, Motorbike };

    export interface IEngine {
        type: EngineType;
        volume: number;
        power: number;
    }

    export interface IVehicle {
        manufacturer: string;
        engine: IEngine;
        year: number;
    }

    export class Vehicle implements IVehicle {
        manufacturer: string;
        engine: IEngine;
        year: number;

        constructor(manufacturer: string, engine: IEngine, year: number) {
            this.manufacturer = manufacturer;
            this.engine = engine;
            this.year = year;
        }

        getOverview(): string {
            return "\tManufacturer: " + this.manufacturer +
                "\n\tEngine: " + EngineType[this.engine.type] + " fuel; " +
                this.engine.volume + "cm3; " + this.engine.power + "hp" +
                "\n\tYear: " + this.year;
        }
    }

    export class Car extends Vehicle {
        static MaxAllowedSpeed: number = 260;

        vehicleType: VehicleType;

        constructor(manufacturer: string, engine: IEngine, year: number) {
            super(manufacturer, engine, year);
            this.vehicleType = VehicleType.Car;
        }

        getOverview(): string {
            return super.getOverview() +
                "\n\tVehicle type: " + VehicleType[this.vehicleType];
        }

        tuneEngine(addPower: number): void {
            this.engine.power += addPower;
        }
    }

    export class Truck extends Vehicle {
        static MaxAllowedSpeed = 100;

        private _capacity: number;
        vehicleType: VehicleType;
        load: number;
        isLoaded: boolean = false;

        constructor(manufacturer: string, engine: IEngine, year: number, capacity: number) {
            super(manufacturer, engine, year);
            this._capacity = capacity;
            this.vehicleType = VehicleType.Truck;
            this.load = 0;
        }

        getOverview(): string {
            return super.getOverview() +
                "\n\tVehicle type: " + VehicleType[this.vehicleType] +
                "\n\tLoad capacity: " + this._capacity +
                (this.isLoaded ? "\n\tLoad: " + this.load + "kg" : "");
        }

        loadTruck(cargo: number): void {
            if (cargo <= this._capacity) {
                this.load += cargo;
                this.isLoaded = true;
            } else {
                throw Error("You cannot load more than the capacity of the truck");
            }
        }

        unloadTruck(cargo?: number): void {
            if (cargo) {
                this.load -= cargo;
            } else {
                this.load = 0;
                this.isLoaded = false;
            }
        }
    }

    export class Suv extends Vehicle {
        static MaxAllowedSpeed = 220;

        vehicleType: VehicleType;
        private _isOffroad: boolean = false;

        constructor(manufacturer: string, engine: IEngine, year: number) {
            super(manufacturer, engine, year);
            this.vehicleType = VehicleType.SUV;
        }

        getOverview(): string {
            return super.getOverview() +
                "\n\tVehicle type: " + VehicleType[this.vehicleType] +
                (this._isOffroad ? "\n\tOffroad: engaged;" : "");
        }

        engageOffroad(): void {
            this._isOffroad = true;
        }

        disengageOffroad(): void {
            this._isOffroad = false;
        }
    }

    export class Motorbike extends Vehicle {
        static MaxAllowedSpeed = 300;

        vehicleType: VehicleType;

        constructor(manufacturer: string, engine: IEngine, year: number) {
            super(manufacturer, engine, year);
            this.vehicleType = VehicleType.Motorbike;
        }

        getOverview(): string {
            return super.getOverview() +
                "\n\tVehicle type: " + VehicleType[this.vehicleType];
        }
    }
}

