import { Injectable, Inject } from "@nestjs/common";
import { LoanRepository } from "src/loan/domain/repositories/LoanRepository";

@Injectable()
export class FindByExemplaryUseCase {
    constructor(
        @Inject('LoanRepository')
        private readonly repository: LoanRepository
    ) {}

    async execute(exemplaryId: string) {
        const loan = await this.repository.findByExemplaryId(exemplaryId);

        if (!loan) {
            throw new Error("Empréstimo não encontrado");
        }

        return loan;
    }
}