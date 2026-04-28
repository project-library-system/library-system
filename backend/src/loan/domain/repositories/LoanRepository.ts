import { CreateLoanProps, Loan, UpdateLoanProps } from "../entities/Loan";

export interface LoanRepository {
    create(data: CreateLoanProps): Promise<Loan>;
    update(id: string, data: UpdateLoanProps): Promise<Loan>;
    delete(id: string): Promise<void>;
    findById(id: string): Promise<Loan | null>;
    findAll(): Promise<Loan[]>;
    findByExemplaryId(exemplary_id: string): Promise<Loan | null>;
    findByUserId(user_id: string): Promise<Loan | null>;
}