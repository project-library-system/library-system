import { IsString, IsOptional, IsNumber } from "class-validator";

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

    @IsString()
    @IsOptional()
    genre?: string;

    @IsNumber()
    @IsOptional()
    year?: number;

    @IsString()
    @IsOptional()
    image?: string;
}
