import { Injectable, Inject } from "@nestjs/common";
import { LoanRepository } from "src/loan/domain/repositories/LoanRepository";

@Injectable()
export class FindAllLoanUseCase {
    constructor(
        @Inject('LoanRepository')
        private readonly repository: LoanRepository
    ) {}

    async execute() {
        const loans = await this.repository.findAll();

        if (loans.length === 0) {
            throw new Error("Nenhum empréstimo encontrado");
        }

        return loans;
    }
}