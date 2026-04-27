import { IsString, IsUUID, IsOptional } from "class-validator";

export class UpdateExemplaryDto {
    @IsUUID()
    @IsOptional()
    book_id?: string;

    @IsString()
    @IsOptional()
    code?: string;

    @IsString()
    @IsOptional()
    status?: string;
}
