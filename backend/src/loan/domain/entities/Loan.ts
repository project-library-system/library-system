import { randomUUID } from "crypto";
import { LoanStatus } from "src/enum/LoanStatus";

export type CreateLoanProps = {
    exemplary_id: string;
    user_id: string;
    loan_date: Date;
    due_date: Date;
    return_date: Date | null;
    status: LoanStatus;
}

export type UpdateLoanProps = {
    exemplary_id?: string;
    user_id?: string;
    loan_date?: Date;
    due_date?: Date;
    return_date?: Date | null;
    status?: LoanStatus;
}

export class Loan {
    constructor(
        public readonly id: string,
        public exemplary_id: string,
        public user_id: string,
        public loan_date: Date,
        public due_date: Date,
        public return_date: Date | null,
        public status: LoanStatus,
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

