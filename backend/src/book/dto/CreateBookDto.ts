import { IsString } from "class-validator";

export class CreateBookDto {
    @IsString()
    isbn!: string;

    @IsString()
    name!: string;

    @IsString()
    author!: string;

    @IsString()
    publisher!: string;
}