import { IsNumber, IsString } from "class-validator";

export class CreateBookDto {
    @IsString()
    isbn!: string;

    @IsString()
    name!: string;

    @IsString()
    author!: string;

    @IsString()
    publisher!: string;

    @IsString()
    genre!: string;

    @IsNumber()
    year!: number;

    @IsString()
    image!: string;
}