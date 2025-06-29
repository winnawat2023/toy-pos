
export class DailyAccount {
    key?: string | null;
    date:Date;

    sale_total: number;
    sale_transfer: number;
    sale_cash: number;

    income_transfer:number;
    income_cash:number;
    income_total:number;

    outcomes: DailyAccountOutcome[];
    total_outcome:number;
    total_outcome_cash:number;
    total_outcome_transfer:number;
    total_outcome_bag:number;
    total_outcome_credit:number;
    total_outcome_food:number;

    countable_cash:number;
    wallet:number;

}

export class DailyAccountOutcome {
    outcome_type: string;
    outcome_total: number;
    payment_type: any
    detail: string;
    shop:any;
    expense:any;
}