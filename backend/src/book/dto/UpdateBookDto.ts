import { IsString, IsOptional } from "class-validator";

export class UpdateBookDto {
    @IsString()
    @IsOptional()
    isbn?: string;

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    author?: string;

    @IsString()
    @IsOptional()
    publisher?: string;
}
