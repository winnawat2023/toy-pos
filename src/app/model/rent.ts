import { Lots } from "./lots";

export class Rent {
    key?: string | null;
    lotKey:string;
    month:string;
    rent:number;

    lastElectricityMeter:number;
    currentElectricityMeter:number;
    totalElectricityMeter:number;
    electricityPrice:number;
    totalElectricity:number;

    lastMeterWater:number;
    currentMeterWater:number;
    totalMeterWater:number;
    waterPrice:number;
    totalWater:number;

    totalPrice:number;
    
  }


export class RentHistory {
  lot:Lots;
  rent:Rent;
}
