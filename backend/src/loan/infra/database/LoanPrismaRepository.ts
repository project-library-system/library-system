import { Injectable } from "@nestjs/common";
import { LoanRepository } from "src/loan/domain/repositories/LoanRepository";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateLoanProps, Loan, UpdateLoanProps } from "src/loan/domain/entities/Loan";
import { Loan as PrismaLoan } from "@prisma/client";
import { LoanStatus } from "src/enum/LoanStatus";

@Injectable()
export class LoanPrismaRepository implements LoanRepository {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    private toDomain(prismaLoan: PrismaLoan): Loan {
        return new Loan(
            prismaLoan.id,
            prismaLoan.exemplar_id,
            prismaLoan.user_id,
            prismaLoan.loan_date,
            prismaLoan.maturity_date,
            prismaLoan.return_date,
            LoanStatus[prismaLoan.status],
        );
    }

    private async updateUserLoanCount(user_id: string): Promise<void> {
        const count = await this.prisma.loan.count({
            where: {
                user_id,
                status: {
                    in: ['PENDING', 'APPROVED', 'OVERDUE']
                }
            }
        });
        await this.prisma.user.update({
            where: { id: user_id },
            data: { count_loans: count }
        });
    }

    async countActiveByUserId(user_id: string): Promise<number> {
        return this.prisma.loan.count({
            where: {
                user_id,
                status: {
                    in: ['PENDING', 'APPROVED', 'OVERDUE']
                }
            }
        });
    }

    async create(data: CreateLoanProps): Promise<Loan> {
        const prismaLoan = await this.prisma.loan.create({
            data: {
                exemplar_id: data.exemplary_id,
                user_id: data.user_id,
                loan_date: data.loan_date,
                maturity_date: data.due_date,
                return_date: data.return_date,
                status: data.status,
            },
        });

        await this.updateUserLoanCount(data.user_id);
        return this.toDomain(prismaLoan);
    }

    async update(id: string, data: UpdateLoanProps): Promise<Loan> {
        const prismaLoan = await this.prisma.loan.update({
            where: { id },
            data: {
                exemplar_id: data.exemplary_id,
                user_id: data.user_id,
                loan_date: data.loan_date,
                maturity_date: data.due_date,
                return_date: data.return_date,
                status: data.status,
            },
        });

        await this.updateUserLoanCount(prismaLoan.user_id);
        return this.toDomain(prismaLoan);
    }

    async delete(id: string): Promise<void> {
        const loan = await this.prisma.loan.findUnique({ where: { id } });
        if (loan) {
            await this.prisma.loan.delete({ where: { id } });
            await this.updateUserLoanCount(loan.user_id);
        }
    }

    async findById(id: string): Promise<Loan | null> {
        const prismaLoan = await this.prisma.loan.findUnique({ where: { id } });
        if (!prismaLoan) return null;
        return this.toDomain(prismaLoan);
    }

    async findByExemplaryId(exemplary_id: string): Promise<Loan | null> {
        const prismaLoan = await this.prisma.loan.findFirst({
            where: { exemplar_id: exemplary_id },
        });
        if (!prismaLoan) return null;
        return this.toDomain(prismaLoan);
    }

    async findByUserId(user_id: string): Promise<Loan | null> {
        const prismaLoan = await this.prisma.loan.findFirst({
            where: { user_id },
        });
        if (!prismaLoan) return null;
        return this.toDomain(prismaLoan);
    }

    async findAll(): Promise<Loan[]> {
        const prismaLoans = await this.prisma.loan.findMany();
        return prismaLoans.map((loan) => this.toDomain(loan));
    }
}