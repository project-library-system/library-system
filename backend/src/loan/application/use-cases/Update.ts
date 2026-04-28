import { Injectable, Inject } from "@nestjs/common";
import { LoanRepository } from "src/loan/domain/repositories/LoanRepository";
import { UpdateLoanProps } from "src/loan/domain/entities/Loan";

@Injectable()
export class UpdateLoanUseCase {
    constructor(
        @Inject('LoanRepository')
        private readonly repository: LoanRepository
    ) {}

    async execute(id: string, data: UpdateLoanProps) {
        const loan = await this.repository.update(id, data);

        if (!loan) {
            throw new Error("Empréstimo não encontrado");
        }

        return loan;
    }
}