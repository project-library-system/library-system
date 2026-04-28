import { randomUUID } from "crypto";

export type CreateLoanProps = {
    exemplary_id: string;
    user_id: string;
    loan_date: Date;
    due_date: Date;
    return_date: Date | null;
    status: string;
}

export type UpdateLoanProps = {
    exemplary_id?: string;
    user_id?: string;
    loan_date?: Date;
    due_date?: Date;
    return_date?: Date | null;
    status?: string;
}

export class Loan {
    constructor(
        public readonly id: string,
        public exemplary_id: string,
        public user_id: string,
        public loan_date: Date,
        public due_date: Date,
        public return_date: Date | null,
        public status: string,
    ) {}

    static create(props: CreateLoanProps): Loan {
        return new Loan(
            randomUUID(),
            props.exemplary_id,
            props.user_id,
            props.loan_date,
            props.due_date,
            props.return_date,
            props.status,
            );
        
    }     
}

