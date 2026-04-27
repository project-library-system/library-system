import { IsString, IsUUID } from "class-validator";

export class CreateExemplaryDto {
    @IsUUID()
    book_id!: string;

    @IsString()
    code!: string;

    @IsString()
    status!: string;
}
