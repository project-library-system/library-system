import { LoanStatus } from "src/enum/LoanStatus";

export class CreateLoanDto {
    exemplary_id!: string;
    user_id!: string;
    loan_date!: Date;
    due_date!: Date;
    return_date!: Date | null;
    status!: LoanStatus;
}

export class UpdateLoanDto {
    exemplary_id!: string;
    user_id!: string;
    loan_date!: Date;
    due_date!: Date;
    return_date!: Date | null;
    status!: LoanStatus;
}
