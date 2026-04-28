import { Injectable, Inject } from "@nestjs/common";
import { LoanRepository } from "src/loan/domain/repositories/LoanRepository";

@Injectable()
export class FindByUserIdUseCase {
    constructor(
        @Inject('LoanRepository')
        private readonly repository: LoanRepository
    ) {}

    async execute(userId: string) {
        const loan = await this.repository.findByUserId(userId);

        if (!loan) {
            throw new Error("Nenhum empréstimo encontrado para o usuário");
        }

        return loan;
    }
}