import { LoanStatus } from "src/enum/LoanStatus";
import { IsString, IsUUID, IsDate, IsOptional, IsEnum } from "class-validator";
import { Type } from "class-transformer";

export class CreateLoanDto {
    @IsUUID()
    exemplary_id!: string;

    @IsUUID()
    user_id!: string;

    @IsDate()
    @Type(() => Date)
    loan_date!: Date;

    @IsDate()
    @Type(() => Date)
    due_date!: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    return_date!: Date | null;

    @IsEnum(LoanStatus)
    status!: LoanStatus;
}

export class UpdateLoanDto {
    @IsOptional()
    @IsUUID()
    exemplary_id?: string;

    @IsOptional()
    @IsUUID()
    user_id?: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    loan_date?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    due_date?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    return_date?: Date | null;

    @IsOptional()
    @IsEnum(LoanStatus)
    status?: LoanStatus;
}
