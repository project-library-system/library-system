import { Injectable, Inject } from "@nestjs/common";
import { LoanRepository } from "src/loan/domain/repositories/LoanRepository";
import { Loan, CreateLoanProps } from "src/loan/domain/entities/Loan";
import { ExemplaryRepository } from "src/exemplary/domain/repositories/ExemplaryRepository";
import { UserRepository } from "src/users/domain/repositories/UserRepository";
import { ExemplaryNotAvailableException, InvalidLoanDateException, UserNotFoundException } from "src/loan/domain/exceptions/LoanExceptions";

@Injectable()
export class CreateLoanUseCase {
    constructor(
        @Inject('LoanRepository')
        private readonly repository: LoanRepository,
        @Inject('ExemplaryRepository')
        private readonly exemplaryRepository: ExemplaryRepository,
        @Inject('UserRepository')
        private readonly userRepository: UserRepository
    ) {}

    async execute(data: CreateLoanProps): Promise<Loan> {

        const isUser = await this.userRepository.findById(data.user_id);
        if (!isUser) {
            throw new UserNotFoundException(data.user_id);
        }

        const isExemplary = await this.exemplaryRepository.findById(data.exemplary_id);
        if (!isExemplary) {
            throw new Error('Exemplar não encontrado!');
        }

        if (isExemplary.status !== 'AVAILABLE') {
            throw new ExemplaryNotAvailableException(data.exemplary_id);
        }

        if (data.due_date <= data.loan_date) {
            throw new InvalidLoanDateException('A data de devolução (due_date) deve ser posterior à data de empréstimo (loan_date).');
        }

        const loan = await this.repository.create(data);
        return loan;
    }
}