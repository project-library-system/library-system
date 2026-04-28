import { Injectable, Inject } from "@nestjs/common";
import { LoanRepository } from "src/loan/domain/repositories/LoanRepository";
import { Loan, CreateLoanProps } from "src/loan/domain/entities/Loan";

@Injectable()
export class CreateLoanUseCase {
    constructor(
        @Inject('LoanRepository')
        private readonly repository: LoanRepository
    ) {}

    async execute(data: CreateLoanProps): Promise<Loan> {
        const loan = await this.repository.create(data);
        return loan;
    }
}