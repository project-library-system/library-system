import { Injectable, Inject } from "@nestjs/common";
import { LoanRepository } from "src/loan/domain/repositories/LoanRepository";

@Injectable()
export class DeleteLoanUseCase {
    constructor(
        @Inject('LoanRepository')
        private readonly repository: LoanRepository
    ) {}

    async execute(id: string) {
        const loan = await this.repository.findById(id);

        if (!loan) {
            throw new Error("Empréstimo não encontrado");
        }

        return this.repository.delete(id);
    }
}