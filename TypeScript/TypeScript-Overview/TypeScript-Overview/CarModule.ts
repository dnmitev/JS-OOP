module Cars {
    "use strict";
    export enum EngineType { Petrol, Diesel, Electricity, NaturalGas };
    export enum CoupeType { Convertible, Roadstar, Sportsback, Coupe, SUV };
    export enum MercedesModel { C, E, SL, CL, CLS, SLK, S, ML, GL };

    export interface IEngine {
        type: EngineType;
        volume: number;
        power: number;
    }

    export interface ICar {
        year: number;
        engine: IEngine;
        type: CoupeType;
    }

    export class Car implements ICar {
        static MaxAllowedSpeed: number = 260;

        year: number;
        engine: IEngine;
        type: CoupeType;

        constructor(year: number, engine: IEngine, type: CoupeType) {
            this.year = year;
            this.engine = engine;
            this.type = type;
        }

        getOverview(): string {
            return " Year: " + this.year +
                " Fuel: " + EngineType[this.engine.type] +
                " Coupe: " + CoupeType[this.type];
        }

        getFuelConsuption(): void {
            var consumption: number = Math.round(Math.random() * 5);

            console.log("Fuel consumption: " + consumption + " l/100km");
        }

        startEngine(): string {
            return "Engine started! Do you feel those " + this.engine.power + " horse running angry?!?!";
        }

        tuneEngine(addPower: number, addVolume: number): void {
            this.engine.power += addPower;
            this.engine.volume += addVolume;
        }
    }

    export class Mercedes extends Car {
        private _brandName: string;
        model: MercedesModel;

        constructor(model: MercedesModel, year: number, engine: IEngine, type: CoupeType) {
            super(year, engine, type);
            this._brandName = "Mercedes";
            this.model = model;
        }

        getOverview(): string {
            return this._brandName + " Model: " + MercedesModel[this.model] + " class " + super.getOverview();
        }

        startEngine(): string {
            return super.startEngine() + "This sounds like an AMG! OMG!!!!";
        }
    }
}

var engine: Cars.IEngine = {
    type: Cars.EngineType.Petrol,
    volume: 2000,
    power: 300
};

var c: Cars.Car = new Cars.Car(2014, engine, Cars.CoupeType.SUV);
var m: Cars.Mercedes = new Cars.Mercedes(Cars.MercedesModel.CLS, 2014, engine, Cars.CoupeType.Roadstar);
console.log(m.startEngine());
console.log("Power:" + m.engine.power);
console.log("Power:" + m.engine.volume);

m.tuneEngine(20,200);

console.log("Power:" + m.engine.power);
console.log("Power:" + m.engine.volume);
